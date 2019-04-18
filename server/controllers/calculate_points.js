module.exports = calculate = points => {
  let total = 0

  if (Object.keys(points).length > 1) {
    for (key in points) {
      if (key !== 'totalItems') {
        total += Number(points[key])
      }
    }
    total = Math.floor(total / points.totalItems)
    console.log(total)
    return total
  }
  return 'Nothing find'
}
