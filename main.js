const canv = document.getElementById("canvas");
const c = canv.getContext("2d");
let grid = document.getElementById('grid');
let newIMG = document.getElementById('newIMG');

canv.width = 450;
canv.height = 450;

isHoldingLeft = false;
isHoldingRight = false;

class Vertice {
    constructor(pos, x, y){
        this.pos = pos;
        this.x = x;
        this.y = y;
    }
}

class Description {
    constructor(sides, sl, ia, para){
        this.sides = sides;
        this.sl = sl;
        this.ia = ia;
        this.para = para;
    }
}

function toDegrees(a){
    return a*(Math.PI/180);
}

function pythagoreanTheorem(a, b){
    return Math.sqrt((Math.pow(Math.abs(a.x - b.x), 2))+(Math.pow(Math.abs(a.y - b.y), 2)))/150;
}

let polygon = []
let shapeDesc = []

c.fillStyle = "white";
c.fillRect(0, 0, canv.width, canv.height);
c.drawImage(grid, 0, 0);
function generatePoly(sides){
    if(typeof sides == "number"){
        if(offang.value == "custom"){
            for (let i = 0; i <= sides; i++) {
            polygon.push(new Vertice(i, (150*Number(polarscale.value))*Math.cos(toDegrees(i*(360/sides)-Number(customAngle.value))), (150*Number(polarscale.value))*Math.sin(toDegrees(i*(360/sides)-Number(customAngle.value)))));          
            } 
        } else {
            for (let i = 0; i <= sides; i++) {
            polygon.push(new Vertice(i, (150*Number(polarscale.value))*Math.cos(toDegrees(i*(360/sides)-Number(offang.value))), (150*Number(polarscale.value))*Math.sin(toDegrees(i*(360/sides)-Number(offang.value)))));
            
            }
        }
    shapeDesc.push(new Description(sides, pythagoreanTheorem(polygon[0], polygon[1]), 180/sides, (sides*pythagoreanTheorem(polygon[0], polygon[1]))));
    drawPolygon()
    }
}

function drawPolygon() {
    c.beginPath();
    c.strokeStyle = lineColor.value;
    c.lineWidth = Number(thickness.value);
    c.moveTo(polygon[0].x + 225 + (75*Number(xshift.value)), polygon[0].y + 225 + (75*Number(yshift.value)));
    for (let i = 0; i < polygon.length; i++) {
        c.lineTo(polygon[i].x + 225 + (75*Number(xshift.value)), polygon[i].y + 225 + (75*Number(yshift.value)));
    }
    c.stroke();
    console.log(polygon[0].x);
    console.log(polygon[0].y);
    console.log(polygon[1].x);
    console.log(polygon[1].y);
    console.log(pythagoreanTheorem(polygon[0], polygon[1]));
    polygon = [];
}

function UIcheck() {
    if(offang.value == "custom"){
        document.getElementById("customAngle").style.visibility = "visible";
    } else {
        document.getElementById("customAngle").style.visibility = "hidden";
    }
}

function refreshCanvas(condition) {
    if(condition=='grid'){
        c.clearRect(0, 0, canv.width, canv.height);
        c.fillStyle = 'white';
        c.fillRect(0, 0, canv.width, canv.height);
        c.drawImage(grid, 0, 0);
    } else if (condition=='blank') {
        c.clearRect(0, 0, canv.width, canv.height);
        c.fillStyle = 'white';
        c.fillRect(0, 0, canv.width, canv.height);
    } else if (condition=='cleargrid') {
        c.clearRect(0, 0, canv.width, canv.height);
        c.drawImage(grid, 0, 0);
    } else if (condition=='empty') {
        c.clearRect(0, 0, canv.width, canv.height);
    }
}

function download_canv(){
    canv.crossorigin = 'anonymous';
    console.log(canv.toDataURL("image/png", "1.0"));
}

function drawFromData(url) {
    for(let i = 0; i < 1; i++){
        c.clearRect(0, 0, canv.width, canv.height);
        newIMG.src = url;
        c.drawImage(newIMG, 0, 0);        
    }

}

setInterval(UIcheck, 20);