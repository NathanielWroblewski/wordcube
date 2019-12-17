// Copyright (c) 2019 Nathaniel Wroblewski
// I am making my contributions/submissions to this project solely in my personal
// capacity and am not conveying any rights to any intellectual property of any
// third parties.

export const place = (x, y, fixedpoint, fixedpointIndex) => {
  switch (fixedpointIndex) {
    case 0: return [fixedpoint, x, y]
    case 1: return [x, fixedpoint, y]
    case 2: return [x, y, fixedpoint]
    default:
      throw "utilities#place only accepts 3-dimensions"
  }
}

// Array#sort is unstable
export const stableSort = (array, compare) => {
  const list = array.map((value, index) => ({ value, index }))

  list.sort((a, b) => {
    const r = compare(a.value, b.value)

    return r == 0 ? a.index - b.index : r
  })

  return list.map(element => element.value)
}

export const numCompare = (a = 0, b = 0) => {
  if (parseFloat(a) === parseFloat(b)) return 0

  return parseFloat(a) > parseFloat(b) ? 1 : -1
}

export const sample = array => array[Math.floor(Math.random() * array.length)]

export const cube = (callback) => {
  const offsets = [-1, 0, 1]
  const fixedpoints = [-1.51, 1.51]
  const fixedpointIndex = [0, 1, 2]
  const results = []

  fixedpoints.forEach(fixedpoint => {
    fixedpointIndex.forEach(fixedpointIndex => {
      offsets.forEach(xoffset => {
        offsets.forEach(yoffset => {
          const offset = place(xoffset, yoffset, fixedpoint, fixedpointIndex)
          const flip = (fixedpoint < 0 && fixedpointIndex % 2 === 1) ||
            (fixedpoint > 0 && fixedpointIndex % 2 === 0)

          results.push(callback(offset, fixedpointIndex, flip))
        })
      })
    })
  })

  return results
}
