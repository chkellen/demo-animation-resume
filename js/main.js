function writeCss(prefix,code,fn){
let domCode = document.querySelector('#code')
let n = 0
let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length){
        window.clearInterval(id)
        fn && fn.call()
    }
},70)
}
function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },35)
}

var css1 = `/*
*面试官你好，我是XXX
*我将以动画的形式来介绍自己
*只用文字介绍太单调了
*我使用代码介绍
*首先准备一些样式
*/

*{
    transition: all 1s;
}
html{
    background: #eee;
}
#code{
    border:1px solid #aaa;
    padding: 16px;
}
/* 我需要一点代码高亮 */

.token.selector{
    color:#690;
}
.touken.property{
    color: #905;
}
/* 加点3D效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
}
/* 我来介绍一下自己 */
/* 我需要一些白纸 */
#code-wrapper{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper > .content {
    display: block;
}
`
var css2 = `
/*
*接下来把 Markdown 变成 HTML - marked.js
*/
`
var md = `
#自我介绍

我叫XXX
1994年8月出生
XXX学校半年
希望应聘前端开发岗位

#技能介绍

熟悉JavaScript CSS

#项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

#联系方式

QQ xxxxxxxxxxx
Email xxxxxxxxx
手机 xxxxxxxxx
`
let css3 = `
/*
*这就是我的会动的简历
*谢谢观看
*/
`
writeCss('', css1, () => {
    creatPaper(() => {
        writeMarkdown(md, () => {
            writeCss(css1, css2, () => {
                convertMarkdownToHtml(() => {
                    writeCss(css1 + css2, css3, () => {
                        console.log('完成')
                    })
                })
            })
        })
    })
})

function creatPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function convertMarkdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}

