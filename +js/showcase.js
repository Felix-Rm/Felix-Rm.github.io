var elements = {
  'Kessel Rush - Game': {
    img: '/+img/Kessel Rush.png',
    icon1: ['forward', 'play'],
    icon2: ['file_download', 'download'],
    href1: 'https://felix-rm.github.io/Kessel-Rush/KR_MENU/',
    href2: 'https://github.com/Felix-Rm/Kessel-Rush'
  },

  'Chess - Game': {
    img: '/+img/Chess.png',
    icon1: ['forward', 'play'],
    icon2: ['file_download', 'download'],
    href1: 'https://felix-rm.github.io/Chess/',
    href2: 'https://github.com/Felix-Rm/Chess'
  },

  'Calculator': {
    img: '/+img/Calculator.png',
    icon1: ['fullscreen', 'project in action'],
    icon2: ['file_download', 'download'],
    href1: 'https://felix-rm.github.io/Small-Projects/SC02%20Calculator/',
    href2: 'https://github.com/Felix-Rm/Small-Projects/tree/master/SC02%20Calculator'
  },

  'Fireworks': {
    img: '/+img/Fireworks.png',
    icon1: ['fullscreen', 'project in action'],
    icon2: ['file_download', 'download'],
    href1: 'https://felix-rm.github.io/Small-Projects/SC03%20Fireworks/',
    href2: 'https://github.com/Felix-Rm/Small-Projects/tree/master/SC03%20Fireworks'
  },

  'Moving Text': {
    img: '/+img/Moving Text.png',
    icon1: ['fullscreen', 'project in action'],
    icon2: ['file_download', 'download'],
    href1: 'https://felix-rm.github.io/Small-Projects/SC01%20Moving%20Text/',
    href2: 'https://github.com/Felix-Rm/Small-Projects/tree/master/SC01%20Moving%20Text'
  }
}


function run() {
  w3.includeHTML();

  var first = true
  var into = document.getElementById('showcase')
  for (var element in elements) {
    var main = document.createElement('center')
    first ? main.style = 'border:none;margin-top:100px' : 0
    main.innerHTML = `
      <table>
      <tr>
        <td>
          <span>${element}</span>
        </td>
        <td class="play">
          <a href="${elements[element].href1}" title="${elements[element].icon1[1]}" class="material-icons">${elements[element].icon1[0]}</a>
        </td>
        <td class="download">
          <a href="${elements[element].href2}" title="${elements[element].icon2[1]}" class="material-icons">${elements[element].icon2[0]}</a>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="image">
          <center>
            <img src="${elements[element].img}" alt="">
          </center>
        </td>
      </tr>
      </table>
    `
    into.appendChild(main)
    first = false
  }
}