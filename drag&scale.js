//参数为  子元素id,父元素id
function Drag(son, father) {
  var son = document.getElementById(son)
  var box = document.getElementById(father)
  son.onmousedown = function(e) {
    // 先获取拖拽前鼠标相对于当前元素的位置
    var X = son.offsetLeft + box.offsetLeft
    var x2 = e.clientX - X
    var Y = son.offsetTop + box.offsetTop
    var y2 = e.clientY - Y
    son.style.cursor = 'move'

    document.onmousemove = function(e) {
      son.style.left = e.clientX - box.offsetLeft - x2 + 'px'
      son.style.top = e.clientY - box.offsetTop - y2 + 'px'
      // 阻止拖动到盒子外
      if (son.offsetLeft > box.clientWidth - son.clientWidth)
        son.style.left = box.clientWidth - son.clientWidth + 'px'
      if (son.offsetLeft < 0) son.style.left = 0 + 'px'

      if (son.offsetTop > box.clientHeight - son.clientHeight)
        son.style.top = box.clientHeight - son.clientHeight + 'px'
      if (son.offsetTop < 0) son.style.top = 0 + 'px'
    }
  }

  document.onmouseup = function() {
    document.onmousemove = null
    son.style.cursor = 'unset'
  }
}

// 放大缩小
// 参数为被放大元素id,父元素id,右下角拖拽点id,缩放最小宽度(可省略,默认100px)
function Scale(son, father, pot, min) {
  var pot = document.getElementById(pot)
  var son = document.getElementById(son)
  var father = document.getElementById(father)
  pot.onmousedown = function(e) {
    e.preventDefault()
    event.stopPropagation()
    father.style.cursor = 'se-resize'
    // 先获取拖拽前鼠标的坐标
    var X = e.clientX
    var Y = e.clientY
    var width = son.clientWidth
    var height = son.clientHeight
    var rat = width / height //获取宽高比例，缩放时等比例缩放
    min = min || 100
    document.onmousemove = function(e) {
      e.preventDefault()
      e.stopPropagation()
      son.style.width = width + e.clientX - X + 'px'
      son.style.height = height + (e.clientX - X) / rat + 'px' // 缩放保持正方形
      // son.style.height = height + e.clientY - Y + 'px'  // 随意缩放
      //阻止缩小小于最小大小 (100是写死的，根据图片大小决定)
      if (son.clientWidth < min) {
        son.style.width = min + 'px'
        son.style.height = min / rat + 'px'
      }
      // if (son.clientHeight < height) son.style.height = height + 'px'
      // 阻止放大超过盒子
      //宽度到达边缘  高度也停止增加
      if (son.clientWidth > father.clientWidth - son.offsetLeft) {
        son.style.width = father.clientWidth - son.offsetLeft + 'px'
        son.style.height = (father.clientWidth - son.offsetLeft) / rat + 'px'
      }
      // 高度到达边缘  宽度也停止增加
      if (son.clientHeight > father.clientHeight - son.offsetTop) {
        son.style.height = father.clientHeight - son.offsetTop + 'px'
        son.style.width = (father.clientHeight - son.offsetTop) * rat + 'px'
      }
    }
  }
  father.onmouseup = function() {
    pot.onmousemove = null
    father.style.cursor = 'unset'
  }
}
