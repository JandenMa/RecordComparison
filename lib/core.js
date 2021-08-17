const { VerifyArguments, VerifyArguments2, IsArray } = require('./verify');
const { Sort, Compare } = require('./op');

function core() {
  let masterBookMark = 0;
  let detailBookMarks = [0];
  class RecordComparison {
    constructor(masterArray, detailArray) {
      this.single = !Object.prototype.hasOwnProperty.call(
        detailArray && detailArray.length > 0 ? detailArray[0] : {}, 'length'
      );
      masterBookMark = 0;
      detailBookMarks = this.single ? [0] : detailArray.map(() => 0);
      this.master = masterArray || [];
      this.details = detailArray || [];
      this.currentRow = {};
      this.detailRow = {};
      this.masterFields = [];
      this.detailFields = [];
      this.detailFieldsArr = [];
      this.masterEof = masterBookMark < masterArray.length;
      this.isSorted = false; // if you have sorted arrays in outer function, you should set it true to ensure the performance
    }


    compare(index = 0) {
      if (!this.master || !this.details || !IsArray(this.master) || !IsArray(this.details)) {
        return false;
      }
      if (this.master.length === 0 || this.details.length === 0) {
        return false;
      }
      if (detailBookMarks[index] >= (
        this.single ? this.details.length : this.details[index].length)
      ) {
        return false;
      }
      if (
        this.single
          ? VerifyArguments(this.master, this.details)
          : VerifyArguments2(this.master, this.details)
      ) {
        if (!this.isSorted) {
          // don't need to sort again if it has been sorted
          this.master = Sort(this.master, this.masterFields);
          if (this.single) {
            this.details = Sort(this.details, this.detailFields);
          } else {
            this.details[index] = Sort(this.details[index], this.detailFieldsArr[index]);
          }
        }
        this.currentRow = this.master[masterBookMark];
        this.detailRow = this.single
          ? this.details[detailBookMarks[index]]
          : this.details[index][detailBookMarks[index]];
        const res = Compare(
          this.currentRow,
          this.detailRow,
          this.masterFields,
          this.single ? this.detailFields : this.detailFieldsArr[index]
        );
        if (res === 1) {
          detailBookMarks[index] += 1;
          return this.compare(index);
        }
        return res === 0;
      }
      return false;
    }

    getMasterBookMark() {
      return masterBookMark;
    }

    getDetailBookMark(index = 0) {
      return detailBookMarks[index];
    }

    masterMoveNext() {
      masterBookMark += 1;
      this.masterEof = masterBookMark < this.master.length;
    }

    detailMoveNext(index = 0) {
      detailBookMarks[index] += 1;
    }
  }
  return RecordComparison;
}

module.exports = core();
