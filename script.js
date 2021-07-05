const canvasEl = document.getElementById("myCanvas");
const ctx = canvasEl.getContext("2d");
let position = {
    x: 0,
    y: 0
};
let {
    x,
    y
} = position;


let fontColor = "#FF0000";
let boardColor = "#bec2c1";
let width = 5;
let eraserWidth = 10;

const offsetHeight = document.querySelector('.navbar').clientHeight;
const offsetWidth = document.querySelector('#menu').clientWidth;


const canvasHeight = window.innerHeight - offsetHeight - 2;
const canvasWidth = window.innerWidth - offsetWidth - 2

const canvasHeight = window.innerHeight - offsetHeight-2;
const canvasWidth = window.innerWidth - offsetWidth-2


// const offsetHeight = 30;
// const offsetWidth = 40;



function resize() {
    ctx.canvas.height = window.innerHeight - offsetHeight - 2;
    ctx.canvas.width = window.innerWidth - offsetWidth - 2;

function resize(){
    ctx.canvas.height = window.innerHeight - offsetHeight-2;
    ctx.canvas.width = window.innerWidth - offsetWidth-2;

    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

resize();
window.addEventListener('resize', resize);

canvasEl.addEventListener('mousedown', setPos);
canvasEl.addEventListener('mouseenter', setPos);
canvasEl.addEventListener('mousemove', draw);

function setPos(event) {
    x = event.clientX - offsetWidth;
    y = event.clientY - offsetHeight;
    console.log(x, y);
}

function draw(event) {
    if (event.buttons !== 1)
        return;

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = fontColor;
    ctx.moveTo(x, y);
    setPos(event);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
}


//start of color picker
let colorSelector = document.querySelector('.color-selector');
let colorChanger = document.querySelector('#colorselector');
let csBack = document.querySelector('.cs-back');
let flag;

let selectColor= () => csBack.style.visibility = 'visible';

colorChanger.addEventListener('click',changeColor);
colorSelector.addEventListener('click', selectColor);
csBack.addEventListener('click',lockcolorf);

function lockcolorf() {
    flag=1;
    csBack.style.visibility = 'hidden';
    colorSelector.style.visibility = "hidden";
    fontColor = colorSelector.value;
}

function changeColor() {
    if(flag==1){
        flag=0;
        return;
    }    
    colorSelector.style.visibility = 'visible';
    colorSelector.click();
    colorSelector.style.visibility = 'hidden';
}
//end of color picker




// function drawEraser(event){
//     ctx.beginPath();
//     setPos(event)
//     ctx.arc(x, y, eraserWidth, 0, Math.PI*2);
//     ctx.fillStyle = boardColor;
//     ctx.strokeStyle = "black";
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// canvasEl.addEventListener('mousemove', drawEraser);

// function eraser(event){
//     ctx.beginPath();
//     setPos(event)
//     ctx.arc(x, y, eraserWidth, 0, Math.PI*2);
//     ctx.fillStyle = boardColor;
//     ctx.strokeStyle = "black";
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();
// }