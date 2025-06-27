// codigo fuente en ts 
//Segun el tutorial de https://www.youtube.com/watch?v=VXWvfrmpapI&list=PLYElE_rzEw_sHeIIv7BMliQF5zB7BliJE || Frank's Laboratory
// se hace el siguiente codigo para graficar el audio, basado en Ts
//Alan Capilla Guzman


// mandamos a llamas los elementos que ocuparemos 

const container = document.getElementById('container') as HTMLElement;
const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const file = document.getElementById('fileupload') as HTMLInputElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; 

//Ajustamos el tamaño del canvas al tamaño de la ventana
// Esto permite que el canvas ocupe todo el espacio disponible en la ventana del navegador
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let audioSource :MediaElementAudioSourceNode;
let analyser : AnalyserNode;

container.addEventListener('click', () => {

  console.log('Hola, si esta funcionando el evento click');
    // Obtiene el elemento de audio
  const audio1 = document.getElementById('audio1') as HTMLAudioElement;

  file.addEventListener('change', (e:Event) => {
    const target = e.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    // Verifica si se ha seleccionado un archivo
    if (!selectedFile) {
      alert('Insertar un Archivo de audio');
    }
    // Verifica si el archivo es de tipo audio
    if(selectedFile){
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

  function animate():void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    // Cambia el color de las barras según el valor de barHeight
    drawVisualization(bufferLength, barWidth, dataArray);
    // Dibuja las barras en el canvas
    requestAnimationFrame(animate);
  }

  animate();
});

function drawVisualization(bufferLength: number, barWidth: number, dataArray: Uint8Array) : void {
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
