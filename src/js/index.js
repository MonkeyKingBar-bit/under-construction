// ANIMATION
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
   // window.addEventListener('load', animOnLoad);
   function animOnLoad() {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i];
         animItem.classList.add('_active');
      };
      // console.log('Страница загружена!');
   }
   setTimeout(() => {
      animOnLoad();
   }, 1000);
}
// animItems.forEach((item) => {
//    item.classList.remove('_active');
// })

// TIMER
document.addEventListener('DOMContentLoaded', function () {
   const end_date = {
      "full_year": "2023",
      "month": "05",
      "day": "31",
      "hours": "00",
      "minutes": "00",
      "seconds": "00"
   }
   let end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;
   // const deadline = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 01);
   let timerId = null;
   function declensionNum(num, words) {
      if (window.innerWidth <= 767.98) {
         return words[3];
      } else {
         return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
      }
   }
   function countdownTimer() {
      const diff = new Date(end_date_str) - new Date();
      if (diff <= 0) {
         clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      // change title of times
      $days.dataset.title = declensionNum(days, ['Day', 'Day', 'Days', 'DD']);
      $hours.dataset.title = declensionNum(hours, ['Hour', 'Hour', 'Hours', 'HH']);
      $minutes.dataset.title = declensionNum(minutes, ['Minute', 'Minutes', 'Minutes', 'MM']);
      $seconds.dataset.title = declensionNum(seconds, ['Second', 'Seconds', 'Seconds', 'SS']);
   }
   const $days = document.querySelector('.timer__days');
   const $hours = document.querySelector('.timer__hours');
   const $minutes = document.querySelector('.timer__minutes');
   const $seconds = document.querySelector('.timer__seconds');
   countdownTimer();
   timerId = setInterval(countdownTimer, 1000);
});

// FORM 
$(document).ready(function () {
   function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
   }

   $('form').submit(function (e) {
      e.preventDefault();
      let empty = $(this).parent().find("input").filter(function () {
         return this.value === "";
      });
      var formData = {
         email: $("#email").val(),
      };
      // for data send I used open server
      if (!empty.length) {
         if (isEmail(formData.email)) {
            $.ajax({
               type: "POST",
               url: "send.php",
               data: formData,
            }).done(function (data) {
               console.log(data);
               $('.overlay').show();
               $('.title').html(
                  '<h2>SUCCESS!</h2>'
               );
               $('.content').html(
                  '<div>You have successfully subscribed to the email newsletter</div>'
               );
               $('form input').not(':button, :submit').val('').removeClass("has-error");
            }).fail(function (data) {
               $(".help-block").remove();
               // $('.error').fadeOut();
               $('.overlay').show();
               $('body').css({ 'touch-action': 'none', 'overflow': 'hidden' });
               $('.title').html(
                  '<h2 class="has-error">Error</h2>'
               );
               $('.content').html(
                  '<div>Could not reach server, please try again later.</div>'
               );
               $('form input').not(':button, :submit').val('').removeClass("has-error");
            });
         } else {
            $("#email").addClass("has-error");
         };
         return false;
      }
   });
});

// POPUP
$('.popup-btn').click(function () {
   $('.overlay').fadeOut();
   $('body').css('touch-action', '');
   $('body').css('overflow', '');
});
$('.close-popup').click(function () {
   $('.overlay').fadeOut();
   $('body').css('touch-action', '');
   $('body').css('overflow', '');

});
$(document).mouseup(function (e) {
   var popup = $('.popup');
   if (e.target != popup[0] && popup.has(e.target).length === 0) {
      $('.overlay').fadeOut();
      $('body').css('touch-action', '');
      $('body').css('overflow', '');
   }
});

// EVENTS
function scrollTo(element) {
   window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: 'smooth'
   })
}
let allEvents = document.querySelector('.allEvents'),
   eventsBlock = document.querySelector('#events'),
   eventsBlockShow = document.querySelector('.all-events');

allEvents.addEventListener('click', () => {
   scrollTo(eventsBlock);
   eventsBlockShow.classList.add('_anim-items');
   eventsBlockShow.classList.add('_active')
})

// Найти все ссылки начинающиеся на #
// const allEvents = document.querySelectorAll('a[href^="#"]')

// // Цикл по всем ссылкам
// for (let anchor of anchors) {
//    anchor.addEventListener("click", function (e) {
//       e.preventDefault() // Предотвратить стандартное поведение ссылок
//       // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
//       const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
//       // Плавная прокрутка до элемента с id = href у ссылки
//       document.querySelector(goto).scrollIntoView({
//          behavior: "smooth",
//          block: "start"
//       })
//    })
// }

// document.addEventListener('DOMContentLoaded', function () {
// let iconMenu = document.querySelector(".icon-menu");
// if (iconMenu) {
//    iconMenu.addEventListener("click", function () {
//       document.documentElement.classList.toggle("menu-open");
//       document.body.classList.toggle("lock");
//       // document.body.style.overflowY = "hidden";
//       // document.body.style.touchAction = "none"
//    });
// };
// window.onclick = function (event) {
//    if (!event.target.matches('.icon-menu')) {
//       document.documentElement.classList.remove("menu-open");
//       document.body.classList.remove("lock");
//    }
// }