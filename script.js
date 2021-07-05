const canvasEl = document.getElementById("myCanvas");
const ctx = canvasEl.getContext("2d");
let position = { x: 0, y: 0 };
let { x, y } = position;

const offsetHeight = document.querySelector('.navbar').clientHeight;
const offsetWidth = document.querySelector('#menu').clientWidth;

const canvasHeight = window.innerHeight - offsetHeight - 2;
const canvasWidth = window.innerWidth - offsetWidth - 2

const pencilEl = document.querySelector("#pencil-btn");
const eraserEl = document.querySelector("#eraser-btn");
const clearEl = document.querySelector("#clear-all");
const shapesEl = document.querySelector("#shapes-btn");
const backgroundColorEl = document.querySelector("#background-color-btn");

let isPencil = true;
let isEraser = false;
let isCircle = false;
let isSquare = false;

let pencilWidth = 1;
let eraserWidth = 10;
let pencilWidthMax = 25;
let eraserWidhtMax = 70;
let widthMin = 1;

let circleRadius = 10;
let squareDimension = 20;

let fontColor = "#FF0000";
// let boardColor = "#bec2c1";
let boardColor = "#292928";

// const offsetHeight = 30;
// const offsetWidth = 40;

function defaultSetting() {
    isPencil = true;
    isEraser = false;
    isCircle = false;
    isSquare = true;
}

function resize() {
    ctx.canvas.height = window.innerHeight - offsetHeight - 2;
    ctx.canvas.width = window.innerWidth - offsetWidth - 2;
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

resize();
window.addEventListener('resize', resize);

canvasEl.addEventListener('mousedown', setPos);
canvasEl.addEventListener('mouseenter', setPos);

function setPos(event) {
    x = event.clientX - offsetWidth;
    y = event.clientY - offsetHeight;
    // console.log(x, y);
}

pencilEl.addEventListener('click', () => {
    isPencil = true;
    isEraser = false;
    isSquare = false;
    isCircle = false;
})

eraserEl.addEventListener('click', () => {
    isPencil = false;
    isEraser = true;
    isSquare = false;
    isCircle = false;
})

//have to change below function depending upon the given input shape.
shapesEl.addEventListener('click', () => {
    isPencil = false;
    isEraser = false;
    isSquare = false;
    isCircle = true;
})

clearEl.addEventListener('click', clearAll);

document.addEventListener('keydown', pencilKeydown);
document.addEventListener('keydown', eraserKeydown);
document.addEventListener('keydown', clearAllKeydown);
document.addEventListener('keydown', pencilColorSelectorKeydown);
document.addEventListener('keydown', backgroundColorSelectorKeydown);
document.addEventListener('keydown', WidthModifyKeydown);
document.addEventListener('keydown', WidthModifyKeydown);
document.addEventListener('keydown', undoKeydown);

function pencilKeydown(event) {
    if (event.key == "P" || event.key == 'p') {
        isPencil = true;
        isEraser = false;
        isSquare = false;
        isCircle = false;
    }
}

function eraserKeydown(event) {
    if (event.key == "E" || event.key == "e") {
        isPencil = false;
        isEraser = true;
        isSquare = false;
        isCircle = false;
    }
}

function clearAllKeydown(event) {
    if (event.key == "C" || event.key == "c") {
        clearAll();
    }
}

function pencilColorSelectorKeydown(event){
    if(event.key == "o" || event.key == "O"){
        colorChanger.click();
    }
}

function backgroundColorSelectorKeydown(event) {
    if (event.key == 'b' || event.key == "B") {
        backgroundColorEl.click();
    }
}

function WidthModifyKeydown(event) {
    if (isPencil == true) {
        if (event.key == '+') {
            pencilWidth += 1;
            if (pencilWidth >= pencilWidthMax) {
                pencilWidth = pencilWidthMax;
            }
        } else if (event.key == '-') {
            pencilWidth -= 1;
            if (pencilWidth <= widthMin) {
                pencilWidth = widthMin;
            }
        }
    }

    if (isEraser == true) {
        if (event.key == '+') {
            eraserWidth += 1;
            if (eraserWidth >= eraserWidhtMax) {
                eraserWidth = eraserWidhtMax;
            }
        } else if (event.key == '-') {
            eraserWidth -= 1;
            if (eraserWidth <= widthMin) {
                eraserWidth = widthMin;
            }
        }
    }

    if (isCircle == true) {
        if (event.key == '+') {
            circleRadius += 1;
            if (circleRadius >= 90) {
                circleRadius = 90;
            }
        } else if (event.key == '-') {
            circleRadius -= 1;
            if (circleRadius <= 10) {
                circleRadius = 10;
            }
        }
    }
}

function undoKeydown(event){
    if(event.key == 'u' || event.key =='U'){
        undo();
    }
}

canvasEl.addEventListener('mousemove', draw);
canvasEl.addEventListener('mousedown', draw);

function draw(event) {
    if (event.buttons !== 1)
        return;
    if (isPencil == false)
        return;

    ctx.beginPath();
    ctx.lineWidth = pencilWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = fontColor;
    ctx.moveTo(x, y);

    let moveToX = x;
    let moveToY = y;

    setPos(event);
    ctx.lineTo(x, y);

    let lineToX = x;
    let lineToY = y;

    ctx.stroke();
    ctx.closePath();

    let taskPerformed = { moveX: moveToX, moveY: moveToY, lineX: lineToX, lineY: lineToY, lastPencilwidth: pencilWidth, lastFontColor: fontColor, lastEraserWidth: eraserWidth, lastBoardColor: boardColor, wasPencil: isPencil, wasEraser: isEraser };
    lastTaskPerformed.push(taskPerformed);
}

canvasEl.addEventListener('mousemove', drawEraser);
canvasEl.addEventListener('mousedown', drawEraser);

function drawEraser(event) {
    if (event.buttons !== 1)
        return;
    if (isEraser == false)
        return;

    ctx.beginPath();
    ctx.lineWidth = eraserWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = boardColor;
    ctx.moveTo(x, y);

    let moveToX = x;
    let moveToY = y;

    setPos(event);
    ctx.lineTo(x, y);

    let lineToX = x;
    let lineToY = y;

    ctx.stroke();
    ctx.closePath();

    let taskPerformed = { moveX: moveToX, moveY: moveToY, lineX: lineToX, lineY: lineToY, lastPencilwidth: pencilWidth, lastFontColor: fontColor, lastEraserWidth: eraserWidth, lastBoardColor: boardColor, wasPencil: isPencil, wasEraser: isEraser };
    lastTaskPerformed.push(taskPerformed);
}

function clearAll() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    lastTaskPerformed = [];
}

canvasEl.addEventListener('mousedown', shapeCircle)

function shapeCircle(event) {
    if (event.buttons !== 1)
        return;
    if (isCircle == false)
        return;
    ctx.beginPath();
    ctx.lineWidth = 1;
    setPos(event);
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function shapeSquare(event) {
    if (event.buttons !== 1)
        return;
    if (isSquare == false)
        return;

    ctx.beginPath();
    ctx.lineWidth = 1;
    setPos(event);
    ctx.rect(x, y, squareDimension, squareDimension);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

//start of color picker
let colorSelector = document.querySelector('.color-selector');
let colorChanger = document.querySelector('#colorselector');
let csBack = document.querySelector('.cs-back');
let flag;

let selectColor = () => csBack.style.visibility = 'visible';

colorChanger.addEventListener('click', changeColor);
colorSelector.addEventListener('click', selectColor);
csBack.addEventListener('click', lockcolorf);

function lockcolorf() {
    flag = 1;
    csBack.style.visibility = 'hidden';
    colorSelector.style.visibility = "hidden";
    fontColor = colorSelector.value;
}

function changeColor() {
    if (flag == 1) {
        flag = 0;
        return;
    }
    colorSelector.style.visibility = 'visible';
    colorSelector.click();
    colorSelector.style.visibility = 'hidden';
}
//end of color picker

//start of background
let bgcolorChanger = document.querySelector('.bgcolor-selector');
let bgBack = document.querySelector('.bg-back');
let bgflag;

let bgselectColor = () => bgBack.style.visibility = 'visible';

backgroundColorEl.addEventListener('click', backgroundColorSelector);
bgcolorChanger.addEventListener('click', bgselectColor);
bgBack.addEventListener('click', bglockcolorf);

function bglockcolorf() {
    bgflag = 1;
    bgBack.style.visibility = 'hidden';
    bgcolorChanger.style.visibility = "hidden";
    boardColor = bgcolorChanger.value;
    // resize();
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function backgroundColorSelector() {
    if (bgflag == 1) {
        bgflag = 0;
        return;
    }
    bgcolorChanger.style.visibility = 'visible';
    bgcolorChanger.click();
    bgcolorChanger.style.visibility = 'hidden';
    defaultSetting();
}

//end of background


//start of introcard
let introcard = document.querySelector('.introcard');
let closeModalButton = document.querySelector('.close-button');
let remembercheck = document.querySelector('#remembercheck');

closeModalButton.addEventListener('click',closeintro);

if(localStorage.getItem("introboxhide"))
    introcard.style.visibility='hidden';
else
    introcard.style.visibility='visible';

function closeintro() {
    introcard.style.visibility='hidden';
    if(remembercheck.checked)
        localStorage.setItem("introboxhide","true");
    console.log(localStorage.getItem("introboxhide"));
}
//end of introcard

//start of undo
const undoBtnEl = document.querySelector("#undo");
let lastTaskPerformed = [];
let positionRange = [];
let tempArr = [];
let indexRange;

canvasEl.addEventListener('mousedown', setPositionRange);
canvasEl.addEventListener('mouseup', setPositionRange);

// function setPositionRange(){
//     let position = {x:x, y:y};
//     positionRange.push(position);
// }

function setPositionRange() {
    let taskPerformed = { rangeX: x, rangeY: y, wasPencil: false, wasEraser: false };
    lastTaskPerformed.push(taskPerformed);

    let position = {x:x, y:y};
    positionRange.push(position);
}

function deletePositionRange(){
    //even - starting, odd - ending [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    for(let i = 0; i < lastTaskPerformed.length; i++){
        if(lastTaskPerformed[i].rangeX == positionRange[positionRange.length-2].x){
            if(lastTaskPerformed[i].rangeY == positionRange[positionRange.length-2].y){
                // positionRange.pop();
                // positionRange.pop();
                indexRange = i;
                break;
            }
        }
    }

    for(let i = 0; i < lastTaskPerformed.length - indexRange; i++){
        lastTaskPerformed.pop();
    }

    // lastTaskPerformed.slice(0, indexRange);
}

undoBtnEl.addEventListener('mousedown', undo);

function undo() {
    deletePositionRange();
    lastTaskPerformed.pop();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < lastTaskPerformed.length; i++) {
        if (lastTaskPerformed[i].wasPencil == true) {
            ctx.beginPath();
            ctx.lineWidth = lastTaskPerformed[i].lastPencilwidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = lastTaskPerformed[i].lastFontColor;
            ctx.moveTo(lastTaskPerformed[i].moveX, lastTaskPerformed[i].moveY);
            ctx.lineTo(lastTaskPerformed[i].lineX, lastTaskPerformed[i].lineY);
            ctx.stroke();
            ctx.closePath();
        }
        if (lastTaskPerformed[i].wasEraser == true) {
            ctx.beginPath();
            ctx.lineWidth = lastTaskPerformed[i].lastEraserWidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = lastTaskPerformed[i].lastBoardColor;
            ctx.moveTo(lastTaskPerformed[i].moveX, lastTaskPerformed[i].moveY);
            ctx.lineTo(lastTaskPerformed[i].lineX, lastTaskPerformed[i].lineY);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

//end of undo
