import { INPUT_DIRECTION, RELEASE_DIRECTION, INPUT_LETTER, INPUT_WORD, CYCLE_FACE, TURN_FACE } from '../constants/events.js'
import { LEFT, UP, RIGHT, DOWN, A, B } from '../constants/keys.js'

class Controller {
  constructor ({ input, letters, faces, camera }) {
    this.input = input
    this.letters = letters
    this.faces = faces
    this.camera = camera
    this._on = {
      [INPUT_DIRECTION]: [],
      [RELEASE_DIRECTION]: [],
      [INPUT_LETTER]: [],
      [INPUT_WORD]: [],
      [CYCLE_FACE]: [],
      [TURN_FACE]: []
    }

    this._setListeners()
  }

  _setListeners () {
    this.input.addEventListener('keydown', e => this._onKeyDown(e))
    this.input.addEventListener('keyup', e => this._onKeyUp(e))
  }

  _onKeyDown (event) {
    switch (event.keyCode) {
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        event.preventDefault()
        return this.trigger(INPUT_DIRECTION, event.keyCode)
      case A:
        event.preventDefault()
        return this.trigger(INPUT_LETTER, this._getHighlightedFace())
      case B:
        event.preventDefault()

        if (this.letters.word.length) {
          return this.trigger(INPUT_WORD, this.letters.word)
        } else {
          return this.trigger(CYCLE_FACE)
        }
    }
  }

  _onKeyUp ({ keyCode }) {
    switch (keyCode) {
      case UP:
      case DOWN:
      case LEFT:
      case RIGHT:
        return this.trigger(RELEASE_DIRECTION, keyCode)
    }
  }

  on (event, callback) {
    if (this._on[event]) {
      this._on[event].push(callback)
    }
  }

  trigger (event, payload) {
    if (this._on[event]) {
      this._on[event].forEach(callback => callback(payload))
    }
  }

  // should be cached
  // should be on faces collection
  // should be able to remove faces reference in constructor
  // should be able to remove camera reference in constructor
  _getHighlightedFace () {
    let min = null

    this.faces.reduce((memo, face, index) => {
      const distance = face.center.subtract(this.camera.position).magnitude

      if (distance < memo) {
        memo = distance
        min = index
      }
      return memo
    }, Infinity)

    return min
  }
}

export default Controller
