# record-comparison

> 这是一个可以同时用于NodeJS服务器端和浏览器端的辅助工具，可以帮你快速比对两个以上的数组，并让你在比对成功时做一些事情。
>
> 作者：Janden Ma
>
> 开源许可证：MIT



### [English Documentation（英文文档）](https://github.com/JandenMa/RecordComparison/blob/master/README.md)



### 写在前面的话

如果你使用这个工具来比对数组，你需要指定其中一个数组为主数组，那其他就将作为次数组。

当你调用`compare()`方法的时候，内部会创建一个主指针指向主数组第一个位置，一个次指针指向正在比对的次数组的第一个位置。

当主数组单项和次数组单项完成比对，你需要调用`detailMoveNext()`将次指针指向下一个次数组单项，为下一次比对做准备。

当主数组单项和次数组单项无法比对，你需要调用`masterMoveNext()`将主指针指向下一个主数组单项，为下一次比对做准备。



### 安装

- npm

  ```bash
  npm install record-comparison -S
  ```

- yarn

  ```bash
  yarn add record-comparison --save
  ```



### 快速上手示例

- 单一比对（一对一）

  ```javascript
  // 如果是NodeJS服务端使用
  const RecordComparison = require("record-comparison");
  // 如果是浏览器端使用
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

- 多项比对（一对多）

  ```javascript
  // 如果是NodeJS服务端使用
  const RecordComparison = require("record-comparison");
  // 如果是浏览器端使用
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



### 参数、属性及方法说明

- 导入npm包

  ```javascript
  import RecordComparison from 'record-comparison'
  // 或者
  const RecordComparison = require('record-comparison')
  ```

- 实例化类

  ```javascript
  const rc = new RecordComparison(masterArray, detailArray);
  ```

  参数说明：

  - masterArray：
    - 主数组，将作为比对时被操作的对象
    - 类型： `Array<object>`
  - detailArray：
    - 次数组，在比对时作为参考项
    - 类型：
      - 单一比对： `Array<object>`
      - 多项比对： `Array<Array<object>>`

- 类的属性及方法

  - master

    - 用于获取主数组
    - 类型： `Array<object>`

  - details

    - 用于获取次数组

    - 类型:

    - - 单一比对： `Array<object>`
      - 多项比对： `Array<Array<object>>`

  - currentRow

    - 获取当前主数组指针所在项
    - 类型： `object`

  - detailRow

    - 获取当前次数组指针所在项，如果是多项比对，当前次数组指的是正在比对的那个次数组（按`compare()`的参数`index`算）
    - 类型： `object`

  - masterFields

    - 作为主数组排序的字段集合，字段应该包含在主数组的项中，而且你需要手动设置它
    - 类型： `Array<{ field: string, order?: 'ASC' | 'DESC' }> | null`
    - `field`是字段名
    - `order`是排序规则, 默认`'ASC'`表示升序，必须大写

  - detailFields

    - 用于单一比对，作为次数组排序的字段集合，字段应该包含在次数组的项中，而且你需要手动设置它
    - 类型： `Array<{ field: string, order?: 'ASC' | 'DESC' }> | null`
    - `field`是字段名
    - `order`是排序规则, 默认`'ASC'`表示升序，必须大写

  - detailFieldsArr

    - 用于多项比对，作为次数组排序的字段集合，字段应该包含在次数组的项中，而且你需要手动设置它
    - 类型： `Array<Array<{ field: string; order?: 'ASC' | 'DESC' }>> | null`
    - `field`是字段名
    - `order`是排序规则, 默认`'ASC'`表示升序，必须大写

  - masterEof

    - 如果书签（book mark）大于主数组的长度，将返回`false`，则所有比对结束
    - 类型: `boolean`

  - isSorted

    - 如果你已经在外部函数完成数组排序，你需要将它设置为true来减少内部计算以确保性能

  - compare(index?: number)

    - 比对的核心方法
    - 类型： `Function`
    - 参数：
      - index: `number`, 作为多项比对的次数组指定索引, 默认为`0`
    - 返回值：`true`表示比对成功, 否则为`false`

  - getMasterBookMark()

    - 获取主数组当前书签（book mark），即主指针所在位置（从0开始）
    - 返回值: `number`

  - getDetailBookMark()

    - 获取次数组当前书签（book mark），即次指针所在位置（从0开始）
    - 返回值: `number`

  - masterMoveNext()

    - 当主数组单项和次数组单项无法比对，你需要调用此方法将主指针指向下一个主数组单项，为下一次比对做准备。

  - detailMoveNext()

  - - 当主数组单项和次数组单项完成比对，你需要调用此方法将次指针指向下一个次数组单项，为下一次比对做准备。