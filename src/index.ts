import { CanvasLocal } from './canvasLocal.js';

const canvas = document.getElementById('circlechart') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const miCanvas = new CanvasLocal(ctx, canvas);

const btnGen = document.getElementById('btn_gen')!;
const urlInput = document.getElementById('url_in') as HTMLInputElement;

btnGen.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert('Ingresa una URL válida');
        return;
    }

    // Aquí podrías usar la URL para algo, pero ahora solo pintamos el QR “en forma”
    miCanvas.paintQR();
});
