const render = ({ element, min, sec, isUp }) => {
  const paddedSeconds = String(sec).padStart(2, '0')

  element.innerText = isUp ? '0:00' : `${min}:${paddedSeconds}`
}

export default render
