# record-comparison

> A javascript tool to compare array quickly and you can do something when matching, for browsers and NodeJS servers
>
> Via _Janden Ma_
>
> MIT LICENCE



<!--You have to install the package which version is after v0.3.0-->



[中文文档（Simplified Chinese）](https://github.com/JandenMa/RecordComparison/blob/master/README_zh.md)



### Version Change Logs

- **Build20191004:** First beta version published.
- **Build20191010:** Bug fixes. (v0.1.5)
- **Build20200110:** Resolved issue on inner sorting logics. (v0.2.2)
- **Build20200119:** (v0.3.0)
  - Resolved the sorting issue when you never set the order parameter.
  - Added judgement to stop sorting when it has been sorted, to improve performances.
- **Build20200416:** Skip comparing if master or detail is null, undefined or empty array. (v0.3.2)



### First of all

If you use this tool to compare arrays, you need to specify one of those as the master array, so others are detail array(s). 

When you call `compare()` function, this tool will generate a master pointer for master array and detail pointer for detail array. 

If master item and detail item have finished matching, you need to call `detailMoveNext()`  to move detail pointer to next detail item for next comparison.

If master item and detail item can't matched, you need to call `masterMoveNext()`  to move master pointer to next master item for next comparison.



### Installation

- npm

  ```bash
  npm install record-comparison -S 
  ```

- yarn

  ```bash
  yarn add record-comparison --save
  ```



### Quick Example

- Single comparison 

  ```javascript
  // if NodeJS server
  const RecordComparison = require("record-comparison");
  // if browsers
  // import RecordComparison from "record-comparison";
  
  const rc = new RecordComparison(
    [
      { name: "Lucy", age: 28, amount: 10 },
      { name: "Yuki", age: 20, amount: 20 },
      { name: "Tommy", age: 26, amount: 30 },
      { name: "Ben", age: 29, amount: 40 }
    ],
    [
      { name: "Tommy", age: 28, amount: 109 },
      { name: "Joey", age: 23, amount: 200 },
      { name: "Lucy", age: 27, amount: 101 },
      { name: "Andy", age: 30, amount: 38 },
      { name: "Yuki", age: 22, amount: 59 },
      { name: "Ben", age: 29, amount: 8 }
    ]
  );
  
  rc.masterFields = [{ field: "name", order: "DESC" }];
  rc.detailFields = [{ field: "name", order: "DESC" }];
  
  while (rc.masterEof) {
    while (rc.compare()) {
      rc.currentRow["amount"] = rc.currentRow["amount"] + rc.detailRow["amount"];
      rc.detailMoveNext();
    }
    rc.masterMoveNext();
  }
  
  console.log(rc.master);
  /**
  [
      { name: "Ben", age: 29, amount: 48 },
      { name: "Lucy", age: 28, amount: 111 },
      { name: "Tommy", age: 26, amount: 139 },
      { name: "Yuki", age: 20, amount: 79 },
  ]
  **/
  ```

- Multiple comparison

  ```javascript
  // if NodeJS server
  const RecordComparison = require("record-comparison");
  // if browsers
  // import RecordComparison from "record-comparison";
  
  const rc = new RecordComparison(
    [
      { name: "Lucy", age: 28, amount: 10 },
      { name: "Yuki", age: 20, amount: 20 },
      { name: "Tommy", age: 26, amount: 30 },
      { name: "Ben", age: 29, amount: 40 }
    ],
    [
      [
      	{ name: "Tommy", age: 28, amount: 109 },
      	{ name: "Joey", age: 23, amount: 200 },
      	{ name: "Lucy", age: 27, amount: 101 },
      	{ name: "Andy", age: 30, amount: 38 },
      	{ name: "Yuki", age: 22, amount: 59 },
      	{ name: "Ben", age: 29, amount: 8 }
      ],
      [
      	{ name: "Joey", age: 23, amount: 30 },
      	{ name: "Yuki", age: 22, amount: 12 },
      	{ name: "Lucy", age: 27, amount: 20 },
      ]
    ]
  );
  
  rc.masterFields = [{ field: "name", order: "DESC" }];
  rc.detailFieldsArr = [
    [{ field: "name", order: "DESC" }],
    [{ field: "name", order: "DESC" }]
  ];
  
  while (rc.masterEof) {
    while (rc.compare(0)) {
      rc.currentRow["amount"] = rc.currentRow["amount"] + rc.detailRow["amount"];
      rc.detailMoveNext();
    }
    while (rc.compare(1)) {
      rc.currentRow["amount"] = rc.currentRow["amount"] - rc.detailRow["amount"];
      rc.detailMoveNext();
    }
    rc.masterMoveNext();
  }
  
  console.log(rc.master);
  /**
  [
      { name: "Ben", age: 29, amount: 48 },
      { name: "Lucy", age: 28, amount: 91 },
      { name: "Tommy", age: 26, amount: 139 },
      { name: "Yuki", age: 20, amount: 59 },
  ]
  **/
  ```



### Usage

1. Import library package

   ```javascript
   import RecordComparison from 'record-comparison'
   // or
   const RecordComparison = require('record-comparison')
   ```

2. Instantiate `RecordComparison`

   ```javascript
   const rc = new RecordComparison(masterArray, detailArray); 
   ```

   - masterArray:
     - The master array, which will be operated when comparing
     - Type: `Array<object>`
   - detailArray:
     - The detail array, as references when comparing
     - Type: 
       - Single comparison: `Array<object>`
       - Multiple comparison: `Array<Array<object>>`

3. API

   - master
     - get the master array
     - Type: `Array<object>`
   - details
     - get the detail array
     - Type: 
       - Single comparison: `Array<object>`
       - Multiple comparison: `Array<Array<object>>`
   - currentRow
     - get the current item in master array
     - Type: `object`
   - detailRow
     - get the current item in detail array, if multiple comparison, will return that one which is comparing (according to the `index` parameter in `compare()`)
     - Type: `object`
   - masterFields
     - the sort fields for master array, should be included in the item of master array, you need to set it
     - Type: `Array<{ field: string, order?: 'ASC' | 'DESC' }> | null`
     - `field` is the field name
     - `order` is the ordering rule, default  `'ASC'` for `ascending` 
   - detailFields
     - the sort fields for detail array, should be included in the item of detail array, you need to set it for single comparison
     - Type: `Array<{ field: string, order?: 'ASC' | 'DESC' }> | null`
     - `field` is the field name
     - `order` is the ordering rule, default  `'ASC'` for `ascending` 
   - detailFieldsArr
     - the sort fields for detail arrays, should be included in the item of detail arrays, you need to set it for multiple comparison
     - Type: `Array<Array<{ field: string; order?: 'ASC' | 'DESC' }>> | null`
     - `field` is the field name
     - `order` is the ordering rule, default  `'ASC'` for `ascending` 
   - masterEof
     - if book mark is greater than the length of master array, return `false` that means finish comparing
     - Type: `boolean` 
   - isSorted
     - if you have sorted arrays in outer function, you should set it `true` to ensure the performance
   - compare(index?: number)
     - the core function for comparison
     - Type: `Function`
     - Parameter:
       - index: `number`, for multiple comparison, default `0`
     - Returns
       - `True` for matching, or `False` 
   - getMasterBookMark()
     - get the current book mark for master array, that means the index of the master pointer right now (start from `0`).
     - Returns: `number`
   - getDetailBookMark()
     - get the current book mark for detail array, that means the index of the detail pointer right now (start from `0`).
     - Returns: `number`
   - masterMoveNext()
     - if master item and detail item can't be matched, you need to move master pointer to next item
   - detailMoveNext()
     - if master item and detail item have finished matching, you need to move detail pointer to next item for next comparison

