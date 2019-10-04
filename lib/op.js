const { checkEqual } = require('check-equal')

/**
 * Sort items of array by props
 * @param {object} item1
 * @param {object} item2
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} props
 */
const SortByProps = (item1, item2, props) => {
  const cps = [] // store results
  let asc = true // order
  // if there is not any field, return original items
  if (props.length === 0) {
    cps.push(0)
  } else {
    for (let i = 0, l = props.length; i < l; i++) {
      const prop = props[i]
      const { field, order = 'ASC' } = prop
      asc = order === 'ASC'
      const a = item1[field]
      const b = item2[field]
      //if type of items is different, skipped
      if (typeof a !== typeof b) {
        cps.push(0)
        break
      }
      //if type of items is number or string
      if (typeof a === 'number') {
        cps.push(asc ? 1 : -1)
        break
      }
      if (typeof a === 'string') {
        const _a = a.toUpperCase()
        const _b = b.toUpperCase()
        if (_a < _b) {
          cps.push(asc ? -1 : 1)
          break
        } else if (_a > _b) {
          cps.push(asc ? 1 : -1)
          break
        } else {
          cps.push(0)
          break
        }
      }
      cps.push(0)
      break
    }
  }
  for (let j = 0, l = cps.length; j < l; j++) {
    if (cps[j] === 1 || cps[j] === -1) {
      return cps[j]
    }
  }
}

/**
 * Sort Array
 * @param {Array<object>} arr
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} fields
 */
const Sort = (arr, fields) => {
  return arr.sort((a, b) => SortByProps(a, b, fields))
}

/**
 * compare items of array
 * @param {object} item1
 * @param {object} item2
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} props
 */
const Compare = (masterItem, detailItem, masterFields, detailFields) => {
  let ret = true
  for (let i = 0, l = masterFields.length; i < l; i++) {
    const masterField = masterFields[i]
    const detailField = detailFields[i]
    const { field: masterFieldName } = masterField
    const { field: detailFieldName } = detailField
    if (!checkEqual(masterItem[masterFieldName], detailItem[detailFieldName])) {
      ret = false
      break
    }
    break
  }
  return ret
}

module.exports = { Compare, Sort }
