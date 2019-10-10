/* eslint-disable no-use-before-define */
/**
 * @description sort the array
 * @param {Array<any>} arr the array which needs to be sorted
 * @author Janden Ma
 * @version 1.0.0
 */
function sortArray(arr) {
  arr.sort((a, b) => {
    // if type of neighboring items in array are different, needn't sort
    if (typeof a !== typeof b) return 0
    // if type of items in array are number or string, sort ascending
    if (typeof a === 'number') return a - b
    if (typeof a === 'string') {
      const _a = a.toUpperCase()
      const _b = b.toUpperCase()
      if (_a < _b) return -1
      if (_a > _b) return 1
      return 0
    }
    // other types of neighboring items in array, needn't sort
    return 0
  })
}

function checkEqual(objA, objB) {
  // if either of A and B is empty or undefined, return objA===objB
  if (!objA || !objB) return objA === objB ? 0 : -1
  // if type of A isn't equal type of B, needn't compare more and return false
  if (typeof objA !== typeof objB) return -1
  // if types of A and B are object
  if (typeof objA === 'object') {
    let _objectAIsArray = true
    let _objectBIsArray = true
    // if obj has length property, it means that it is an array
    if (!Object.prototype.hasOwnProperty.call(objA, 'length')) {
      _objectAIsArray = false
    }
    if (!Object.prototype.hasOwnProperty.call(objB, 'length')) {
      _objectBIsArray = false
    }
    // if _objectAIsArray isn't equal _objectBIsArray, it means one of them is Array, another is Object
    if (_objectAIsArray !== _objectBIsArray) return false
    // if all of them are array
    if (_objectAIsArray && _objectBIsArray) {
      return checkArrayEqual(objA, objB)
    }
    // else all of them are object
    return checkObjectEqual(objA, objB)
  }
  if (objA === objB) return 0
  if (objA > objB) return 1
  return -1
}

/**
 * @description Check two Arrays are equal or not
 * @param {Array} arrA
 * @param {Array} arrB
 * @returns {Boolean} equal or not
 * @author Janden Ma
 * @version 1.0.0
 */
function checkArrayEqual(arrA, arrB) {
  // if the length of arrays are different, needn't compare more and return false
  if (arrA.length !== arrB.length) return -1
  let _equal = 0
  // sort array first
  sortArray(arrA)
  sortArray(arrB)
  for (let i = 0, l = arrA.length; i < l; i += 1) {
    const ret = checkEqual(arrA[i], arrB[i])
    if (ret !== 0) {
      _equal = ret
      break
    }
  }
  return _equal
}

/**
 * @description Check two Objects are equal or not
 * @param {Object|JSON} objA
 * @param {Object|JSON} objB
 * @returns {Boolean} equal or not
 * @author Janden Ma
 * @version 1.0.0
 */
function checkObjectEqual(objA, objB) {
  const _keysA = Object.keys(objA)
  const _keysB = Object.keys(objB)
  // if the length of Object keys are different, needn't compare more and return false
  if (_keysA.length !== _keysB.length) return -1
  let _equal = 0
  _keysA.forEach(key => {
    const ret = checkEqual(objA[key], objB[key])
    // if key in objA is not in objB, CheckEqual will return false
    if (ret !== 0) {
      _equal = ret
    }
  })
  return _equal
}

module.exports = checkEqual
