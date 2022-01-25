
var begin = document.querySelector(".begin");
var clock = document.querySelector("#clock");
var ques = document.querySelector(".ques");
var ans1 = document.querySelector(".ans1");
var ans2 = document.querySelector(".ans2");
var ans3 = document.querySelector(".ans3");
var firstsec = document.querySelector(".firstsec");
var submit = document.querySelector(".submit");
var topscore = document.querySelector(".topscore");
var score = document.querySelector("#score");
var ans4 = document.querySelector(".ans4");
var contentsec = document.querySelector(".contentsec");
var Result = document.querySelector("#result");


var ques1 = "How to know the number of elements of a form?"
var ques2 = "Why event handlers is needed in JS?"
var ques3 = "Which of the following object is the main entry point to all client-side JavaScript features and APIs??"
var ques4 = "In which element do we insert javascript?"
var ques5 = "How would you put Hello Gohan in alert box?"
var quesall = [ques1, ques2, ques3, ques4, ques5];


var mcq1 = {
    option1: "document.myform.elements.count",
    option2: "document.myform.length",
    option3: "document.myform.count",
    option4: "document.myform.elements.length"
}
var mcq2 = {
    option1: "Allows JavaScript code to alter the behaviour of windows",
    option2: "Adds innerHTML page to the code",
    option3: "Change the server location",
    option4: "Performs handling of exceptions and occurrences"
}

var mcq3 = {
    option1: "Position",
    option2: "Window",
    option3: "Standard",
    option4: "Location"
}

var mcq4 = {
    option1: "<javascript>",
    option2: "<scripting>",
    option3: "<script>",
    option4: "None of These"
}

var mcq5 = {
    option1: "alertBox();",
    option2:  "msgBox();",
    option3: "msg();",
    option4: "alert()"
}

var mcqall = [mcq1, mcq2, mcq3, mcq4, mcq5];



begin.addEventListener("click", startclock)

    
    begin.addEventListener("click", function(){
        document.querySelector(".code").style.display = "none";
        contentsec.style.display = "block";
        })
    
    begin.addEventListener("click", nextquiz)


    var value = 0;  
    
    function nextquiz(){
   
    if (value === quesall.length) {
        setTimeout(function(){contentsec.style.display = "none";
        firstsec.style.display = "inline";
    }, 500);
       
        setTimeout(function(){clearInterval(clockInterval)}, 500);
    
    } else {
        ques.textContent = quesall[value];
        ans1.textContent = mcqall[value].option1;
        ans2.textContent = mcqall[value].option2;
        ans3.textContent = mcqall[value].option3;
        ans4.textContent = mcqall[value].option4;
    }
    }
var realans1 = mcq1.option4;
var realans2 = mcq2.option1;
var realans3 = mcq3.option1;
var realans4 = mcq4.option3;
var realans5 = mcq5.option4;
var realall = [realans1, realans2, realans3, realans4, realans5];
var timeleft = 100;
var clockInterval;
    
   
    
    function startclock(){
        clockInterval = setInterval(function() {
            timeleft --;
            clock.textContent =  "Time: " + timeleft + " seconds";
        
            
            if (timeleft === 0) {
              clearInterval(clockInterval);
              contentsec.style.display = "none";
              firstsec.style.display = "inline";
            }
          }, 1000);
        return clockInterval;
    }   



contentsec.addEventListener("click", determineCorrectAnswer)


function determineCorrectAnswer(event){
    if(event.target.matches(".eventrigger")){
        var chosenAnswer = event.target.textContent;
        
        Result.textContent = " ";
        Result.style.display = "block";
            if (chosenAnswer === realall[value]){
                Result.textContent = "Answer OK";
                setTimeout(function(){ Result.style.display = "none"}, 500);
            } else {
                Result.textContent = "Answer Wrong"
                setTimeout(function(){ Result.style.display = "none"}, 500);
                timeleft -= 10;
                clock.textContent =  "Time: " + timeleft + " seconds";
            }
            value++;
    }
    return timeleft;
};



contentsec.addEventListener("click", function(event){
    if(event.target.matches(".eventrigger")){
        nextquiz();
    }})



submit.addEventListener("click", function(event){
    event.preventDefault();
  
    newUser();        
        
        firstsec.style.display = "none";
        document.querySelector(".topscore").style.display = "inline";
        document.querySelector(".playerscore").style.display = "inline";
})



function newUser() {
    var userInitial = document.querySelector("#names").value;
    if (userInitial === "") {
        userInitial = "Failed to register Name";
    } 
        localStorage.setItem(userInitial, timeleft);
        document.querySelector(".playerscore").textContent = " ";
        var p = document.createElement("p");
        p.textContent = userInitial + ": " + timeleft;
        document.querySelector(".playerscore").appendChild(p);    
    
}

score.addEventListener("click", function(){
    
    clearInterval(clockInterval);
    
    
    contentsec.style.display = "none";
    topscore.style.display = "block";
    firstsec.style.display = "none";
    document.querySelector(".code").style.display = "none";
    
    document.querySelector(".playerscore").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".playerscore").appendChild(p);}
    })



document.querySelector(".playagain").addEventListener("click", function(){
   
    value = 0;
   
    timeleft = 100;
    clock.textContent =  "Time Available: 100 seconds";
   
    document.querySelector(".code").style.display = "block";
  
    topscore.style.display = "none";
})



document.querySelector(".clear").addEventListener("click", function(){
    localStorage.clear();
   
    document.querySelector(".playerscore").textContent = " ";
    document.querySelector(".playerscore").style.display = "none";

});


