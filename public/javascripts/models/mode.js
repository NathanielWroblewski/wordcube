// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const CUBOID_FACE_MODE = 0
const DICE_FACE_MODE = 1
const NUM_CUBOID_FACES = 6

class Mode {
  constructor () {
    this.mode = DICE_FACE_MODE
    this.selectedCuboidFace = 0
  }

  setDiceFaceMode () {
    this.mode = DICE_FACE_MODE
  }

  setCuboidFaceMode () {
    if (this.isDiceFaceMode) {
      this.mode = CUBOID_FACE_MODE
      this.face = 0
    }
  }

  cycleCuboidFace () {
    this.selectedCuboidFace = (this.selectedCuboidFace + 1) % NUM_CUBOID_FACES
  }

  get isDiceFaceMode () {
    return this.mode === DICE_FACE_MODE
  }

  get isCuboidFaceMode () {
    return this.mode === CUBOID_FACE_MODE
  }
}

export default Mode
