let segundos = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(5);
    frameRate(1);
    strokeWeight(1);
    stroke(255, 255, 255, 25);
}

function draw(){
    if(segundos % 12 == 0) {
        segundos = 1;
        background(5, 0, 5);
        dibuja = new Trazo;
        dibuja.arte();
    }
    segundos++;
}

function mousePressed() {
}

class Trazo {
    // contruye los puntos iniciales y finales en el centro 
    // de la ventana
    constructor(){
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
    }

    ultimaDireccion = 'inicial';
    segmMin = 8;
    segmMax = 12;
    trazMin = 20;
    trazMax = 40;
    modificadorLargo = .2;

    // devuelve una cantidad de segmentos para el trazo
    // :number
    segmentos() {
        return floor(random(this.segmMin, this.segmMax));
    }

    // devuelve una cantidad de trazos para el arte
    // :number
    trazos() {
        return floor(random(this.trazMin, this.trazMax));
    }

    // una suerte de reset para antes de cada trazo
    // :void
    centrar() {
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
    }

    // el nuevo punto inicial del trazo es el final del anterior
    // :void
    nuevoPi() {
        this.Pi = this.Pf;
    }   

    // :number
    largoSegmentoVertical() {
        return floor(random(height * this.modificadorLargo));
    }

    // :number
    largoSegmentoHorizontal() {
        return floor(random(width * this.modificadorLargo));
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

        direccion = random(direcciones);

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

    // :display
    dibujaSegmento() {
        line(this.Pi[0], this.Pi[1],this.Pf[0], this.Pf[1]);
    }

    // :display
    arte() {
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
