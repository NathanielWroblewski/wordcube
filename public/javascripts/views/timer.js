// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const render = ({ element, min, sec, isUp }) => {
  const paddedSeconds = String(sec).padStart(2, '0')

  element.innerText = isUp ? '0:00' : `${min}:${paddedSeconds}`
}

export default render
