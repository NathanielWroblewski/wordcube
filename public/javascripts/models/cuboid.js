import Vector from './vector.js'
import Face from './face.js'
import { cube, sample, stableSort, numCompare } from '../utilities/index.js'
import { DIE } from '../constants/index.js'

// just the board, neighbors to an index, etc
// not even the camera or the cursor that should be game controller
class Cuboid {
  constructor ({ faces }) {
    this.faces = faces
    this.neighbors = this.calculateNeighbors(faces)
  }

  // could clean this up
  static shuffle () {
    const faces = cube((offset, dimension, flip) => {
      const dice = sample(DIE)
      const vertices = Face.offset(Vector.from(offset), dimension, flip)

      return new Face({ vertices, size: SIZE, letter: sample(dice) })
    })

    return new Cuboid({ faces })
  }

  // expensive
  calculateNeighbors (faces) {
    return faces.map(face => {
      const numNeighbors = face.isCorner() ? 8 : 9

      return stableSort(faces, (a, b) => {
        const adist = a.center.subtract(face.center).magnitude
        const bdist = b.center.subtract(face.center).magnitude

        return numCompare(adist, bdist)
      }).slice(1, numNeighbors)
    })
  }

  neighborsOf (face) {
    return this.neighbors[face] || []
  }

  face (index) {
    return this.faces[index]
  }
}

export default Cuboid
