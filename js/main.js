!(() => {
  codeBlockCopy()
})()

function codeBlockCopy() {
  const page = document.querySelector('.post')
  if (page) {
    page.addEventListener('click', (event) => {
      const target = event.target
      if (!target.classList.contains('copy-code')) return
      const table = target.parentElement.nextElementSibling
      if (table.tagName === 'TABLE') {
        const code = table.querySelector('.code')
        const selection = window.getSelection()
        selection.selectAllChildren(code)
        navigator.clipboard ? navigator.clipboard.writeText(selection.toString()) : document.execCommand('copy')
        selection.removeAllRanges()
        target.innerText = '已复制'
        setTimeout(function () {
          target.innerText = '复制'
        }, 2000)
      }
    })
  }
}
//返回顶部
$("#top_to").hide();$(window).scroll(function(){if($(this).scrollTop()>200){$("#top_to").fadeIn(100)}else{$("#top_to").fadeOut(200)}});$("#top_to").click(function(){$("body,html").animate({scrollTop:0},400);return false});
