/**
 * @description verify whether the value is an object
 * @param {object} value
 */
declare function IsObj(value: object): boolean

/**
 * @description verify whether the value is an array
 * @param {Array<any>} value
 */
declare function IsArr(value: Array<any>): boolean

/**
 * @description verify whether the value is an array
 * @param {Array<any>} value
 */
declare function IsArray(value: Array<any>): boolean

/**
 * @description verify whether the value is an array of object
 * @param {Array<object>} value
 */
declare function IsObjArray(value: Array<object>): boolean

/**
 * @description verify arguments
 * @param {Array<object>} masterArray
 * @param {Array<object>} detailArray
 */
export function VerifyArguments(
  masterArray: Array<object>,
  detailArray: Array<object>
): boolean

/**
 * @description verify arguments
 * @param {Array<object>} masterArray
 * @param {Array<Array<object>>} detailArray
 */
export function VerifyArguments2(
  masterArray: Array<object>,
  detailArray: Array<Array<object>>
): boolean
