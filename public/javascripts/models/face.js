import Vector from './vector.js'
import { place, stableSort, numCompare } from '../utilities/index.js'

class Face {
  constructor ({ vertices, letter }) {
    this.vertices = vertices
    this.letter = letter
    this.highlighted = false
  }

  rotateX (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.vertices = this.vertices.map(vertex => {
      return Vector.from([
        vertex.x,
        vertex.y * cosine - direction * vertex.z * sine,
        vertex.z * cosine + direction * vertex.y * sine,
      ])
    })
  }

  rotateY (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.vertices = this.vertices.map(vertex => {
      return Vector.from([
        (vertex.x * cosine - direction * vertex.z * sine),
        vertex.y,
        (vertex.z * cosine + direction * vertex.x * sine),
      ])
    })
  }

  rotateZ (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.vertices = this.vertices.map(vertex => {
      return Vector.from([
        vertex.x * cosine - direction * vertex.y * sine,
        vertex.y * cosine + direction * vertex.x * sine,
        vertex.z,
      ])
    })
  }

  select (vector) {
    this.highlighted = true
  }

  deselect (vector) {
    this.highlighted = false
  }

  get center () {
    return this.vertices.reduce((vertex, memo) => memo.add(vertex)).multiply(0.25)
  }

  isCorner () {
    const { x, y, z } = this.center

    return (
      (Math.abs(x) === Math.abs(y) && Math.abs(x) != Math.abs(z) && Math.abs(x) != 0) ||
      (Math.abs(x) === Math.abs(z) && Math.abs(x) != Math.abs(y) && Math.abs(x) != 0) ||
      (Math.abs(y) === Math.abs(z) && Math.abs(y) != Math.abs(x) && Math.abs(y) != 0)
    )
  }

  static offset (value, fixedpointIndex, flip) {
    const vertices = [
      Vector.from(place(-0.5, -0.5, 0, fixedpointIndex)).add(value),
      Vector.from(place(-0.5,  0.5, 0, fixedpointIndex)).add(value),
      Vector.from(place( 0.5,  0.5, 0, fixedpointIndex)).add(value),
      Vector.from(place( 0.5, -0.5, 0, fixedpointIndex)).add(value),
    ]

    return flip ? vertices.reverse() : vertices
  }
}

export default Face
