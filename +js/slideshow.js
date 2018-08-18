var g = document.getElementById('title')
g.style = 'height: ' + window.innerHeight + 'px;'

var interval = 7 //Interval in Sekunden
var verblassen = 0.7 // Dauer der Verblassung in Sekunden
var total = 4 //Anzahl der Bilder



//interval *= 1000 // Sekunden zu Millisekunden
var inter = setInterval(changeimg, 100)


// var d = new Date();
// var cur = d.getMilliseconds() % (total - 1) + 1; // Mit zufälligem Bild starten

var cur = 1 // Mit ersten Bild statrten


var count = 0
var i = document.getElementById('slideshow')



function stop_Dia() { // Funktion zum stoppen der Diashow
  clearInterval(inter)
}




function changeimg() {
  if (count == 0) {
    i.style = "opacity:1;" + "transition: opacity " + verblassen + "s;"
  }

  if (count == interval * 10 - (verblassen * 10)) { // verblassen 'x' Sekunden vor wechsel
    i.style = "opacity:0;" + "transition: opacity " + verblassen + "s;"
  }

  if (count == (interval * 10)) {
    cur >= total ? cur = 1 : cur++;
    i.src = 'img/' + cur + '.png' // Bild wechseln
  }

  //console.log(count);

  count < interval * 10 ? count++ : count = 0;
}