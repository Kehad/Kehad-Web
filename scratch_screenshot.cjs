const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9475',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-nav-test',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  try {
    const list = await (await fetch('http://localhost:9475/json/list')).json();
    const tab = list.find(t => t.type === 'page');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise((res, rej) => {
      const msgId = id++;
      const onMsg = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === msgId) {
          ws.removeEventListener('message', onMsg);
          if (m.error) rej(m.error);
          else res(m.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => { ws.onopen = r; });
    await send('Page.enable');
    await send('Runtime.enable');

    // Explicitly navigate
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    
    // Wait 3.5s for page to load and intro to lift
    await new Promise(r => setTimeout(r, 3500));

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const pt = document.getElementById('pageTransition');
        const cur = document.getElementById('customCursor');
        if (cur) cur.style.display = 'none';
        return {
          ptDisplay: pt ? getComputedStyle(pt).display : null,
          ptTransform: pt ? getComputedStyle(pt).transform : null,
          titleText: document.querySelector('.hero-creative__title')?.innerText,
          canvasW: document.getElementById('heroWavesCanvas')?.width,
          canvasH: document.getElementById('heroWavesCanvas')?.height,
        };
      })()`,
      returnByValue: true
    });
    console.log('Page state:', check.result.value);

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9a72d356-7aaf-4e78-8b74-b57898625f39\\hero-live-explicit-nav.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved hero-live-explicit-nav.png');
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
run();
