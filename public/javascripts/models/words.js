import { DICTIONARY } from '../data/dictionary.js'
import { MIN_WORD_LENGTH } from '../constants/index.js'

// unsure this grouping makes much sense :/
class Words {
  constructor ({ letters, wordbank, dictionary = DICTIONARY }) {
    this.letters = letters
    this.wordbank = wordbank // could be a trie/hash, do we need order?
    this.dictionary = dictionary
  }

  get current () {
    return this.letters.word
  }

  get last () {
    return this.letters.last
  }

  add (letter) {
    this.letters.push(letter)
  }

  hasAdded (letter) {
    return this.letters.contains(letter)
  }

  errorsFor (word) {
    if (word.length < MIN_WORD_LENGTH) {
      return `Must be ${MIN_WORD_LENGTH} letters!`
    } else if (this.wordbank.includes(word)) {
      return 'Already guessed!'
    } else if (!this.dictionary[word.toLowerCase()]) {
      return 'Not in dictionary!'
    }
  }

  submit (word) {
    this.wordbank.push(word)
  }

  clear () {
    this.letters.clear()
  }
}

export default Words
