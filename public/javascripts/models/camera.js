import Vector from './vector.js'
import { LEFT, RIGHT, UP, DOWN } from '../constants/keys.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Camera {
  constructor ({ position }) {
    this.position = position
    this.moving = {
      [LEFT]: false,
      [RIGHT]: false,
      [UP]: false,
      [DOWN]: false,
    }
  }

  isPanning (direction) {
    return this.moving[direction]
  }

  pan (direction) {
    switch (direction) {
      case UP:
        this.moving[UP] = true
        this.moving[DOWN] = false
        break
      case DOWN:
        this.moving[UP] = false
        this.moving[DOWN] = true
        break
      case LEFT:
        this.moving[LEFT] = true
        this.moving[RIGHT] = false
        break
      case RIGHT:
        this.moving[LEFT] = false
        this.moving[RIGHT] = true
        break
    }
  }

  halt (direction) {
    this.moving[direction] = false
  }

  rotateX (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.position = Vector.from([
      this.position.x,
      this.position.y * cosine - direction * this.position.z * sine,
      this.position.z * cosine + direction * this.position.y * sine,
    ])
  }

  rotateY (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.position = Vector.from([
      this.position.x * cosine - direction * this.position.z * sine,
      this.position.y,
      this.position.z * cosine + direction * this.position.x * sine,
    ])
  }

  rotateZ (radians, direction) {
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    this.position = Vector.from([
      this.position.x * cosine - direction * this.position.y * sine,
      this.position.y * cosine + direction * this.position.x * sine,
      this.position.z,
    ])
  }

}

export default Camera
