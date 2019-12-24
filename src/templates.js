const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 24

function getWidth(index) {
  return localStorage.getItem(`width`)
    ? JSON.parse(localStorage.getItem(`width`))[+index]
    : DEFAULT_WIDTH
}
export function setToLocalValue(parent, value, prop) {
  const state = JSON.parse(localStorage.getItem(`${prop}`))
  if (state == null) {
    return JSON.stringify({ [parent]: value })
  }
  state[parent] = value
  return JSON.stringify(state)
}
function getHeight(index) {
  return localStorage.getItem(`height`) !== null
    ? JSON.parse(localStorage.getItem(`height`))[+index]
    : DEFAULT_HEIGHT
}
function getContent(index) {
  console.log(index)
  return localStorage.getItem(`div`) !== null
    ? JSON.parse(localStorage.getItem(`div`))[index + '-' + 1]
    : ''
}
export function createCol(index) {
  const CODES = {
    A: 65,
    Z: 90
  }
  return `
    <div 
      class="first" 
      style="width: ${getWidth(index)}px" 
      data-col='${index}'
    >
      ${String.fromCodePoint(CODES.A + index - 1)}
      <div class="resizerCol" data-resize="col"></div>
    </div>
    `
}
//JSON.parse(localStorage.getItem('div'))
function val(index) {
  for (let i = 0; i < 6; i++) {
    return `[${index + '-' + i}]`
  }
}

export function createRow(index) {
  return `
    <div 
        class="cell" 
        contenteditable="true"
        style="width: ${getWidth(index + 1)}px" 
        data-col='${index + 1}'
        >
    </div>
    `
}

export function createCell(content, index = '') {
  const resizer =
    index !== '' ? '<div class="resizerRow" data-resize="row"></div>' : ''
  return `
    <div 
      class="row" 
      style="height: ${getHeight(index + 1)}px" 
      data-row="${index + 1}"
    >
      <div class="row-info">
          ${index !== '' ? index + 1 : ''}
          ${resizer}
      </div>
      <div class="row-content">
          ${content.join('')}
      </div>
    </div>
    `
}
