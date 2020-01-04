const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 24

export function getWidth(index) {
  return localStorage.getItem(`width`)
    ? JSON.parse(localStorage.getItem(`width`))[+index]
    : DEFAULT_WIDTH
}

export function getHeight(index) {
  return localStorage.getItem(`height`) !== null
    ? JSON.parse(localStorage.getItem(`height`))[+index]
    : DEFAULT_HEIGHT
}

export function setToLocalValue(name, value, prop) {
  const state = JSON.parse(localStorage.getItem(`${prop}`))
  if (state == null) {
    return JSON.stringify({ [name]: value })
  }
  state[name] = value
  return JSON.stringify(state)
}
