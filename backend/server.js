const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function wrapInScene(code) {
  const indented = code
    .split('\n')
    .map(function(line) { return line.length ? '        ' + line : line; })
    .join('\n');
  return 'from manim import *\n\nclass GeneratedScene(Scene):\n    def construct(self):\n' + indented;
}

app.get('/', (req, res) => {
  res.send('Manim Blocks backend is running!');
});

app.post('/render', (req, res) => {
  const code = req.body.code;
  const sceneCode = wrapInScene(code);
  const filePath = path.join(__dirname, 'scene.py');
  fs.writeFileSync(filePath, sceneCode);
  console.log('Wrote scene to:', filePath);

  const command = `manim -ql "${filePath}" GeneratedScene`;
  exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error('Manim failed:', stderr);
      return res.status(500).json({ status: 'error', message: stderr });
    }
    console.log('Manim finished rendering.');
    const videoPath = path.join(__dirname, 'media', 'videos', 'scene', '480p15', 'GeneratedScene.mp4');
    res.sendFile(videoPath);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});