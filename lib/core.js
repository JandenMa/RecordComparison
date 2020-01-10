const { VerifyArguments, VerifyArguments2 } = require('./verify');
const { Sort, Compare } = require('./op');

function core() {
  let masterBookMark = 0;
  let detailBookMark = 0;
  class RecordComparison {
    constructor(masterArray, detailArray) {
      masterBookMark = 0;
      detailBookMark = 0;
      this.master = masterArray;
      this.details = detailArray;
      this.currentRow = {};
      this.detailRow = {};
      this.masterFields = [];
      this.detailFields = [];
      this.detailFieldsArr = [];
      this.masterEof = masterBookMark < masterArray.length;
      this.isSorted = false; // if you have sorted arrays in outer function, you should set it true to ensure the performance
    }

    compare(index = 0) {
      const single = !Object.prototype.hasOwnProperty.call(this.details[0], 'length');
      if (detailBookMark >= (single ? this.details.length : this.details[index].length)) {
        return false;
      }
      if (
        single
          ? VerifyArguments(this.master, this.details)
          : VerifyArguments2(this.master, this.details)
      ) {
        if (!this.isSorted) {
          this.master = Sort(this.master, this.masterFields);
          if (single) {
            this.details = Sort(this.details, this.detailFields);
          } else {
            this.details[index] = Sort(this.details[index], this.detailFieldsArr[index]);
          }
        }
        this.currentRow = this.master[masterBookMark];
        this.detailRow = single
          ? this.details[detailBookMark]
          : this.details[index][detailBookMark];
        const res = Compare(
          this.currentRow,
          this.detailRow,
          this.masterFields,
          single ? this.detailFields : this.detailFieldsArr[index]
        );
        if (res === 1) {
          detailBookMark += 1;
          return this.compare(index);
        }
        return res === 0;
      }
      return false;
    }

    getMasterBookMark() {
      return masterBookMark;
    }

    getDetailBookMark() {
      return detailBookMark;
    }

    masterMoveNext() {
      masterBookMark += 1;
      this.masterEof = masterBookMark < this.master.length;
    }

    detailMoveNext() {
      detailBookMark += 1;
    }
  }
  return RecordComparison;
}

module.exports = core();
