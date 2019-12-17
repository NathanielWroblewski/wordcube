// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

class Letters {
  constructor () {
    this.letters = []
  }

  get last () {
    if (this.letters.length) {
      return this.letters[this.letters.length - 1]
    }
  }

  contains (face) {
    return !!this.letters.find(element => element.face === face)
  }

  push ({ index, face, letter }) {
    this.letters.push({ index, face, letter })
  }

  get word () {
    return this.letters.map(element => element.letter).join('')
  }

  clear () {
    this.letters = []
  }
}

export default Letters
