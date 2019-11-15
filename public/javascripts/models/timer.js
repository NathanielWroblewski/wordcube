class Timer {
  set ({ min, sec = 0 }) {
    const minInMs = min * 60 * 1000
    const secInMs = sec * 1000

    this.expiresAt = Date.now() + minInMs + secInMs
  }

  get inSeconds () {
    return (this.expiresAt - Date.now()) / 1000
  }

  get minutes () {
    return Math.floor(this.inSeconds / 60)
  }

  get seconds () {
    return Math.floor(this.inSeconds % 60)
  }

  isUp () {
    return this.expiresAt <= Date.now()
  }
}

export default Timer
