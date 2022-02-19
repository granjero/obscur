// Obscur materializado
// Caja de madera
// 2022

ancho = 3;
anchoPantalla = 154;
altoPantalla = 85;
anchoPpt = anchoPantalla * 2;
altoPpt = altoPantalla * 2.5;

anchoCaja =   anchoPpt * .8119;
altoCaja = altoPpt * .8; ;
profundoCaja = 55;

gris = 155 / 255;

// Paspartu
color([gris, gris, gris], 1) {
difference() {
    cube ([anchoPpt, altoPpt, ancho], true);
    cube ([anchoPantalla, altoPantalla, ancho + 1], true);
}
}
// Caja
color ("Orange", 1) {
    translate([0, 0, profundoCaja / 2])
difference() {
    cube ([anchoCaja, altoCaja, profundoCaja] , true);
    cube ([anchoCaja - 12, altoCaja - 12, profundoCaja + 1] , true);
}
}

/*
gris2 = 50 / 255;
// Marco
color ([gris2, gris2, gris2], 1) {
    translate([0, 0, -1])
difference() {
    cube ([anchoPpt + 50, altoPpt + 50, ancho] , true);
    cube ([anchoPpt, altoPpt, ancho +1 ] , true);
}
}
*/
echo ("ancho = ");
echo (anchoPpt);

echo ("alto = ");
echo (altoPpt);

echo ("Caja ancho= ");
echo (anchoCaja);

echo ("Caja alto = ");
echo (altoCaja);

echo(((altoPpt * anchoPpt) / (anchoPantalla * altoPantalla) )/ 1.64);