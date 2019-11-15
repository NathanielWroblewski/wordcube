import renderText from './text.js'

const render = ({ show, hide, message }) => {
  show.style.display = 'block'
  hide.style.display = 'none'

  renderText({ element: show, message })
}

export default render
