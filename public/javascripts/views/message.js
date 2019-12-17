import renderText from './text.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const render = ({ show, hide, message }) => {
  show.style.display = 'block'
  hide.style.display = 'none'

  renderText({ element: show, message })
}

export default render
