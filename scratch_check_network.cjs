const { spawn } = require('child_process');

async function checkNetwork() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9486',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-net-test',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  try {
    const list = await (await fetch('http://localhost:9486/json/list')).json();
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
    await send('Network.enable');
    await send('Page.enable');
    await send('Runtime.enable');

    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.method === 'Network.responseReceived') {
        console.log('[NET RESPONSE]', m.params.response.status, m.params.response.url);
      }
      if (m.method === 'Network.loadingFailed') {
        console.error('[NET FAILED]', m.params.errorText, m.params.canceled, m.params.type);
      }
      if (m.method === 'Runtime.consoleAPICalled') {
        console.log('[JS CONSOLE]', m.params.type, ...m.params.args.map(a => a.value || a.description));
      }
      if (m.method === 'Runtime.exceptionThrown') {
        console.error('[JS EXCEPTION]', JSON.stringify(m.params.exceptionDetails));
      }
    });

    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 4000));
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
checkNetwork();
