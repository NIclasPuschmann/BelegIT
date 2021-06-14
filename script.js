'use strict'

var counter = 0;
var cat;
var min;
var max;
var task;
var rdom = 0;
var right;
var anwsright=0;
var anwswrong=0;
var rightbut;
var arr;
var corans;
var first = "true";


// aufruf der aufgaben aus json datei
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
             var obj = JSON.parse(httpRequest.responseText);
              if (callback) { callback(obj); 
              if(first=="true") {
                window.scrollBy(0,200 );
                first = "false";
              }
           };
        }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send();  
}

function chosemathe() {
  // zu ... => Term einsetzen???
  document.getElementById('task').innerHTML="Welcher Term ist äquivalent zu?"
  document.getElementById('categories').style.display="none"

  cat = 'mathe';
  min = 0;
  max = 9;

  fetchJSONFile('exercises.json', function(obj) {
    clearBox('boo');
    selectRandom();
    selectexercise(obj);
    right = obj["teil-mathe"][rdom].l[0];
    console.log(right);
    sleep(500);
    //showStat();
    displaymathexercise();
    setbutton(obj);    
  }); 
}

function changeBGColor() {
  var cols = document.getElementById('but'+i).style.backgroundColor='52796f';
  for(var i = 0; i <= 4; i++) {
    cols[i].style.backgroundColor = '52796f';
  }
}

function chosegenknow() {
  // Name der Persoenlichkeit einsetzen
  document.getElementById('task').innerHTML="In welchem Jahr wurde folgende Persönlichkeit geboren?"
  document.getElementById('categories').style.display="none"

 
  cat = 'allgemein';
  min = 0;
  max = 30;

  fetchJSONFile('exercises.json', function(obj) {

    clearBox('boo');
    selectRandom();
    selectexercise(obj);
    right = obj["teil-allgemein"][rdom].l[0];
    console.log(right);
    sleep(500);
    //showStat();
    displaygenex();
    setbuttongen(obj);    
  }); 
}

function showStat() {

  document.getElementById("bassbut").style.display = "none";
  document.getElementById("treblebut").style.display = "none";
  if (anwsright+anwswrong>=10) {
    openStat();
  }
}

// selects an exercise to display 
function selectexercise(obj) {
  if (cat == 'mathe') {
    task = obj["teil-mathe"][rdom].a;
  }
  else if(cat == 'allgemein') {
    task = obj["teil-allgemein"][rdom].a;
  }
}

function displaymathexercise() {
  katex.render(task, boo, {throwOnError: false});
}

function displaygenex() {
  document.getElementById('boo').innerHTML=task;
}

function setbuttongen(obj) {

  var arr = obj["teil-allgemein"][rdom].l;
  shuffle(arr);

  for(var i = 1; i <= 4; i++) {
    document.getElementById('but'+i).style.backgroundColor="#70161E"
    document.getElementById('but'+i).style.visibility = "visible";
    document.getElementById('text').style.visibility = "visible";
    document.getElementById('but'+i).innerHTML=arr[i-1];

    if (document.getElementById('but'+i).innerHTML == right) {
      rightbut = 'but'+i;
      console.log(rightbut);
    }
  }
}

function setbutton(obj) {
  
  var arr = obj["teil-mathe"][rdom].l
  shuffle(arr);

  for(var i = 1; i <= 4; i++) {
    document.getElementById('but'+i).style.backgroundColor= "#70161E";
    document.getElementById('but'+i).style.visibility = "visible";
    document.getElementById('text').style.visibility = "visible";
    var test = document.getElementById('but'+i);

    corans = obj["teil-mathe"][rdom].l[0];

    katex.render(arr[i-1], test);
    console.log(test);

    if (arr[i-1] == right) {
      rightbut = 'but'+i;
    }
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// shuffles the answers of JSON file
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
      
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

//onclick for anwser buttons
function choosedbut(clicked_id) {
  if(document.getElementById(clicked_id).innerHTML == right) {  
    choosecorrect(clicked_id);  
  }
  else {
    choosewrong(clicked_id);      
  }
  if (cat == 'mathe') {  
     chosemathe();
  }
  else {
    chosegenknow();
  }
};

// if the right anwser was choosen
function choosecorrect(clicked_id) {
  move();
  document.getElementById(clicked_id).style.backgroundColor = "rgb(98, 185, 86)";
  anwsright++;
  sleep(1500); 
  document.getElementById("ca").innerHTML = anwsright;
}
// if a wrong anwser was choosen
function choosewrong(clicked_id) {
  move();
  document.getElementById(clicked_id).style.backgroundColor = "rgb(253, 0, 0)";
  document.getElementById(rightbut).style.backgroundColor = "rgb(98, 185, 86)";
  anwswrong++;
  sleep(1500); 
  document.getElementById("wa").innerHTML = anwswrong;
}

// bewegt die Fortschrittsleiste
function move() {
  var elem = document.getElementById("myBar"); 
  var width = 1;
  if(counter == 310){
    openStat();
  } else {
  var id = setInterval(frame, 10);
  function frame() {
    if(counter == 310) {
    }
      if (width >= 10 + counter) {
        clearInterval(id);
        counter = counter+10;
      } else {
        width++; 
        elem.style.width = width + '%';  
      }
    }
  }
}

//generates a new random number
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

// selects a new rdom
function selectRandom() {
  rdom = getRandom(min, max);
}

//leert den Inhalt von boo
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function openStat() {
  document.getElementById("myStats").style.height = "100%";
}

function closeStat() {
  document.getElementById("myStats").style.height = "0%";
}

// Formel in Element boo schreiben  
// katex.render("c = \\pm\\sqrt{a^2 + b^2}", boo, {
//   throwOnError: false
// });

// Bearbeitung darf erst starten, wenn der Browser alle Daten geladen hat 
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

// alle Textknoten ab boo2 werden gerendert
// window.renderMathInElement(boo2, {delimiters: [
//     {left: "$$", right: "$$", display: true},
//   {left: "$", right: "$", display: false}
//   ]});
}); 

// Service Worker registrieren für PWA
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('scripts/sw.js')
//     .then(reg => console.log(reg))
//     .catch(err => console.log(err));
// }