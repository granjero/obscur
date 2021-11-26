let segundos = 0;
let posMouse = [0,0]

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(5);
    frameRate(1);
    strokeWeight(1);
    stroke(255, 255, 255, 35);
}

function draw(){
    if(segundos % 12 == 0) {
        segundos = 1;
        background(5, 0, 5);
        dibuja = new Trazo;
        dibuja.arte(posMouse);
    }
    segundos++;
}

function mousePressed() {
    posMouse = [mouseX, mouseY];
}

class Trazo {
    // contruye los puntos iniciales y finales en el centro 
    // de la ventana y define el color del trazo
    constructor(){
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        //this.colorTrazo = 255;
    }

    ultimaDireccion = 'inicial';

    // devuelve una cantidad de segmentos para el trazo
    // :number
    segmentos() {
        return floor(random(8,12));
    }

    // devuelve una cantidad de trazos para el arte
    // :number
    trazos() {
        return floor(random(20,30));
    }

    // una suerte de reset para antes de cada trazo
    // :void
    centrar() {
        //this.colorTrazo = 255;       
        //if (posClick[0] > 0 ){
            //this.Pi = [posClick[0], posClick[1]];
            //this.Pf = [posClick[0], posClick[1]];
        //}
        //else {
            this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
            this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        //}
    }

    // el nuevo punto inicial del trazo es el final del anterior
    // :void
    nuevoPi() {
        this.Pi = this.Pf;
    }   

    // :number
    largoSegmentoVertical() {
        return floor(random(height * .15));
    }

    // :number
    largoSegmentoHorizontal() {
        return floor(random(width * .15));
    }

    // un nuevo punto final para el trazo según las reglas elegidas.
    // :void
    nuevoPf() {
        let direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
        let vert = this.largoSegmentoVertical();
        let hor = this.largoSegmentoHorizontal();
        let direccion = random(direcciones);
       
        while(direccion == this.ultimaDireccion) {
            direccion = random(direcciones);
        }

        switch (direccion) {
            case 'arriba':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[1] + vert >=  windowHeight * .95
                        ? [this.Pf[0], this.Pf[1] - vert]
                        : [this.Pf[0], this.Pf[1] + vert];

            case 'abajo':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[1] - vert <= windowHeight * .05 
                        ? [this.Pf[0], this.Pf[1] + vert]
                        : [this.Pf[0], this.Pf[1] - vert];

            case 'derecha':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[0] + hor >= windowWidth * .95
                        ? [this.Pf[0] - hor, this.Pf[1]]
                        : [this.Pf[0] + hor, this.Pf[1]];

            case 'izquierda':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[0] - hor <= windowWidth * .05
                        ? [this.Pf[0] + hor, this.Pf[1]]
                        : [this.Pf[0] - hor, this.Pf[1]];
        }
    }

    // :void
    cambiaColor(cant) {
        let modificador = floor(255 / cant *.5);
        this.colorTrazo = this.colorTrazo - modificador, 0, 0; 
        stroke(this.colorTrazo);
    }

    // :display
    dibujaSegmento() {
        //this.cambiaColor(cant);
        line(this.Pi[0], this.Pi[1],this.Pf[0], this.Pf[1]);
    }

    // :display
    arte(posClick) {
        for(let j = 0; j <= this.trazos(); j++) {
            this.centrar();
            let cantidad = this.segmentos();
            for(let i = 0; i <= cantidad; i++) {
               this.nuevoPi();
               this.nuevoPf();
                for(let k = 0; k < cantidad - i; k++) this.dibujaSegmento();
            }
        }
    }
}
