import { LEFT, RIGHT, UP, DOWN } from '../constants/keys.js'

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
}

export default Camera
