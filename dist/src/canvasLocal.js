var CanvasLocal = /** @class */ (function () {
    function CanvasLocal(g, canvas) {
        this.graphics = g;
        this.rWidth = 25;
        this.rHeight = 25;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = this.maxY;
    }
    CanvasLocal.prototype.iX = function (x) { return Math.round(this.centerX + x / this.pixelSize); };
    CanvasLocal.prototype.iY = function (y) { return Math.round(this.centerY - y / this.pixelSize); };
    CanvasLocal.prototype.drawLine = function (x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    };
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
    CanvasLocal.prototype.dibujarPixel = function (x, y) {
        this.graphics.fillRect(this.iX(x), this.iY(y + 1), this.iX(1) - this.iX(0), this.iX(1) - this.iX(0));
    };
    CanvasLocal.prototype.paint = function () {
        //this.drawLine(-100,0,this.maxX,0);
        this.drawLine(this.iX(0), this.iY(0), this.iX(25), this.iY(0));
        /*this.drawLine(this.iX(0), this.iY(-5), this.iX(0), this.iY(5));
        this.drawLine(this.iX(0), this.iY(0), this.iX(3.14159), this.iY(2));
        */
        var tamX = 25;
        var tamY = 25;
        this.graphics.fillStyle = "red";
        for (var i = 0; i < 25; i++)
            for (var j = 0; j < 25; j++)
                if (Math.random() > 0.5)
                    this.dibujarPixel(i, j);
        this.graphics.fillStyle = "black";
        for (var x = 0; x <= tamX; x++)
            this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(tamX));
        for (var y = 0; y <= tamY; y++)
            this.drawLine(this.iX(0), this.iY(y), this.iX(tamY), this.iY(y));
    };
    CanvasLocal.prototype.paintQR = function () {
        var _this = this;
        var size = 21;
        this.graphics.fillStyle = 'white';
        this.graphics.fillRect(this.iX(0), this.iY(size), this.iX(size) - this.iX(0), this.iY(0) - this.iY(size));
        var dibujarOjo = function (x, y) {
            _this.graphics.fillStyle = 'black';
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 7; j++) {
                    _this.dibujarPixel(x + i, y + j);
                }
            }
            _this.graphics.fillStyle = 'white';
            for (var i = 1; i <= 5; i++) {
                for (var j = 1; j <= 5; j++) {
                    _this.dibujarPixel(x + i, y + j);
                }
            }
            _this.graphics.fillStyle = 'black';
            for (var i = 2; i <= 4; i++) {
                for (var j = 2; j <= 4; j++) {
                    _this.dibujarPixel(x + i, y + j);
                }
            }
        };
        dibujarOjo(0, 0);
        dibujarOjo(size - 7, 0);
        dibujarOjo(0, size - 7);
        this.graphics.fillStyle = 'black';
        for (var i = 0; i < size; i++) {
            this.dibujarPixel(i, 0);
            this.dibujarPixel(i, size - 1);
            this.dibujarPixel(0, i);
            this.dibujarPixel(size - 1, i);
        }
        this.graphics.fillStyle = 'black';
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var enOjo = (x <= 6 && y <= 6) ||
                    (x >= size - 7 && y <= 6) ||
                    (x <= 6 && y >= size - 7) ||
                    (x === 0 || x === size - 1 || y === 0 || y === size - 1);
                if (!enOjo && Math.random() > 0.5) {
                    this.dibujarPixel(x, y);
                }
            }
        }
    };
    return CanvasLocal;
}());
export { CanvasLocal };
