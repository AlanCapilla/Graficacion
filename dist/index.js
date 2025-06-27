"use strict";
// codigo fuente en ts 
//Segun el tutorial de https://www.youtube.com/watch?v=VXWvfrmpapI&list=PLYElE_rzEw_sHeIIv7BMliQF5zB7BliJE || Frank's Laboratory
// se hace el siguiente codigo para graficar el audio, basado en Ts
//Alan Capilla Guzman
// Importa los estilos CSS
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let audioSource;
let analyser;
container.addEventListener('click', () => {
    console.log('Hola, si esta funcionando el evento click');
    // Obtiene el elemento de audio
    const audio1 = document.getElementById('audio1');
    file.addEventListener('change', (e) => {
        var _a;
        const target = e.target;
        const selectedFile = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        // Verifica si se ha seleccionado un archivo
        if (!selectedFile) {
            alert('Insertar un Archivo de audio');
        }
        // Verifica si el archivo es de tipo audio
        if (selectedFile) {
            audio1.src = URL.createObjectURL(selectedFile);
            audio1.load();
            audio1.play();
        }
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
        // Cambia el color de las barras según el valor de barHeight
        drawVisualization(bufferLength, barWidth, dataArray);
        // Dibuja las barras en el canvas
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
