!function() {
    var e = document.createElement("style");
    e.textContent = "\n    .__progress__ {\n        top: 0; \n        left: 0;\n        position: fixed;\n        width: 10%;\n        height: 2px;\n        z-index: 103;\n        background-color: #77AAAD;\n        transition: width 0.4s ease 0s;\n    }",
    document.head.appendChild(e);
    var t = null;
    document.addEventListener("progress:start", (()=>{
        var e = 10
          , n = document.createElement("div");
        n.className = "__progress__",
        document.body.prepend(n);
        t = setInterval((function() {
            var t = parseInt(7 * Math.random());
            (e += t + 3) > 95 && (e = 95),
            n.style.width = e + "%"
        }
        ), 500)
    }
    )),
    document.addEventListener("progress:end", (()=>{
        clearInterval(t);
        var e = document.querySelector(".__progress__");
        e && (e.style.width = "100%"),
        setTimeout((()=>{
            e.parentElement.removeChild(e)
        }
        ), 500)
    }
    ))
}(),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).pageLoadProgress = t()
}(this, (function() {
    "use strict";
    !function() {
        try {
            new window.CustomEvent("T")
        } catch (t) {
            var e = function(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                n
            };
            e.prototype = window.Event.prototype,
            window.CustomEvent = e
        }
    }(),
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this; )
            ;
        return n > -1
    }
    ),
    Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        if (!document.documentElement.contains(t))
            return null;
        do {
            if (t.matches(e))
                return t;
            t = t.parentElement
        } while (null !== t);
        return null
    }
    );
    var e = document.createElement("link")
      , t = e.relList && e.relList.supports && e.relList.supports("prefetch")
      , n = function(e) {
        document.documentElement.dispatchEvent(new CustomEvent(e,{
            bubbles: !0,
            cancelable: !0
        }))
    };
    function o(e) {
        var t = e.replace(/(\/index\.html|\/)$/gi, "");
        return t.length || (t = "/"),
        t
    }
    var r = {};
    return window.addEventListener("click", (function(e) {
        var l = e.target;
        if (l instanceof Element && (l = l.closest("a[href]:not([target^=_]):not([download])"))) {
            var a = l.href
              , i = o(new URL(a).pathname) === o(location.pathname);
            if ("A" !== l.tagName || i)
                return;
            for (var s = r.ignoreKeywords || [], c = 0; c < s.length; c++)
                if (-1 !== a.indexOf(s[c]))
                    return;
            a && location.origin === new URL(a).origin && (e.preventDefault(),
            n("progress:start"),
            function(e, n, o) {
                if (t) {
                    var r = document.createElement("link");
                    r.rel = "prefetch",
                    r.href = e,
                    r.onload = n,
                    r.onerror = o,
                    document.head.appendChild(r)
                } else {
                    var l = new XMLHttpRequest;
                    l.open("GET", e),
                    l.onload = n,
                    l.onerror = o,
                    l.send()
                }
            }(a, (function() {
                n("progress:end"),
                setTimeout((()=>{
                    window.open(a, "_self")
                }
                ), r.defer || 500)
            }
            ), (function() {
                n("progress:error")
            }
            )))
        }
    }
    )),
    function(e) {
        r = e
    }
}
));
