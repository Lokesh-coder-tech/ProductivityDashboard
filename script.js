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
// openFeature();

let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");

let currTask = [
  {
    task: "Mandir jao",
    details: "Pooja karni hai",
    imp: true
  },
  {
    task: "Padhayi karo",
    details: "Career ke liye",
    imp: true
  },
  {
    task: "Lunch karo",
    details: "Bhookh lagi hai",
    imp: false
  },
];

function renderTask(){
 let allTask = document.querySelector(".allTask");

 let sum = "";

 currTask.forEach(function(elem){
  sum += 
  `<div class="task">
        <h5>${elem.task} <span class="${elem.imp ? 'true' : 'false'}">imp</span></h5>
        <button>Mark as Completed</button>
        </div>`
 })

 allTask.innerHTML = sum; 
}
renderTask();

form.addEventListener("submit", function(e){
  e.preventDefault(); 

 currTask.push({task: taskInput.value, details: taskDetailsInput.value, imp: taskCheckbox.checked});

taskInput.value = "";
taskDetailsInput.value = "";
taskCheckbox.checked = false;

 renderTask();

})

