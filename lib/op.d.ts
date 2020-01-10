/* eslint-disable no-unused-vars */
/**
 * Sort items of array by props
 * @param {object} item1
 * @param {object} item2
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} props
 */
declare function SortByProps(
  item1: Array<object>,
  item2: Array<object>,
  props: Array<{ field: string; order?: 'ASC' | 'DESC' }>
): Array<1 | 0 | -1>;

/**
 * Sort Array
 * @param {Array<object>} arr
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} fields
 */
export function Sort(
  arr: Array<object>,
  fields: Array<{ field: string; order?: 'ASC' | 'DESC' }>
): Array<object>;

/**
 * compare items of array
 * @param {object} masterItem
 * @param {object} detailItem
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} masterFields
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} detailFields
 */
export function Compare(
  masterItem: Array<object>,
  detailItem: Array<object>,
  masterFields: Array<{ field: string; order?: 'ASC' | 'DESC' }>,
  detailFields: Array<{ field: string; order?: 'ASC' | 'DESC' }>
): -1 | 0 | 1;
