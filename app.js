const canvas=document.querySelector(".canvas");
const ctx=canvas.getContext('2d');
const colors = document.querySelector(".controls_colors");
const value =document.querySelector("input");
const mode =document.querySelector("#jsMode");
const save=document.querySelector("#jsSave");

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);
canvas.width=500;
canvas.height=500;

let filling=false;
function modeClick(event){

    if (!filling){
        event.target.innerText="PAINT";
        filling=true;
    }
    else{
        event.target.innerText="FILL";
        filling=false;
        
    }
}

function saveCanvas(event){
    var imgUrl=canvas.toDataURL('')

}
function getColor(){
    return colors.querySelector(".clicked").style.backgroundColor;
}
function getWidth(){
    return value.value;

}
function click_color(event){
    const path= event.path; 
    if (path[0].classList[0]==="controls_colors") return;
    if (path[0].classList[1]==="clicked") return;
    const rm_click= colors.querySelector(".clicked");
    rm_click.classList.remove("clicked");
    path[0].classList.add("clicked");
    
    
  
}


let painting=false;
function stopPainting(){
    painting=false;
}
function startPainting(){

    painting=true;
}
function onMouseMove(event){
    const x= event.offsetX;
    const y= event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.strokeStyle=getColor();
        ctx.lineWidth=getWidth();
        ctx.lineTo(x,y);
        
        ctx.stroke();
        
        
    }
    
}
function onMouseDown(event){
    painting=true;
    
    
}
function onMouseUp(event){
    
    stopPainting();
    
    
    
}
function handleCanvasClick(event){
    if (filling){
        ctx.fillStyle=getColor();
        ctx.fillRect(0,0,canvas.width,canvas.height);

    }
    


}   

function handleCM(event){
    event.preventDefault();
    //오른쪽 클릭 방지 . 
}
function handleSaveClick(event){
    // img로 저장 
    // toDataURL을 통해 image에 canvas 저장.
    const image= canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJs[EXPORT]"
    link.click();

}
function init(){
    if (canvas){
        canvas.addEventListener("mousemove",onMouseMove);
        canvas.addEventListener("mousedown",startPainting);
        canvas.addEventListener("mouseup",stopPainting);
        canvas.addEventListener("mouseLeave",stopPainting());
        save.addEventListener("click",saveCanvas);
        canvas.addEventListener("click",handleCanvasClick);
        canvas.addEventListener("contextmenu",handleCM);
    }
    colors.addEventListener("click",click_color);
    if(mode){
        mode.addEventListener("click",modeClick);
    }
    if(save){
        save.addEventListener("click",handleSaveClick);
    }
}

init();