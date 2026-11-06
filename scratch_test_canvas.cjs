const { spawn } = require('child_process');

async function testCanvas() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9458',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-canvas-test',
    '--window-size=1440,900',
    'http://localhost:3001'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const list = await (await fetch('http://localhost:9458/json/list')).json();
    const tab = list.find(t => t.type === 'page');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise(res => {
      const msgId = id++;
      const onMsg = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === msgId) { ws.removeEventListener('message', onMsg); res(m.result); }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => { ws.onopen = r; });
    await send('Page.enable');
    await send('Runtime.enable');

    // Check canvas status
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const canvas = document.getElementById('heroWavesCanvas');
        if (!canvas) return 'Canvas not found';
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, Math.min(100, canvas.width), Math.min(100, canvas.height));
        let nonZero = 0;
        for (let i = 0; i < imgData.data.length; i += 4) {
          if (imgData.data[i+3] > 0) nonZero++;
        }
        return {
          width: canvas.width,
          height: canvas.height,
          styleWidth: canvas.style.width,
          styleHeight: canvas.style.height,
          offsetWidth: canvas.offsetWidth,
          offsetHeight: canvas.offsetHeight,
          nonZeroPixelsIn100x100: nonZero,
          parentHeight: canvas.parentElement?.offsetHeight
        };
      })()`,
      returnByValue: true
    });
    console.log('Canvas info:', res.result.value);
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
testCanvas();
