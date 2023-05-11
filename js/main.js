console.log("\n%c Pigeon By 山卜方 %c https://novcu.com ","color:#fff;background:#000;padding:5px 0","color:#fff;background:#666;padding:5px 0");
//返回顶部
$("#top_to").hide();$(window).scroll(function(){if($(this).scrollTop()>200){$("#top_to").fadeIn(100)}else{$("#top_to").fadeOut(200)}});$("#top_to").click(function(){$("body,html").animate({scrollTop:0},400);return false});

//懒加载
function LanLoad(){
    new LazyLoad({});
}

function codeBlockCopy() {
  const e = document.querySelector(".page");
  e && e.addEventListener("click", (e=>{
      const t = e.target;
      if (!t.classList.contains("copy-code"))
          return;
      const n = t.parentElement.nextElementSibling;
      if ("TABLE" === n.tagName) {
          const e = n.querySelector(".code")
            , o = window.getSelection();
          o.selectAllChildren(e),
          navigator.clipboard ? navigator.clipboard.writeText(o.toString()) : document.execCommand("copy"),
          o.removeAllRanges(),
          t.innerText = "COPIED",
          setTimeout((function() {
              t.innerText = "COPY"
          }
          ), 2e3)
      }
  }
  ))
};
function chageTimeFormate() {
  const timeElements = document.getElementsByTagName("time"), lang = GLOBALCONFIG.lang.time
  for (var i = 0; i < timeElements.length; i++) {
      const datetime = timeElements[i].getAttribute("datetime"), timeObj = new Date(datetime), daysDiff = utils.timeDiff(timeObj, new Date())
      var timeString;
      if (daysDiff === 0) {
          timeString = lang.recent;
      } else if (daysDiff === 1) {
          timeString = lang.yesterday;
      } else if (daysDiff === 2) {
          timeString = lang.berforeyesterday;
      } else if (daysDiff <= 7) {
          timeString = daysDiff + lang.daybefore;
      } else {
          if (timeObj.getFullYear() !== new Date().getFullYear()) {
              timeString = timeObj.getFullYear() + "/" + (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
          } else {
              timeString = (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
          }
      }
      timeElements[i].textContent = timeString;
  }
};
const utils = {
    timeDiff: (timeObj, today) => {
        var timeDiff = today.getTime() - timeObj.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
      },
    };
//PjAX配置
if (Config.Pjax === 'true') {
    $(document).pjax('a[href^="' + Config.homeUrl + '"]:not(a[target="_blank"], a[no-pjax])', {
        container: '#pjax',
        fragment: '#pjax',
        timeout: 8000
    })
    .on('pjax:send', function() { 
        NProgress.start(); 
    })
    .on('pjax:complete', function() {
        //NProgress
        NProgress.done();
       //返回顶部
       LanLoad();
       codeBlockCopy();
       chageTimeFormate();

    });
};
function getChildren(el, className) {
  for (let item of el.children) if (item.className === className) return item;
  return null;
}