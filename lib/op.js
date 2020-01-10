const checkEqual = require('./checkEqual');

/**
 * Sort items of array by props
 * @param {object} item1
 * @param {object} item2
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} props
 */
function SortByProps(item1, item2, props) {
  const cps = []; // store results
  let asc = true; // order
  // if there is not any field, return original items
  if (props.length === 0) {
    cps.push(0);
  } else {
    for (let i = 0, l = props.length; i < l; i += 1) {
      const prop = props[i];
      const { field, order = 'ASC' } = prop;
      asc = order === 'ASC';
      const a = item1[field];
      const b = item2[field];
      // if type of items is different, skipped
      if (typeof a !== typeof b) {
        cps.push(0);
        break;
      }
      // if type of items is number or string
      if (typeof a === 'number') {
        if (a < b) {
          cps.push(asc ? -1 : 1);
          break;
        } else if (a > b) {
          cps.push(asc ? 1 : -1);
          break;
        } else {
          cps.push(0);
          break;
        }
      }
      if (typeof a === 'string') {
        const _a = a.toUpperCase();
        const _b = b.toUpperCase();
        if (_a < _b) {
          cps.push(asc ? -1 : 1);
          break;
        } else if (_a > _b) {
          cps.push(asc ? 1 : -1);
          break;
        } else {
          cps.push(0);
          break;
        }
      }
      cps.push(0);
      break;
    }
  }
  for (let j = 0, l = cps.length; j < l; j += 1) {
    if (cps[j] === 1 || cps[j] === -1) {
      return cps[j];
    }
  }
}

/**
 * Sort Array
 * @param {Array<object>} arr
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} fields
 */
function Sort(arr, fields) {
  return arr.sort((a, b) => SortByProps(a, b, fields));
}

/**
 * compare items of array
 * @param {object} item1
 * @param {object} item2
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} masterField
 * @param {Array<{name:string, order:'ASC'|'DESC'}>} detailField
 */
function Compare(masterItem, detailItem, masterFields, detailFields) {
  let ret = 0;
  for (let i = 0, l = masterFields.length; i < l; i += 1) {
    const masterField = masterFields[i];
    const detailField = detailFields[i];
    const { field: masterFieldName, order: masterOrder } = masterField;
    const { field: detailFieldName, order: detailOrder } = detailField;
    if (masterOrder !== detailOrder) {
      throw Error(`order is different between ${masterFieldName} and ${detailFieldName}`);
    }
    const asc = masterOrder === 'ASC';
    const tmp = checkEqual(masterItem[masterFieldName], detailItem[detailFieldName], asc);
    if (tmp !== 0) {
      if (asc) {
        ret = tmp;
      } else {
        ret = -tmp;
      }
      break;
    }
    break;
  }
  return ret;
}

module.exports = { Compare, Sort };
