import renderFace from './face.js'
import { stableSort, numCompare } from '../utilities/index.js'

// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

const render = ({ element, faces, camera, letters, neighbors, isSelecting, isSelectableLetter }) => {
  // TODO: only recompute when panning
  const renderOrder = stableSort(faces, (a, b) => {
    const adist = a.center.subtract(camera.position).magnitude
    const bdist = b.center.subtract(camera.position).magnitude

    return numCompare(bdist, adist)
  })

  element.getContext('2d').clearRect(0, 0, 400, 400)

  renderOrder.forEach((face, index) => {
    const isSelectable = isSelectableLetter(letters, neighbors, face)
    const isHighlighted = index === renderOrder.length - 1

    renderFace({ element, face, isHighlighted, isSelectable, isSelecting })
  })
}

export default render

  // face highlighting (currently disabled)
  // TODO: may only need to be recomputed on every quarter turn of cuboid
  // sortedByCuboidFace = []

  // if (mode.isCuboidFaceMode) {
  //   const cuboidFaceCenterIndex = (mode.selectedCuboidFace * 9) + 4
  //   const cuboidFaceCenter = faces[cuboidFaceCenterIndex]
  //   sortedByCuboidFace = stableSort(faces, (a, b) => {
  //     const adist = a.center.subtract(cuboidFaceCenter.center).magnitude
  //     const bdist = b.center.subtract(cuboidFaceCenter.center).magnitude

  //     return numCompare(adist, bdist)
  //   })
  // }

  // const isHighlightedFace = (mode, face, index, sorted, sortedByCuboidFace) => {
  //   if (mode.isDiceFaceMode) {
  //     return index === sorted.length - 1
  //   } else if (mode.isCuboidFaceMode) {
  //     return sortedByCuboidFace.indexOf(face) < 21
  //   } else {
  //     return false
  //   }
  // }
