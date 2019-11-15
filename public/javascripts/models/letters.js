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
