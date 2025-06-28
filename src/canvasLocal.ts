import { Play } from "./play.js";

export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  step: number;
  mallaSize: number;
  juego: Play;
  blockSize: number;
  
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.mallaSize = 50;
    this.rWidth = this.mallaSize*1.33;
    this.rHeight= this.mallaSize;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/12*1.5;
    this.centerY = this.maxY-2;
    this.step = 0;
    
    this.blockSize = this.iX(1) - this.iX(0);
    this.juego = new Play(this.mallaSize);
		this.juego.generaMatriz2();
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }
  
  getGraphics(): CanvasRenderingContext2D{
    return this.graphics;
  }

  paint() {
    let res: number[][];
    
    //dibuja la cuadricula
    this.graphics.fillStyle = 'white';
    this.graphics.fillRect(0, 0, this.maxX, this.maxY);
    this.graphics.strokeStyle = 'lightgray';
   /* for (let x = 0; x <= this.mallaSize; x++){
      this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(this.mallaSize));
    }
    for (let y = 0; y <= this.mallaSize; y++){
      this.drawLine(this.iX(0), this.iY(y), this.iX(this.mallaSize), this.iY(y));
    }*/
    
    //trazar el juego (los cuadritos) a partir de la matriz creada
    res = this.juego.getMat();
    this.graphics.fillStyle = 'black';
		for(let i=0; i<this.mallaSize; i++){
			for(let j=0;j<this.mallaSize; j++){	 
        if (res[i][j] == 1)
          this.graphics.fillRect(this.iX(i), this.iY(j), this.blockSize, this.blockSize);
      }
    }
    //actualizar la matriz para la siguiente pasada
		res=this.juego.juegoDeLaVida(this.juego.getMat());
		this.juego.setMat(res);
  }

}