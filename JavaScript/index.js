const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let audioSource;
let analyser;

container.addEventListener('click', () => {
  const audio1 = document.getElementById('audio1');

  file.addEventListener('change', (e) => {
    const selectedFile = e.target.files[0];
    audio1.src = URL.createObjectURL(selectedFile);
    audio1.load();
    audio1.play();
  });

  const audioCtx = new AudioContext();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();

  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / bufferLength;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i];
      ctx.fillStyle = 'white';
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      drawVisualization(bufferLength, barWidth, dataArray);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }

  animate();
});

function drawVisualization(bufferLength, barWidth, dataArray) {
    // Cambia el color de las barras según el valor de barHeight
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        const red = i * barHeight / 20;
        const green = i * 4;
        const blue = barHeight / 2;

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    // Puedes agregar lógica para cambiar los colores según el valor de barHeight
  
}
