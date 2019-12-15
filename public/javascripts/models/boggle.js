// maybe rename Round/Match?
// maybe pull out wordbank, cuboid, letters into guesses?
class Boggle {
  constructor ({ cuboid, timer, words, points }) {
    this.timer = timer
    this.cuboid = cuboid
    this.words = words
  }

  get word () {
    return this.letters.word
  }

  hasWord () {
    return this.word.length > 0
  }

  addLetter (index) {
    this.words.add({
      index,
      face: this.cuboid[index],
      letter: this.cuboid[index].letter
    })
  }

  errorsFor (word) {
    if (this.timer.isUp()) {
      return 'Time is up!'
    }

    return this.words.errorsFor(word)
  }

  submit (word) {
    this.words.submit(word)
    this.points += word.length * word.length
  }

  isSelectable (currentFace) {
    return (
      !this.words.current || (
        !this.words.hasAdded(currentFace) &&
        this.cuboid.neighborsOf(this.words.last.index).contains(currentFace)
      )
    )
  }
}

export default Boggle
