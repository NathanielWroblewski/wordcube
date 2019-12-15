import { INPUT_DIRECTION, RELEASE_DIRECTION, INPUT_LETTER, INPUT_WORD, CYCLE_FACE, TURN_FACE } from '../constants/events.js'
import { LEFT, UP, RIGHT, DOWN, A, B } from '../constants/keys.js'

class Game {
  constructor ({ controller, camera, boggle }) {
    this.controller = controller
    this.boggle = boggle

    this._setListeners()
  }

  _setListeners () {
    this.controller.on(INPUT_DIRECTION, direction => this.camera.pan(direction))
    this.controller.on(RELEASE_DIRECTION, direction => this.camera.halt(direction))
    controller.on(INPUT_LETTER, face => this._tryLetter(face))
    controller.on(INPUT_WORD, word => this._tryWord(word))
  }

  _tryLetter (face) {
    if (this.boggle.isSelectable(face)) {
      this.boggle.addLetter(face)
      renderMessage({ show: wordEl, hide: error, message: this.boggle.word })
    }
  }

  _tryWord (word) {
    const error = this.boggle.getSubmissionError(word)
    this.boggle.letters.clear()

    if (error) {
      this.renderError(error)
    } else {
      this.boggle.submit(word)
      renderText({ element: score, message: points })
      renderMessage({ show: wordEl, hide: error, message: '' })
    }
  }

  renderError (message) {
    renderMessage({
      show: error,
      hide: wordEl,
      message
    })
  }
}

export default Game
