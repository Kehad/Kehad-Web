const { spawn } = require('child_process');

async function debugDom() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9471',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-dom-debug',
    '--window-size=1440,900',
    'http://localhost:3001'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const list = await (await fetch('http://localhost:9471/json/list')).json();
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

    await new Promise(r => setTimeout(r, 3000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.elementFromPoint(500, 500);
        const pt = document.getElementById('pageTransition');
        const hero = document.getElementById('hero');
        const canvas = document.getElementById('heroWavesCanvas');
        return {
          elementFromPoint: el ? { tag: el.tagName, id: el.id, className: el.className } : null,
          pageTransition: pt ? {
            display: getComputedStyle(pt).display,
            visibility: getComputedStyle(pt).visibility,
            opacity: getComputedStyle(pt).opacity,
            transform: getComputedStyle(pt).transform,
            zIndex: getComputedStyle(pt).zIndex
          } : null,
          heroTrack: document.querySelector('.hero-creative__track') ? {
            display: getComputedStyle(document.querySelector('.hero-creative__track')).display,
            height: getComputedStyle(document.querySelector('.hero-creative__track')).height,
            opacity: getComputedStyle(document.querySelector('.hero-creative__track')).opacity,
          } : null,
          canvas: canvas ? {
            width: canvas.width,
            height: canvas.height,
            offsetWidth: canvas.offsetWidth,
            offsetHeight: canvas.offsetHeight,
            opacity: getComputedStyle(canvas).opacity,
            display: getComputedStyle(canvas).display
          } : null,
          titleText: document.querySelector('.hero-creative__title')?.innerText,
          titleDisplay: document.querySelector('.hero-creative__title') ? getComputedStyle(document.querySelector('.hero-creative__title')).display : null,
          titleOpacity: document.querySelector('.hero-creative__title') ? getComputedStyle(document.querySelector('.hero-creative__title')).opacity : null
        };
      })()`,
      returnByValue: true
    });
    console.log('DOM DEBUG:', JSON.stringify(res.result.value, null, 2));
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
debugDom();
