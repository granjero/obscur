let segundos = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
	background(5);
	frameRate(1);
    strokeWeight(1);
    stroke(255);
}

function draw(){
    if(segundos % 12 == 0) {
        segundos = 1;
        background(5);
        dibuja = new Trazo;
        dibuja.arte();
    }
    segundos++;
}


class Trazo {
    // contruye los puntos iniciales y finales en el centro 
    // de la ventana y define el color del trazo
    constructor(){
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.colorTrazo = 255;
    }

    // devuelve una cantidad de segmentos para el trazo
    segmentos() {
        return floor(random(5, 20));
    }

    // devuelve una cantidad de trazos para el arte
    trazos() {
        return floor(random(15,25));
    }

    // una suerte de reset para antes de cada trazo
    centrar() {
        this.colorTrazo = 255;       
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
    }

    // el nuevo punto inicial del trazo es el final del anterior
    nuevoPi() {
        this.Pi = this.Pf;
    }   

    // un nuevo punto final para el trazo según las reglas elegidas.
    nuevoPf() {
        let direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
        let vert = floor(random(height*.05, height*.075));
        let hor = floor(random(width*.05, width*.075));
        let direccion = random(direcciones);

        switch (direccion) {
            case 'arriba':
                this.Pf = [this.Pf[0], this.Pf[1] + vert];
                return;

            case 'abajo':
                this.Pf = [this.Pf[0], this.Pf[1] - vert];
                return;

            case 'derecha':
                this.Pf = [this.Pf[0] + hor, this.Pf[1]];
                return;

            case 'izquierda':
                this.Pf = [this.Pf[0] - hor, this.Pf[1]];
                return;
        }
    }

    cambiaColor(cant) {
        let modificador = floor(255 / cant - 3);
        this.colorTrazo = this.colorTrazo - modificador; 
        stroke(this.colorTrazo);
    }

    dibujaSegmento(cant) {
        this.cambiaColor(cant);
        line(this.Pi[0], this.Pi[1],this.Pf[0], this.Pf[1]);
    }

    arte() {
        for(let j = 0; j < this.trazos(); j++) {
            this.centrar();
            let cantidad = this.segmentos();
            for(let i = 0; i < cantidad; i++) {
               this.nuevoPi();
               this.nuevoPf();
               this.dibujaSegmento(cantidad);
            }
        }
    }
}
