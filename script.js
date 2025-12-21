function openFeature() {
  let allElems =  document.querySelectorAll(".elem");
let allFullElems = document.querySelectorAll(".fullElem");
let allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");

allElems.forEach(function(elem){
  elem.addEventListener("click", function(){
   allFullElems[elem.id].style.display = "block"; 
  })   
})
allFullElemsBackBtn.forEach(function(back){
  back.addEventListener("click", function(){
   allFullElems[back.id].style.display = "none"; 
  })   
})
}
openFeature();

function todoList(){

let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");


let currTask = []

if(localStorage.getItem("currTask")){
  currTask = JSON.parse(localStorage.getItem("currTask"));
}else{
  console.log("task list is empty"); 
}


function renderTask(){
 
 let allTask = document.querySelector(".allTask");

 let sum = "";

 currTask.forEach(function(elem, idx){
  sum += 
  `<div class="task">
        <h5>${elem.task} <span class="${elem.imp ? 'true' : 'false'}">imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
 })

 allTask.innerHTML = sum; 

 localStorage.setItem("currTask", JSON.stringify(currTask));

 document.querySelectorAll('.task button').forEach(function(btn){
   btn.addEventListener('click', function(){
      currTask.splice(btn.id, 1);
      renderTask();
   })
})

 
}
renderTask();

form.addEventListener("submit", function(e){
  e.preventDefault(); 

 currTask.push({task: taskInput.value, details: taskDetailsInput.value, imp: taskCheckbox.checked});

 renderTask();

 taskCheckbox.checked = false;
 taskInput.value = "";
 taskDetailsInput.value = "";
})



}

todoList();


function dailyPlanner(){
  let dayPlanner = document.querySelector('.day-planner')

let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

let hours = Array.from({length: 18}, function(_, idx){
    return `${6+idx}:00 - ${7+idx}:00`;
})


let wholeDaySum = '';
hours.forEach(function(elem, idx){

  let savedData = dayPlanData[idx] || '';

  wholeDaySum += `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${savedData}>
         </div>`
})

dayPlanner.innerHTML = wholeDaySum;

let dayPlannerInput = document.querySelectorAll('.day-planner input');

dayPlannerInput.forEach(function(elem) {
  elem.addEventListener('change', function(){
   dayPlanData[elem.id] = elem.value;
   localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
  })
})
// localStorage.setItem('dayPlanner'+elem.previousElementSibling.textContent, elem.value);
}

dailyPlanner();


function motivationalQuote() {
  
let quote = document.querySelector('.motivation-2 h2')
let author = document.querySelector('.motivation-3 h2')


async function fetchQuote() {

   let response = await fetch('https://random-quotes-freeapi.vercel.app/api/random')

   let data = await response.json() ;

   quote.innerHTML = data.quote
   author.innerHTML = data.author
   

}
fetchQuote();
}
motivationalQuote();

