// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

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
