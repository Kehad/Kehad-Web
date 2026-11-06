const { spawn } = require('child_process');
const fs = require('fs');

const testHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #05060f;
    overflow: hidden;
    width: 1440px;
    height: 900px;
    font-family: "Plus Jakarta Sans", sans-serif;
  }
  canvas {
    position: absolute;
    inset: 0;
    width: 1440px;
    height: 900px;
  }
</style>
</head>
<body>
<canvas id="cv" width="1440" height="900"></canvas>
<script>
  const canvas = document.getElementById('cv');
  const ctx = canvas.getContext('2d');
  const width = 1440;
  const height = 900;

  // Rich Midnight Obsidian Background
  ctx.fillStyle = '#05060f';
  ctx.fillRect(0, 0, width, height);

  // Soft purple ambient radial glow
  const glow = ctx.createRadialGradient(width * 0.88, height * 0.28, 15, width * 0.88, height * 0.28, 600);
  glow.addColorStop(0, 'rgba(139, 92, 246, 0.20)');
  glow.addColorStop(0.35, 'rgba(109, 40, 217, 0.08)');
  glow.addColorStop(1, 'rgba(5, 6, 15, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // =========================================================================
  // 1. RIGHT SIDE: 3D Torus Vortex / Folded Wireframe Aperture
  // Matching user reference position and flow
  // =========================================================================
  const cx = width * 0.89;
  const cy = height * 0.27;
  const numVortex = 85;

  for (let i = 0; i < numVortex; i++) {
    const k = i / numVortex; // 0 (inner eye) to 1 (outer flare)
    ctx.beginPath();

    const points = 240;
    for (let j = 0; j <= points; j++) {
      const theta = (j / points) * Math.PI * 2;
      
      const baseR = 45 + Math.pow(k, 0.82) * 460;

      const pinch = Math.sin(theta + 0.25) * 0.36;
      const fold = Math.cos(theta * 2 - 0.15) * (0.26 + k * 0.36);
      const ripple = Math.sin(theta * 3 + 0.7) * (0.07 + k * 0.05);

      const r = baseR * (1 + pinch + fold + ripple);

      const rot = -0.44;
      const xLocal = r * Math.cos(theta) * 1.08;
      const yLocal = r * Math.sin(theta) * 1.34;

      const px = cx + xLocal * Math.cos(rot) - yLocal * Math.sin(rot);
      const py = cy + xLocal * Math.sin(rot) + yLocal * Math.cos(rot);

      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    const alpha = 0.04 + Math.sin(k * Math.PI) * 0.45;
    const rVal = Math.floor(145 + k * 45);
    const gVal = Math.floor(75 + k * 65);
    const bVal = 252;
    ctx.strokeStyle = 'rgba(' + rVal + ', ' + gVal + ', ' + bVal + ', ' + alpha.toFixed(3) + ')';
    ctx.lineWidth = 1.0;
    ctx.stroke();
  }

  // =========================================================================
  // 2. TOP-LEFT & LEFT: Smooth Topographic Wireframe Arcs
  // Continuous smooth lines starting off-screen top and sweeping down the left
  // =========================================================================
  const numContour = 55;
  const leftOriginX = width * 0.45;
  const leftOriginY = -height * 0.25;

  for (let c = 0; c < numContour; c++) {
    const p = c / numContour;
    ctx.beginPath();

    const steps = 180;
    for (let s = 0; s <= steps; s++) {
      const u = s / steps; // 0 to 1
      
      // Sweep angle from 0.65 to 3.14 (wrapping all the way past left edge)
      const angle = 0.65 + u * 2.35;
      const rBase = (180 + p * 420) * (0.65 + u * 1.05);

      const wave = Math.sin(u * 4.2 + p * 2.8) * (25 + p * 18)
                 + Math.cos(u * 2.2 - p * 1.5) * 22;

      const px = leftOriginX - Math.cos(angle) * (rBase + wave);
      const py = leftOriginY + Math.sin(angle) * (rBase + wave) * 1.35;

      if (s === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    const alpha = 0.025 + Math.sin(p * Math.PI) * 0.22;
    ctx.strokeStyle = 'rgba(157, 122, 238, ' + alpha.toFixed(3) + ')';
    ctx.lineWidth = 0.95;
    ctx.stroke();
  }
</script>
</body>
</html>
`;

fs.writeFileSync('c:\\Users\\ADMIN\\Desktop\\Code\\WEB\\Kehad-Web\\scratch_canvas_test.html', testHtml);

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9464',
    '--user-data-dir=C:\\Users\\ADMIN\\AppData\\Local\\Temp\\edge-canvas-render4',
    '--window-size=1440,900',
    'file:///c:/Users/ADMIN/Desktop/Code/WEB/Kehad-Web/scratch_canvas_test.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const list = await (await fetch('http://localhost:9464/json/list')).json();
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
    await new Promise(r => setTimeout(r, 1000));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\9a72d356-7aaf-4e78-8b74-b57898625f39\\canvas-math-test4.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved canvas-math-test4.png');
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
capture();
