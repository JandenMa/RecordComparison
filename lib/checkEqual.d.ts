/**
 * @description sort the array
 * @param {Array<any>} arr the array which needs to be sorted
 * @author Janden Ma
 * @version 1.0.0
 */
declare function sortArray(arr: Array<any>): Array<any>

/**
 * @description Check two Arrays are equal or not
 * @param {Array} arrA
 * @param {Array} arrB
 * @returns {Boolean} equal or not
 * @author Janden Ma
 * @version 1.0.0
 */
declare function checkArrayEqual(arrA, arrB): -1 | 0 | 1

/**
 * @description Check two Objects are equal or not
 * @param {Object|JSON} objA
 * @param {Object|JSON} objB
 * @returns {Boolean} equal or not
 * @author Janden Ma
 * @version 1.0.0
 */
declare function checkObjectEqual(objA, objB): -1 | 0 | 1

export default function checkEqual(objA: any, objB: any): -1 | 0 | 1
