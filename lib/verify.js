/**
 * @description verify whether the value is an object
 * @param {object} value
 */
const IsObj = value => value.constructor === Object

/**
 * @description verify whether the value is an array
 * @param {Array<any>} value
 */
const IsArr = value => value.constructor === Array

/**
 * @description verify whether the value is an array
 * @param {Array<any>} value
 */
const IsArray = value => {
  if (!IsArr(value)) return false
  return Object.prototype.hasOwnProperty.call(value, 'length')
}

/**
 * @description verify whether the value is an array of object
 * @param {Array<object>} value
 */
const IsObjArray = value => {
  if (!IsArray(value)) return false
  return value.filter(v => IsObj(v)).length === value.length
}

/**
 * @description verify arguments
 * @param {Array<object>} masterArray
 * @param {Array<object>} detailArray
 */
const VerifyArguments = (masterArray, detailArray) => {
  if (!IsObjArray(masterArray)) {
    throw new Error('"masterArray" is invalid')
  }
  if (!IsObjArray(detailArray)) {
    throw new Error('"detailArray" is invalid')
  }
  return true
}

/**
 * @description verify arguments
 * @param {Array<object>} masterArray
 * @param {Array<Array<object>>} detailArray
 */
const VerifyArguments2 = (masterArray, detailArray) => {
  if (!IsObjArray(masterArray)) {
    throw new Error('"masterArray" is invalid')
  }
  if (!IsArray(detailArray)) {
    throw new Error('"detailArray" is invalid')
  }
  detailArray.forEach(a => {
    if (!IsObjArray(a)) {
      throw new Error('"detailArray" is invalid')
    }
  })
  return true
}

module.exports = { VerifyArguments, VerifyArguments2 }
