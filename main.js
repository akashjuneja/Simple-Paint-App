//5 Events are added
//1. MouseDown (when user will start dragging)
//2. Mousemove(when user is dragging)
//3. MouseUp (when user will stop dragging)
//4. Clear(clearing all the events)
//5. DoubleClick event to delete

 canvas=document.getElementById('canvas');
 ctx=canvas.getContext('2d');
 var mousemoved=false;
 var cordstart;

 //Capturing the coordinates when user started dragingging 
 canvas.addEventListener('mousedown',(e)=>{
     mousemoved=true;
     //function call to get the postion of coordinates
     cordstart=dragMousecalc(canvas ,e);
     
     //making a function call to capture the coordinates
     copyPreviousCoordinates();
       
 },false);

//copy previous coordinates
function copyPreviousCoordinates(){
     prevData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

//paste previous data
function pastePreviousCoordinates(){
   ctx.putImageData(prevData, 0, 0);
}

//
 //drawing the rectange, when the user is dragging mouse
canvas.addEventListener('mousemove',(e)=>{
    if(mousemoved==true){
        //making a function call to copy the coordinates  
        pastePreviousCoordinates();
        var cord=dragMousecalc(canvas ,e);
        //drawing the rectangle
        ctx.beginPath();

        ctx.rect(cord.x,cord.y,cordstart.x-cord.x,cordstart.y-cord.y);
        console.log(cord.x,cord.y,cordstart.x-cord.x,cordstart.y-cord.y)
        
        //generating random color from a set of array
       var colors = ["red","blue","green","yellow"];
       var randColor = colors[Math.floor(Math.random() * colors.length)];

       //filling the rectnagle
     ctx.fillStyle=randColor;
     ctx.fill();
    }

},false)

//when dragging will stop

canvas.addEventListener('mouseup',(e)=>{
    var cord=dragMousecalc(canvas ,e);
    pastePreviousCoordinates();
    mousemoved=false;
     ctx.beginPath();

        ctx.rect(cord.x,cord.y,cordstart.x-cord.x,cordstart.y-cord.y);

        //generating random color from a set of array
    //    var colors = ["red","blue","green","yellow"];
    //    var randColor = colors[Math.floor(Math.random() * colors.length)];

       //filling the rectnagle
    //  ctx.fillStyle=randColor;
     ctx.fill();


},false)

//doubleclick to delete

canvas.addEventListener('dblclick',(e)=>{
    var cord=dragMousecalc(canvas ,e);
    pastePreviousCoordinates();
    ctx.clearRect(0,0,cordstart.x-cord.x,cordstart.y-cord.y);

},false)


function clearArea() {
    var clearButton=document.getElementById('button');
    clearButton.addEventListener('mousedown',()=>{
       ctx.clearRect(0,0,canvas.width, canvas.height);
    })
    
}


//function to get the coordinates of the mouse 
function dragMousecalc(canvas,e){
      return{
         x: (e.clientX-canvas.getBoundingClientRect().left),
         y: (e.clientY-canvas.getBoundingClientRect().top)
    
     }

}


