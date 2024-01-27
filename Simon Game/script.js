let boxes= document.querySelectorAll(".box");
let msg= document.querySelector("#msg");
let resetBtn= document.querySelector("#reset");

let level=0;
let started= false;
let userSeq=[];
let gameSeq=[];
let highestScore=0;

//generate randome click for computer
const genRandomClick= ()=>{
  let arr= ["first","second","third","fourth"];
  let randomeIndx= Math.floor(Math.random()*arr.length);
  let comp_Choice= arr[randomeIndx];
  let rndmBtn = document.querySelector(`.${comp_Choice}`);
  // console.log(randomeIndx);
  // console.log(comp_Choice);
  // console.log(rndmBtn);
  gameSeq.push(comp_Choice);
  console.log(gameSeq);
  return rndmBtn;
};


//button flash
const flashBtn=(btn)=>{
    btn.classList.add("flash");
    setTimeout(function(){
    btn.classList.remove("flash");
    },250);
};


//Levelup function

const levelUp=()=>{
  userSeq=[];
 level++;
 msg.innerText= `Level ${level}`;
 let i= genRandomClick();
 flashBtn(i);
};


//Start the Game by pressing any key


document.addEventListener("keypress",()=>{
  
    if(started==false){
      console.log("Game is Started");
      started=true;
      
       levelUp();
     }
})


//Check the seaquence

const checkSeq=(idx)=>{
  if(userSeq[idx]=== gameSeq[idx]){
    if(userSeq.length== gameSeq.length){
      levelUp();
    }
  }
  else{
    if(highestScore<level){
      highestScore= level;
    }
    msg.innerText= `Highest Score is ${highestScore}. \n Game is Over! Your score is ${level} \n Press any Key to Start `;
    let body=document.querySelector("body");
    body.classList.add("gameOver");
    setTimeout(function(){
      body.classList.remove("gameOver")
    },250);
    resetGame();
    
  }
}



//user flash
boxes.forEach((btn)=>{
     btn.addEventListener(("click"),()=>{
      flashBtn(btn);
      let userColor= btn.getAttribute("Id");
      // console.log(userColor);
      userSeq.push(userColor);
      checkSeq(userSeq.length-1);
     })
});

//Reset Function

function resetGame(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;

};

resetBtn.addEventListener("click",()=>{
  msg.innerText=`Press any key to Start.`
  resetGame();
});


