window.addEventListener('DOMContentLoaded',()=>{
    const canva = document.getElementById('canvas') as HTMLCanvasElement;


    // declaramos que trabajaremos en 2d
    const ctx = canva.getContext('2d');
    if (!ctx) return;//

   const columas = 4;// cantidad de columnas
   const filas = 3; // cantidad de filas

    const startX = 50; // punto inicial en X
    const startY = 50; // punto inicial en Y
    const cellSize = 60; // tamaño entre celdas
    //Para los puntos
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //para las lineas
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    
    //digujaremos las lineas
    for (let i = 0; i < columas; i++) {
        const x = startX + i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + filas * cellSize);
        ctx.stroke();
    }

    // Líneas horizontales
    for (let j = 0; j < filas; j++) {
        const y = startY + j * cellSize;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + columas * cellSize, y);
        ctx.stroke();
    }

    //Creamos un ciclo en el cual dibujaremos los puntos y coordenadas 
   for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columas; j++) {
            const x = startX + j * cellSize;
            const y = startY + i * cellSize;

            //Dibujar el punto
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();

            //coodernada
            const labelX = 5 + j;
            const labelY = 4 - i + 1; // para que el eje Y esté de arriba a abajo como en la imagen
            ctx.fillText(`(${labelX}, ${labelY})`, x, y - 15); // texto arriba del punto
            
        }
    
   }

    // === ETIQUETAS DE LOS EJES === Esta parte fue consultada a ChatGPT
    ctx.fillStyle = 'black';

    // Eje X
    for (let i = 0; i < columas; i++) {
        const x = startX + i * cellSize + cellSize / 2;
        ctx.fillText(`${5 + i}.0`, x, startY + filas * cellSize + 20);
    }

    // Eje Y
    for (let j = 0; j < filas; j++) {
        const y = startY + j * cellSize + cellSize / 2;
        ctx.fillText(`${14 - j}.0`, startX - 30, y);
    }
   
});