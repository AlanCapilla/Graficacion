"use strict";
// codigo fuente en ts 
//Segun el tutorial de https://www.youtube.com/watch?v=VXWvfrmpapI&list=PLYElE_rzEw_sHeIIv7BMliQF5zB7BliJE || Frank's Laboratory
// se hace el siguiente codigo para graficar el audio, basado en Ts
//Alan Capilla Guzman
// mandamos a llamas los elementos que ocuparemos 
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
const ctx = canvas.getContext('2d');
//Ajustamos el tamaño del canvas al tamaño de la ventana
// Esto permite que el canvas ocupe todo el espacio disponible en la ventana del navegador
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Creamos las variables que utilizaremos para el audio y el analizador
// Estas variables nos permitirán manipular el audio y analizar sus frecuencias
let audioSource;
let analyser;
container.addEventListener('click', () => {
    //prueba de que el evento click funciona
    // Esto es solo para verificar que el evento click se está registrando correctamente
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
            // Crea un objeto URL para el archivo seleccionado
            // Esto permite que el elemento de audio pueda reproducir el archivo seleccionado
            audio1.src = URL.createObjectURL(selectedFile);
            audio1.load();
            audio1.play();
        }
    });
    // Creamos el contexto de audio
    // Este contexto es necesario para trabajar con la API de Web Audio
    const audioCtx = new AudioContext();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    // Conectamos el audioSource al analyser y el analyser al destino del contexto de audio
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    // Configuramos el analyser
    // fftSize define el número de puntos en el análisis de frecuencia
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / bufferLength;
    // Iniciamos la animación
    // La función animate se encargará de actualizar el canvas con los datos del analyser
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        // Cambia el color de las barras según el valor de barHeight y generamos las barras
        // Llamamos a la función drawVisualization para dibujar las barras en el canvas
        drawVisualization(bufferLength, barWidth, dataArray);
        // Dibuja las barras en el canvas
        requestAnimationFrame(animate);
    }
    //fin de la animacion
    animate(); // Inicia la animación para dibujar las barras en el canvas
});
/**
 * Dibuja la visualización del audio en el canvas.
 * @param bufferLength - Longitud del buffer de datos de frecuencia.
 * @param barWidth - Ancho de cada barra en la visualización.
 * @param dataArray - Array que contiene los datos de frecuencia del audio.
 */
function drawVisualization(bufferLength, barWidth, dataArray) {
    // Cambia el color de las barras según el valor de barHeight
    let x = 0;
    // Itera sobre cada valor en el dataArray para dibujar las barras
    // Cada barra representa un rango de frecuencias del audio
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        // Calcula el color de la barra utilizando los valores RGB
        // Los valores de rojo, verde y azul se ajustan según el índice y la altura
        const red = i * barHeight / 20;
        const green = i * 4;
        const blue = barHeight / 2;
        // Establece el color de la barra utilizando los valores RGB calculados
        // Los valores de rojo, verde y azul se ajustan según el índice y la altura
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}
