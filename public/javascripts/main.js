import Vector from './models/vector.js'
import Face from './models/face.js'
import Timer from './models/timer.js'
import Letters from './models/letters.js'
import Camera from './models/camera.js'
import Controller from './controllers/controller.js'
import renderFace from './views/face.js'
import renderTimer from './views/timer.js'
import renderText from './views/text.js'
import renderMessage from './views/message.js'
import { place, stableSort, numCompare, sample, cube } from './utilities/index.js'
import { DIE, ROTATE_SPEED, SIZE, MIN_WORD_LENGTH } from './constants/index.js'
import { LEFT, UP, RIGHT, DOWN, A, B } from './constants/keys.js'
import {
  INPUT_DIRECTION, RELEASE_DIRECTION, INPUT_LETTER, INPUT_WORD, CYCLE_FACE, TURN_FACE
} from './constants/events.js'
import { DICTIONARY } from './data/dictionary.js'

const timerEl = document.querySelector('.timer')
const wordEl = document.querySelector('.current-word')
const error = document.querySelector('.error')
const score = document.querySelector('.score')
const element = document.querySelector('canvas')

const timer = new Timer()
const letters = new Letters()
const camera = new Camera({ position: Vector.from([0, 0, -3]) })

const WORD_BANK = []

// thinking faces modulo dimension? 0, 1, 2, 3 for none, max by x, y, z
// let SELECTED = 0

let points = 0

timer.set({ min: 3 })

setInterval(() => {
  renderTimer({
    element: timerEl,
    min: timer.minutes,
    sec: timer.seconds,
    isUp: timer.isUp()
  })
}, 100)

const faces = cube((offset, dimension, flip) => {
  const dice = sample(DIE)
  const vertices = Face.offset(Vector.from(offset), dimension, flip)

  return new Face({ vertices, size: SIZE, letter: sample(dice) })
})

const controller = new Controller({ input: document, letters, faces, camera })

// neighbors
const NEIGHBORS = faces.map(face => {
  const numNeighbors = face.isCorner() ? 8 : 9

  return stableSort(faces, (a, b) => {
    const adist = a.center.subtract(face.center).magnitude
    const bdist = b.center.subtract(face.center).magnitude

    return numCompare(adist, bdist)
  }).slice(1, numNeighbors)
})

controller.on(INPUT_DIRECTION, direction => camera.pan(direction))

controller.on(RELEASE_DIRECTION, direction => camera.halt(direction))

controller.on(INPUT_LETTER, letter => {
  const neighbors = letters.last ? NEIGHBORS[letters.last.index] : []

  if (!timer.isUp() && isSelectableLetter(letters, neighbors, faces[letter])) {
    letters.push({ index: letter, face: faces[letter], letter: faces[letter].letter })
    renderMessage({ show: wordEl, hide: error, message: letters.word })
  }
})

// could be word.isValid ? ... : render(word.error)
controller.on(INPUT_WORD, word => {
  letters.clear()

  if (timer.isUp()) {
    renderMessage({
      show: error,
      hide: wordEl,
      message: `Time is up!`
    })
  } else if (word.length < MIN_WORD_LENGTH) {
    renderMessage({
      show: error,
      hide: wordEl,
      message: `Must be ${MIN_WORD_LENGTH} letters!`
    })
  } else if (WORD_BANK.includes(word)) {
    renderMessage({ show: error, hide: wordEl, message: 'Already guessed!' })
  } else if (!DICTIONARY[word.toLowerCase()]) {
    renderMessage({ show: error, hide: wordEl, message: 'Not in dictionary!' })
  } else {
    points += word.length * word.length
    renderText({ element: score, message: points })
    WORD_BANK.push(word)
    renderMessage({ show: wordEl, hide: error, message: '' })
  }
})

// letters logic + neighbors + face
const isSelectableLetter = (letters, neighbors, face) => {
  return (
    letters.word.length === 0 || (
      !letters.contains(face) &&
      neighbors.find(neighbor => neighbor === face)
    )
  )
}

// game.loop
const step = () => {
  element.getContext('2d').clearRect(0, 0, 600, 600)

  faces.forEach((face, index) => {
    if (camera.isPanning(UP)) face.rotateX(ROTATE_SPEED, 1)
    if (camera.isPanning(DOWN)) face.rotateX(ROTATE_SPEED, -1)
    if (camera.isPanning(LEFT)) face.rotateY(ROTATE_SPEED, 1)
    if (camera.isPanning(RIGHT)) face.rotateY(ROTATE_SPEED, -1)
  })

  const sorted = stableSort(faces, (a, b) => {
    const adist = a.center.subtract(camera.position).magnitude
    const bdist = b.center.subtract(camera.position).magnitude

    return numCompare(bdist, adist)
  })

  // neighbors
  let neighbors = []

  if (letters.last) {
    neighbors = NEIGHBORS[letters.last.index]
  }

  sorted.forEach((face, index) => {
    const isHighlighted = index === sorted.length - 1
    const isSelectable = isSelectableLetter(letters, neighbors, face)
    const isSelecting = letters.word.length

    renderFace({ element, face, isHighlighted, isSelectable, isSelecting })
  })

  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
