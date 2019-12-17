import Vector from '../models/vector.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const height = 400
const width = 400
const halfheight = height / 2
const halfwidth = width / 2
const SIZE = 30
const FOCAL_LENGTH = 400

const offset = vector => (
  vector.multiply(SIZE).multiply(FOCAL_LENGTH / ((vector.z * SIZE) + width/2)).add(width/2)
)

const render = ({ element, face, isHighlighted, isSelecting, isSelectable }) => {
  const context = element.getContext('2d')
  const vertices = face.vertices
  const src = offset(vertices[0])

  // backface-culling & surface normal calculation
  // const side1 = vertices[2].subtract(vertices[0])
  // const side2 = vertices[3].subtract(vertices[0])
  // const normal = side1.cross(side2).add(face.center)

  // if (normal.z > 0) {
  //   return false
  // }

  context.lineWidth = 1
  context.strokeStyle = '#666'

  // cell background
  if (isHighlighted && isSelecting && !isSelectable) {
    context.fillStyle = '#ddd'
  } else if (isHighlighted) {
    context.fillStyle = '#29f1c3'
  } else if (isSelecting && !isSelectable) {
    context.fillStyle = '#eee'
  } else {
    context.fillStyle = '#fff'
  }

  context.beginPath()
  context.moveTo(src.x, src.y)

  for (let i = 1; i < vertices.length; i++) {
    const dest = offset(vertices[i])
    context.lineTo(dest.x, dest.y)
  }

  let zOffset = 1
  let fontSize = '32'
  switch (face.letter) {
    case 'Qu':
      fontSize = '22'
      zOffset = 1.7
      break
    case 'M':
      fontSize = '24'
      zOffset = 1.4
      break
    case 'W':
      fontSize = '24'
      zOffset = 1.6
      break
  }

  context.closePath()
  context.fill()
  context.stroke()

  context.fillStyle = (isSelecting && !isSelectable ? '#aaa' : '#666')
  context.font = `${fontSize}px Montserrat, sans-serif`

  const modifiedCenter = face.center.add(Vector.from([0, 0, zOffset]))

  const [textx, texty, _] = offset(modifiedCenter)
  context.fillText(face.letter, textx - 12, texty + 10)
}

export default render
