# 每周总结可以写在这里  

### Layout
1. 初始化
   1. 只处理 flex 布局，流式布局和 grid 布局忽略
2. 收集元素进行
3. 计算主轴
4. 计算交叉轴

### Render
1. 绘制单个元素
   - 使用 image 包来进行图形绘制
   - 在 viewport 上绘制，只绘制 background
2. 绘制 DOM
   - 通过递归的方式来完成 DOM 树的绘制

### 搭建 CSS 结构
- At-Rule
  - @charset
  - @import
  - @media
  - @page
  - @counter-style
  - @keyframes
  - @fontface
  - @supports
  - @namespace
- rule
  - Selector
    - selectors_group
    - combinator
      - +
      - >
      - -
    - simple_selector
      - type
      - *
      - #
      - .
      - []
      - :
      - ::
  - Declaration
    - Key
      - Property
      - Variable
    - Value

#### 收集 CSS 标准名称和 url
```js
 const list = document.getElementById("container").children
 const result = []
 for (let i of list) {
   if (i.getAttribute('data-tag').match(/css/)) {
     result.push({
       name: i.children[1].innerText,
       url: i.children[1].children[0].href
     })
   }
 }
  console.log(JSON.stringify(result, null, 4))
```

#### 通过 iframe 加载标准页面
```js
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);




function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}




void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();
```