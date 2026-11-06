const { spawn } = require('child_process');

async function testInit() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9459',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-init-test',
    '--window-size=1440,900',
    'http://localhost:3001'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const list = await (await fetch('http://localhost:9459/json/list')).json();
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

    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', JSON.stringify(m.params.exceptionDetails));
      }
    });

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        try {
          return {
            heroWavesInitialized: window.__heroWavesInitialized,
            timelineProgress: window.__heroTlProgress,
            bodyChildren: document.body.children.length
          };
        } catch(e) {
          return e.message;
        }
      })()`,
      returnByValue: true
    });
    console.log('Check:', check.result.value);
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
testInit();
