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

  let quote = document.querySelector('.motivation-2 h2');
  let author = document.querySelector('.motivation-3 h2');

  async function fetchQuote() {
    try {
      let response = await fetch('https://random-quotes-freeapi.vercel.app/api/random');
      let data = await response.json();

      if (quote && author) {
        quote.innerText = data.quote;
        author.innerText = `— ${data.author}`;
      }
    } catch (error) {
      console.error("Quote fetch error:", error);
      if (quote) quote.innerText = "Stay motivated 💪";
      if (author) author.innerText = "";
    }
  }

  fetchQuote();
}

motivationalQuote();



function pomodoroTimer() {
let timer = document.querySelector('.pomo-timer h1')

let startBtn = document.querySelector('.pomo-timer .start')
let pauseBtn = document.querySelector('.pomo-timer .pause')
let resetBtn = document.querySelector('.pomo-timer .reset')
let session = document.querySelector('.pomodoro-timer-fullpage .session')
let isWorkSession = true


let totalSeconds = 25*60
let timerInterval = null;


function upDateTime() {
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds % 60

  timer.innerHTML = `${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`
}

function startTimer() {
   clearInterval(timerInterval)

    if(isWorkSession){
      
      timerInterval = setInterval(function() {
                  if(totalSeconds > 0){
                    totalSeconds--
                    upDateTime()
                  }else{
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                     session.innerHTML = 'Break Session'
                     session.style.backgroundColor = 'rgb(0, 191, 255) '
                     totalSeconds = 5 * 60
                  }
                  }, 1000)
    }else{
     timerInterval = setInterval(function() {
                  if(totalSeconds > 0){
                    totalSeconds--
                    upDateTime()
                  }else{
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
      session.style.backgroundColor = 'rgb(0, 128, 79)'
                    totalSeconds = 25 * 60
                  }
                  }, 1000)
    }
}
function pauseTimer() {
  clearInterval(timerInterval)
}
function resetTimer() {
  totalSeconds = 25*60
  clearInterval(timerInterval)
  upDateTime()
}

startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)
resetBtn.addEventListener('click', resetTimer)
}

pomodoroTimer();


function dailyData() {
  let headerTime = document.querySelector('.header1 h1')
let headerDate = document.querySelector('.header1 h2')
let headerTemp = document.querySelector('.header2 h1')
let headerFeels = document.querySelector('.header2 h2')
let headerHumidity = document.querySelector('.header2 h3')
let headerWind = document.querySelector('.header2 h4')

let data = null

async function weatherAPICall(city) {

  let apikey = `3bf28cbe5cb14c8cb83a97b87dc6d370`;
  let response = await       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)

  data = await response.json() 

  headerTemp.innerHTML = `${data.main.temp}°C`
  headerFeels.innerHTML = `Feels like: ${data.main.feels_like}°C`
  headerHumidity.innerHTML = `Humdidity: ${data.main.humidity} %`
  headerWind.innerHTML = `Wind-Speed: ${data.wind.speed} Km/h`
}

weatherAPICall("ujjain");
 

let date = null
function timeDate() {
  const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const totalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
  date = new Date()
  let dayOfWeek = totalDaysOfWeek[date.getDay()]
  let hours = date.getHours()
  let minutes = date.getMinutes()
  // let seconds = date.getSeconds()
  let tarik = date.getDate()
  let month = totalMonths[date.getMonth()]
  let year = date.getFullYear()


  headerDate.innerHTML =`${tarik} ${month} ${year} `
 
  if(hours>12){
     headerTime.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')} PM`
  }else{
     headerTime.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')} AM`

  }
  
}
timeDate()


}

dailyData();


let theme = document.querySelector('section nav .theme')

let rootElement = document.documentElement

 let flag = 0;
theme.addEventListener('click', function(){
  console.log('hello');
  
 if(flag == 0){
    rootElement.style.setProperty('--pri', '#EAE0CF')
  rootElement.style.setProperty('--sec', '#222831' )
  rootElement.style.setProperty('--tri1', '#94B4C1' )
  rootElement.style.setProperty('--tri2', '#547792' )
  flag = 1
 }else if(falg == 1){
    rootElement.style.setProperty('--pri', '#000000')
  rootElement.style.setProperty('--sec', '#1DCD9F' )
  rootElement.style.setProperty('--tri1', '#222222' )
  rootElement.style.setProperty('--tri2', '#169976' )
  flag = 2
 }else if(flag == 2){
      rootElement.style.setProperty('--pri', '#F8F4E1')
  rootElement.style.setProperty('--sec', '#381c0a' )
  rootElement.style.setProperty('--tri1', '#FEBA17' )
  rootElement.style.setProperty('--tri2', '#74512D' )
  flag = 0
 }

})