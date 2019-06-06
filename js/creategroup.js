/*$('span.button').click(function() {
  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).html("Open");
    $('.side-panel').animate({
    width:"0%"
    });
    $(this).animate({
    left:"0%"
    });
  }
  else {
    $(this).addClass('active');
    $(this).html("Close");
    $('.side-panel').animate({
      width:"30%",
    });
    $('span.button').animate({
      left:"30%"
    });
  }
});*/
var array = [];
array[0] = "adeleaaron2021@u.northwestern.edu";
array[1] = "agnesarvin2020@u.northwestern.edu";
array[2] = "billyburgess2022@u.northwestern.edu";
array[3] = "bobarvind2019@u.northwestern.edu";
array[4] = "calvincandy2021@u.northwestern.edu";
array[5] = "christinacameron2020@u.northwestern.edu";
array[6] = "cindycapote2021@u.northwestern.edu";
array[7] = "danieldubose2019@u.northwestern.edu";
array[8] = "danielleduvalin2021@u.northwestern.edu";
array[9] = "davidlemur2020@u.northwestern.edu";
array[10] = "evanle2021@u.northwestern.edu";
array[11] = "eveegan2021@u.northwestern.edu";
array[12] = "fabianfiora2020@u.northwestern.edu";
array[13] = "feliciafern2019@u.northwestern.edu";

      function slide() {
        if(document.getElementById("side-panel").style.width=='33.3vw') 
        {
          document.getElementById("side-panel").style.width='0vw';
          document.getElementById("side-panel").style.height='0vw';
        }
        else 
        {
          document.getElementById("side-panel").style.width='33.3vw';
          document.getElementById("side-panel").style.height='50vw';
        }
      }

      function slide2() {
        document.getElementById("side-panel2").style.width='0%';
        document.getElementById("form-container").style.opacity="1.0";
        /*document.getElementById("side-panel2").style.height='0%';*/
        /*if(document.getElementById("side-panel2").style.width=='33.3%') 
        {
          document.getElementById("side-panel2").style.width='0%';
          document.getElementById("side-panel2").style.height='0%';
        }*/
        /*else 
        {
          document.getElementById("side-panel2").style.width='33.3%';
          document.getElementById("side-panel2").style.height='120%';
        }*/
      }

      function filter() {
          var input, filter, ul, li, a, i, txtValue;
          input = document.getElementById("myinput");
          filter = input.value.toUpperCase();
          ul = document.getElementById("myUL");
          li = ul.getElementsByTagName("li");
          for (i = 0; i < li.length; i++) {
              a = li[i].getElementsByTagName("a")[0];
              txtValue = a.textContent || a.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  li[i].style.display = "";
              } 
              else {
                  li[i].style.display = "none";
              }
          }
      }

      function input(num) {
        document.getElementById('add').value = document.getElementById('num').innerHTML;
        document.getElementById('myinput').placeholder = document.getElementById('num').innerHTML;
      }

      function changetext(id) {
        document.getElementById(id).innerHTML = array[id-1];
        if(id == 1)
        {
          document.getElementById("add").value = document.getElementById(id).innerHTML;
        }
        else
        {
          document.getElementById("add").value = document.getElementById("add").value + ", " + document.getElementById(id).innerHTML;
        }
      }

      function validateForm() {
        var str = document.forms["myForm"]["contacts"].value;
        var str_sub = str.substr(str.lastIndexOf("@"));
        if(str_sub !== "@u.northwestern.edu") {
          alert("Please use a valid northwestern email address");
          return false;
        }
      }


