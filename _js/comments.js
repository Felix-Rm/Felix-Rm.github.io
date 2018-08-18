var config = {
  apiKey: "AIzaSyAyAkujz4ZanigoNkaT9T7mzh4PTTSomzg",
  authDomain: "felix-s-database-2.firebaseapp.com",
  databaseURL: "https://felix-s-database-2.firebaseio.com",
  projectId: "felix-s-database-2",
  storageBucket: "felix-s-database-2.appspot.com",
  messagingSenderId: "1003548681050"
};
firebase.initializeApp(config);

var dontload = false



function PasX(x) {
  dontload = true
  var comment = {}
  var d = new Date()
  comment.id = Date()
  comment.date = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '   ' + d.getHours() + ':' + d.getMinutes()
  comment.name = document.getElementById('write_name1').value + " " + document.getElementById('write_name2').value
  comment.message = document.getElementById('write_msg').value.replace('\n', '<br>')
  comment.likes = 0
  comment.type = x.innerHTML.split(' ')[2].toUpperCase()
  console.log(comment);
  firebase.database().ref('WEBSITE/comments/' + Date()).set(comment)
  createNewComment(comment.type, comment.name, comment.date, comment.likes, comment.message, comment.id)
  // firebase.database().ref('WEBSITE/comments').once('value', function(data) {
  //
  // });

}









firebase.database().ref('WEBSITE/comments').on('value', function(data) {
  var list = document.getElementById('comments').children;
  !(dontload || list.length == Object.values(data.val()).length) ? loadComments(data): 0;
  dontload = false
});

function loadComments(data) {
  data = Object.values(data.val())
  console.log("loading Comments: " + data.length);

  for (var i = data.length - 1; i >= 0; i--) {
    var comment = data[i]
    createNewComment(comment.type, comment.name, comment.date, comment.likes, comment.message, comment.id)
  }
}


function createNewComment(type, name, date, likes, message, id) {
  // console.log("New comment: " + type + " " + name + " " + date + " " + likes + " " + message);

  var tbox = document.createElement('td')
  tbox.id = type
  tbox.innerHTML = type
  var nbox = document.createElement('td')
  nbox.id = 'name'
  nbox.innerHTML = name
  var dbox = document.createElement('td')
  dbox.id = 'date'
  dbox.innerHTML = date
  var lboxSpan = document.createElement('span')
  lboxSpan.innerHTML = likes
  var lboxSpanTd = document.createElement('td')
  lboxSpanTd.appendChild(lboxSpan)
  var lboxImg = document.createElement('img')
  lboxImg.src = '../img/heart.png'
  var lboxImgTd = document.createElement('td')
  lboxImgTd.appendChild(lboxImg)
  var lboxTr = document.createElement('tr')
  lboxTr.appendChild(lboxImgTd)
  lboxTr.appendChild(lboxSpanTd)
  var lboxTable = document.createElement('table')
  lboxTable.appendChild(lboxTr)
  var lboxDiv = document.createElement('div')
  lboxDiv.onclick = function() {
    upLike(this)
  }
  lboxDiv.id = id
  lboxDiv.appendChild(lboxTable)
  var lbox = document.createElement('td')
  lbox.className = 'likebutton'
  lbox.appendChild(lboxDiv)


  //create lower row with the message
  var mboxP = document.createElement('p')
  mboxP.innerHTML = message
  var mboxTd = document.createElement('td')
  mboxTd.colSpan = '4'
  mboxTd.appendChild(mboxP)
  var mbox = document.createElement('tr')
  mbox.appendChild(mboxTd)


  //create upper row with infos
  var info = document.createElement('tr')
  info.appendChild(tbox)
  info.appendChild(nbox)
  info.appendChild(dbox)
  info.appendChild(lbox)

  //create table for the comment
  var commentTable = document.createElement('table')
  commentTable.appendChild(info)
  commentTable.appendChild(mbox)

  var comment = document.createElement('center')
  comment.appendChild(commentTable)
  comment.className = 'Comment_box'

  document.getElementById('comments').appendChild(comment)
}

function upLike(d) {
  var liked = localStorage.getItem('felix-rm');
  if (liked == null) {
    localStorage.setItem('felix-rm', [0, 1])
  } else if (!liked.includes(d.id)) {
    liked = liked.split(',')
    liked.push(d.id)
    localStorage.setItem('felix-rm', liked)

    firebase.database().ref('WEBSITE/comments/' + d.id).once('value', function(data) {
      var n = data.val()
      n.likes++;
      d.children[0].children[0].children[1].innerHTML = n.likes
      firebase.database().ref('WEBSITE/comments/' + d.id).update(n);
    })
  }
}