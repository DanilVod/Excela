import { getWidth, getHeight } from './values'

export const createTable = function() {
  const rows = []
  const firstCol = []
  //создание первой строки
  for (let k = 1; k < this.colsCount + 1; k++) {
    firstCol.push(createFirstRow(k))
  }
  //создание строк
  rows.push(createRow('', '', firstCol))
  for (let i = 0; i < this.rowsCount; i++) {
    rows.push(createRow(this.colsCount, i))
  }
  table.insertAdjacentHTML('beforeend', `${rows.join('')}`)
}

export function createFirstRow(index) {
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

export function createRow(colIndex, rowIndex = '', content) {
  const cols = []
  //Если контент не задан
  if (typeof content == 'undefined') {
    for (let i = 0; i < colIndex; i++) {
      //Создание колонок
      cols.push(createCol(rowIndex, i))
    }
  }
  const resizer =
    rowIndex !== '' ? '<div class="resizerRow" data-resize="row"></div>' : ''
  return `
    <div 
      class="row" 
      style="height: ${getHeight(rowIndex + 1)}px" 
      data-row="${rowIndex + 1}"
    >
      <div class="row-info">
          ${rowIndex !== '' ? rowIndex + 1 : ''}
          ${resizer}
      </div>
      <div class="row-content">
          ${typeof content == 'undefined' ? cols.join('') : content.join('')}
      </div>
    </div>
    `
}

function createCol(rowIndex, colIndex) {
  return `
  <div 
      class="cell" 
      contenteditable="true"
      style="width: ${getWidth(colIndex + 1)}px;
      font-weight:${
        JSON.parse(localStorage.getItem(`fontWeight`))[
          rowIndex + 1 + '-' + (colIndex + 1)
        ]
      };
      font-style:${
        JSON.parse(localStorage.getItem(`fontStyle`))[
          rowIndex + 1 + '-' + (colIndex + 1)
        ]
      };
      text-decoration:${
        JSON.parse(localStorage.getItem(`textDecoration`))[
          rowIndex + 1 + '-' + (colIndex + 1)
        ]
      };
      justify-content:${
        JSON.parse(localStorage.getItem(`justifyContent`))[
          rowIndex + 1 + '-' + (colIndex + 1)
        ]
      };"
      data-col='${colIndex + 1}'
      >
      ${
        JSON.parse(localStorage.getItem(`div`)) == null //Проверка локалсторейджа на наличие значений
          ? ''
          : typeof JSON.parse(localStorage.getItem(`div`))[
              rowIndex + 1 + '-' + (colIndex + 1)
            ] == 'undefined'
          ? ''
          : JSON.parse(localStorage.getItem(`div`))[
              rowIndex + 1 + '-' + (colIndex + 1)
            ]
      }
  </div>
  `
}

function createButtons() {
  const buttons = []
  const name = [
    'bold',
    'italic',
    'underline',
    'flex-start',
    'center',
    'flex-end'
  ]
  for (let i = 0; i < name.length; i++) {
    buttons.push(`<button id=${name[i]}>
    <img src="../img/${name[i]}.svg" />
  </button>`)
  }
  return buttons
}
function createToolbar() {
  const toolbar = []
  toolbar.push(`<div id="toolbar">${createButtons().join('')}</div>`)
  table.insertAdjacentHTML('beforeBegin', `${toolbar.join('')}`)
}
createToolbar()
