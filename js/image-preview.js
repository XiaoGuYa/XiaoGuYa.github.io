!function() {
    var e = document.createElement("style");
    e.textContent = ".sip-mask{position:fixed;top:0;left:0;width:100%;height:100%;z-index:var(--sip-z-index, 1);visibility:hidden;backdrop-filter:blur(10px);background:rgba(0,0,0,.7)}.sip-hide{visibility:hidden}.sip-cursor{cursor:zoom-in}.sip-img{cursor:zoom-out;visibility:visible;position:absolute;left:50%;top:0px;width:80%;height:100%;object-fit:contain;transition:all .3s;transform:translate(-50%)}.sip-hide-scrollbar{padding:0 var(--sip-hide-scrollbar, 0) 0 0;overflow:hidden!important}",
    document.head.appendChild(e)
}(),
function(e, t) {
    "object" == typeof exports && typeof module < "u" ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = typeof globalThis < "u" ? globalThis : e || self).simpleImagePreview = t()
}(this, (function() {
    "use strict";
    const e = document.documentElement
      , t = document.body
      , i = document.createElement("div");
    return i.classList.add("sip-mask"),
    t.appendChild(i),
    function(s, o) {
        null != o && o.zIndex && i.style.setProperty("--sip-z-index", o.zIndex),
        (s instanceof NodeList ? s : document.querySelectorAll(s || "img")).forEach((function(s) {
            s instanceof HTMLImageElement && (s.classList.add("sip-cursor"),
            s.addEventListener("click", (function() {
                const o = s.getAttribute("src");
                if (!o)
                    return;
                e.style.setProperty("--sip-hide-scrollbar", window.innerWidth - e.clientWidth + "px"),
                t.classList.add("sip-hide-scrollbar"),
                i.style.setProperty("visibility", "visible");
                const n = document.createElement("img");
                n.src = o;
                const r = s.getBoundingClientRect()
                  , d = `position:absolute;top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px`;
                n.setAttribute("style", d),
                s.classList.add("sip-hide"),
                i.appendChild(n),
                setTimeout((()=>{
                    n.classList.add("sip-img"),
                    n.removeAttribute("style")
                }
                )),
                i.addEventListener("click", (function() {
                    n.setAttribute("style", `${d};transform:none`),
                    n.addEventListener("transitionend", (function() {
                        s.classList.remove("sip-hide"),
                        t.classList.remove("sip-hide-scrollbar"),
                        e.style.removeProperty("--sip-hide-scrollbar"),
                        n.remove(),
                        i.style.removeProperty("visibility")
                    }
                    ), {
                        once: !0
                    })
                }
                ))
            }
            )))
        }
        ))
    }
}
)),
simpleImagePreview(".page img", {
    zIndex: 3
});
