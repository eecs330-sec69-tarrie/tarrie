;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd)
    define('Gifffer', [], factory)
  else if (typeof exports === 'object') exports['Gifffer'] = factory()
  else root['Gifffer'] = factory()
})(this, function() {
  // Check if running in client
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  var d = document
  var playSize = 60

  var Gifffer = function(options) {
    var images,
      i = 0,
      gifs = []

    images = d.querySelectorAll('[data-gifffer]')
    for (; i < images.length; ++i) {
      //console.log(images[i])
      //console.log(gifs)
      //console.log(options)
      process(images[i], gifs, options)
    }
    // returns each gif container to be usable programmatically
    return gifs
  }

  function formatUnit(v) {
    return v + (v.toString().indexOf('%') > 0 ? '' : 'px')
  }

  function parseStyles(styles) {
    var stylesStr = ''
    for (prop in styles) stylesStr += prop + ':' + styles[prop] + ';'
    return stylesStr
  }

  function createContainer(w, h, el, altText, opts) {
    var alt
    var con = d.createElement('BUTTON')
    var cls = el.getAttribute('class')
    var id = el.getAttribute('id')
   var playButtonStyles =
      opts && opts.playButtonStyles
        ? parseStyles(opts.playButtonStyles)
        : [
            'width:' + 6.5 + '%',
            'height:' + 10 + '%',
            'border-radius:' + .1 + 'em',
            'background:rgba(0, 0, 0, 0.3)',
            'position:absolute',
            'top:93%',
            'left:95%',
            'margin:-' + 1+ 'em'
          ].join(';')

    var playButtonIconStyles =
      opts && opts.playButtonIconStyles
        ? parseStyles(opts.playButtonIconStyles)
        : [
            'width: 0',
            'height: 0',
            'position: absolute',
            'color: white',
            'left: .22vw',
            'top: .2vw', 
            'font-size: .9vw',
            'z-axis: -5'
          ].join(';')

    cls ? con.setAttribute('class', el.getAttribute('class')) : null
    id ? con.setAttribute('id', el.getAttribute('id')) : null
    con.setAttribute(
      'style',
      'position:relative;cursor:pointer;background:none;border:none;padding:0;'
    )
    con.setAttribute('aria-hidden', 'true')

    // creating play button
    var play = d.createElement('DIV')
    play.setAttribute('class', 'gifffer-play-button')
    play.setAttribute('style', playButtonStyles)


    //console.log(playButtonIconStyles)
    var gifIndicator = d.createElement('DIV')
    gifIndicator.textContent = "GIF";
    gifIndicator.setAttribute('style', playButtonIconStyles)
    play.appendChild(gifIndicator)


    // create alt text if available
    if (altText) {
      alt = d.createElement('p')
      alt.setAttribute('class', 'gifffer-alt')
      alt.setAttribute(
        'style',
        'border:0;clip:rect(0 0 0 0);height:1px;overflow:hidden;padding:0;position:absolute;width:1px;'
      )
      alt.innerText = altText + ', image'
    }

    // dom placement
    con.appendChild(play)
    el.parentNode.replaceChild(con, el)
    altText ? con.parentNode.insertBefore(alt, con.nextSibling) : null
    return { c: con }
  }

  function calculatePercentageDim(el, w, h, wOrig, hOrig) {
    var parentDimW = el.parentNode.offsetWidth
    var parentDimH = el.parentNode.offsetHeight
    var ratio = wOrig / hOrig

    if (w.toString().indexOf('%') > 0) {
      w = parseInt(w.toString().replace('%', ''))
      w = (w / 100) * parentDimW
      h = w / ratio
    } else if (h.toString().indexOf('%') > 0) {
      h = parseInt(h.toString().replace('%', ''))
      h = (h / 100) * parentDimW
      w = h * ratio
    }

    return { w: w, h: h }
  }

  function process(el, gifs, options) {
    var url,
      con,
      c,
      w,
      h,
      playing =false,
      duration,
      gif,
      cc,
      isC,
      durationTimeout,
      dims,
      altText

    url = el.getAttribute('data-gifffer')
    w = el.getAttribute('data-gifffer-width')
    h = el.getAttribute('data-gifffer-height')
    duration = el.getAttribute('data-gifffer-duration')
    //console.log(parseInt(duration))
    altText = el.getAttribute('data-gifffer-alt')
    el.style.display = 'block'

    // creating the canvas
    c = document.createElement('canvas')
    isC = !!(c.getContext && c.getContext('2d'))
    if (w && h && isC) cc = createContainer(w, h, el, altText, options)

    // waiting for image load
    el.onload = function() {
      if (!isC) return

      w = w || el.width
      h = h || el.height

      // creating the container
      if (!cc) cc = createContainer(w, h, el, altText, options)
      con = cc.c
      //play = cc.p
      dims = calculatePercentageDim(con, w, h, el.width, el.height)

      //listening for image hover or touch
      gifs.push(con)
      //console.log(con)

      //console.log(c)

      var stopPlay = function(){ playing = false;
                                //con.appendChild(play)
                                con.removeChild(gif);
                                con.appendChild(c);
                                //console.log(c)
                                gif = null;};


      con.addEventListener('mouseout', function(){stopPlay();});
      con.addEventListener('touchend', function(){stopPlay();});




      // listening for image hover or touch
      con.addEventListener('touchstart', function() {
        clearTimeout(durationTimeout)
        if (!playing) {
          playing = true
          gif = document.createElement('IMG')
          gif.setAttribute('style', 'width:100%;height:100%;')
          gif.setAttribute('data-uri', Math.floor(Math.random() * 100000) + 1)
          setTimeout(function() {
            gif.src = url
          }, 0)
          //con.removeChild(play)
          con.appendChild(gif)
            con.removeChild(c)

          if (parseInt(duration) > 0) {
            //console.log('here')
            durationTimeout = setTimeout(stopPlay, parseInt(duration)); 
          }
        }else{

        } 
      })

      con.addEventListener('mouseover', function() {
        clearTimeout(durationTimeout)
        if (!playing) {
          playing = true
          gif = document.createElement('IMG')
          gif.setAttribute('style', 'width:100%;height:100%;')
          gif.setAttribute('data-uri', Math.floor(Math.random() * 100000) + 1)
          setTimeout(function() {
            gif.src = url
          }, 0)
          //con.removeChild(play)
          con.removeChild(c)
          con.appendChild(gif)
          if (parseInt(duration) > 0) {
            durationTimeout = setTimeout(stopPlay, parseInt(duration)); 
          }
        } 
      })

      // canvas
      c.width = dims.w
      c.height = dims.h
      c.getContext('2d').drawImage(el, 0, 0, dims.w, dims.h)
      con.appendChild(c)

      // setting the actual image size
      con.setAttribute(
        'style',
        'position:relative;cursor:pointer;width:' +
          dims.w +
          'px;height:' +
          dims.h +
          'px;background:none;border:none;padding:0;'
      )

      c.style.width = '100%'
      c.style.height = '100%'
      c.style.borderRadius='.5em .5em 0 0'



      if (w.toString().indexOf('%') > 0 && h.toString().indexOf('%') > 0) {
        con.style.width = w
        con.style.height = h
      } else if (w.toString().indexOf('%') > 0) {
        con.style.width = w
        con.style.height = 'inherit'
      } else if (h.toString().indexOf('%') > 0) {
        con.style.width = 'inherit'
        con.style.height = h
      } else {
        con.style.width = dims.w + 'px'
        con.style.height = dims.h + 'px'
      }
    }
    el.src = url
  }

  return Gifffer
})
