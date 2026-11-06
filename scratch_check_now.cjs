const { spawn } = require('child_process');

async function checkNow() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9485',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-check-now',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  try {
    const list = await (await fetch('http://localhost:9485/json/list')).json();
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
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    
    // Wait 3.5s
    await new Promise(r => setTimeout(r, 3500));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const cv = document.getElementById('heroWavesCanvas');
        const pt = document.getElementById('pageTransition');
        return {
          cvW: cv?.width,
          cvH: cv?.height,
          ptDisplay: pt ? getComputedStyle(pt).display : null,
          titleText: document.querySelector('.hero-creative__title')?.innerText,
          subtitles: [...document.querySelectorAll('.hero-section__subtitle')].map(s => ({
            text: s.innerText,
            display: getComputedStyle(s).display,
            opacity: getComputedStyle(s).opacity,
            height: getComputedStyle(s).height
          })),
          lineHeight: document.getElementById('heroIndicatorLine')?.offsetHeight
        };
      })()`,
      returnByValue: true
    });
    console.log('LIVE STATE:', JSON.stringify(res.result.value, null, 2));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const fs = require('fs');
    fs.writeFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9a72d356-7aaf-4e78-8b74-b57898625f39\\hero-fresh-capture.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved hero-fresh-capture.png');
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
checkNow();
