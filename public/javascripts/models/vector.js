class Vector extends Array {
  get x () {
    return this[0]
  }

  get y () {
    return this[1]
  }

  get z () {
    return this[2]
  }

  get magnitude () {
    return this.reduce((memo, element) => memo += element * element, 0)
  }

  multiply (scalar) {
    return this.map(element => element * scalar)
  }

  dot (vector) {
    return this.reduce((element, index) => element * vector[index], 0)
  }

  add (value) {
    if (typeof(value) === 'number') {
      return this.map(element => element + value)
    } else if (value instanceof Vector) {
      return this.map((element, index) => element + value[index])
    } else {
      throw "Argument to Vector#add must be scalar or vector"
    }
  }

  cross (vector) {
    return Vector.from([
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    ])
  }

  subtract (value) {
    if (typeof(value) === 'number') {
      return this.add(-value)
    } else if (value instanceof Vector) {
      return this.map((element, index) => element - value[index])
    } else {
      throw "Argument to Vector#subtract must be scalar or vector"
    }
  }
}

export default Vector
