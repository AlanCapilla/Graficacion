const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const inputsContainer = document.getElementById('inputsContainer')!;
const cantidadBarras = document.getElementById('barraCantidad') as HTMLInputElement;

const colores = ['#00BFFF', '#9ACD32', '#FF1493', '#FFA500']; // Puedes mantener o quitar
let valores: number[] = [];

document.getElementById('btn_generar')?.addEventListener('click', () => { // Creamos el evento del boton
    const cantidad = parseInt(cantidadBarras.value);// tranformamos la cantidad de columnas en un Int

    if (isNaN(cantidad) || cantidad <= 0) {//Verificamos si estas son numeros positivos
        return alert('====ERROR==== Ingrese valores mayores a 0');
    }

    inputsContainer.innerHTML = '';
    valores = new Array(cantidad).fill(0);

    // Solo genera barras blancas sin pintar con valores
    //generarBarrasEnBlanco(cantidad);

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '100';
        input.value = '0';
        input.style.marginRight = '5px';

        input.addEventListener('input', () => {
            const val = Math.min(100, Math.max(0, parseInt(input.value) || 0));
            valores[i] = val;
            pintarBarras(valores);
        });

        inputsContainer.appendChild(document.createTextNode(`Barra ${i + 1}: `));
        inputsContainer.appendChild(input);
    }
    pintarBarras(valores);
});
/**
 * 
 * No funciona la funcion, no genera nada, por mas que quise ahcer modificaciones 
 
function generarBarrasEnBlanco(cantidad: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const anchoBarra = 40;
    const espacio = 20;
    const altoMax = 400;
    const baseY = canvas.height - 40;
    const profundidad = 20;

    for (let i = 0; i < cantidad; i++) {
        const x = 50 + i * (anchoBarra + espacio);
        const frenteX = x;
        const frenteY = baseY - altoMax;

        // Fondo blanco máximo
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(frenteX, frenteY, anchoBarra, altoMax);

        // Cara superior blanca
        ctx.beginPath();
        ctx.moveTo(frenteX, frenteY);
        ctx.lineTo(frenteX - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX + anchoBarra - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX + anchoBarra, frenteY);
        ctx.closePath();
        ctx.fillStyle = "#e0e0e0";
        ctx.fill();

        // Cara lateral blanca
        ctx.beginPath();
        ctx.moveTo(frenteX, frenteY);
        ctx.lineTo(frenteX - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX - profundidad, baseY - profundidad);
        ctx.lineTo(frenteX, baseY);
        ctx.closePath();
        ctx.fillStyle = "#d0d0d0";
        ctx.fill();
        
    }
}
*/
function pintarBarras(porcentajes: number[]) {
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    const anchoBarra = 40;
    const espacio = 20;
    const altoMax = 400;
    const baseY = canvas.height - 40;
    const profundidad = 20; // profundidad en "3D"

    

    porcentajes.forEach((porc, i) => {
        const x = 50 + i * (anchoBarra + espacio);
        const h = (porc / 100) * altoMax;
        const color = colores[i % colores.length];

        const frenteX = x;
        const frenteY = baseY - h;

        // === 1. Cara frontal ===
        ctx.fillStyle = color;
        ctx.fillRect(frenteX, frenteY, anchoBarra, h);

        // === 2. Cara superior ===
        ctx.beginPath();
        ctx.moveTo(frenteX, frenteY);
        ctx.lineTo(frenteX - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX + anchoBarra - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX + anchoBarra, frenteY);
        ctx.closePath();
        ctx.fillStyle = aclararColor(color, 0.3);
        ctx.fill();

        // === 3. Cara lateral ===
        ctx.beginPath();
        ctx.moveTo(frenteX, frenteY);
        ctx.lineTo(frenteX - profundidad, frenteY - profundidad);
        ctx.lineTo(frenteX - profundidad, frenteY + h - profundidad);
        ctx.lineTo(frenteX, frenteY + h);
        ctx.closePath();
        ctx.fillStyle = oscurecerColor(color, 0.3);
        ctx.fill();

        // Texto del %
        ctx.fillStyle = color;
        ctx.font = 'bold 28px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(`${porc}%`, x + anchoBarra / 2, baseY + 35);
    });

    function aclararColor(hex: string, factor: number): string {
        const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 255 * factor);
        const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 255 * factor);
        const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 255 * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function oscurecerColor(hex: string, factor: number): string {
        const r = Math.max(0, parseInt(hex.slice(1, 3), 16) * (1 - factor));
        const g = Math.max(0, parseInt(hex.slice(3, 5), 16) * (1 - factor));
        const b = Math.max(0, parseInt(hex.slice(5, 7), 16) * (1 - factor));
        return `rgb(${r}, ${g}, ${b})`;
    }

}
