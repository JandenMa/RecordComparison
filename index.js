module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i,o,u=r(1),a=u.VerifyArguments,f=u.VerifyArguments2,s=r(2),l=s.Sort,c=s.Compare;t.exports=(i=0,o=0,function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i=0,o=0,this.master=e,this.details=r,this.currentRow={},this.detailRow={},this.masterFields=[],this.detailFields=[],this.detailFieldsArr=[],this.masterEof=i<e.length,this.isSorted=!1}return n(t,[{key:"compare",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=!Object.prototype.hasOwnProperty.call(this.details[0],"length");return!(o>=(e?this.details.length:this.details[t].length))&&!(e?!a(this.master,this.details):!f(this.master,this.details))&&(this.isSorted||(this.master=l(this.master,this.masterFields),e?this.details=l(this.details,this.detailFields):this.details[t]=l(this.details[t],this.detailFieldsArr[t])),this.currentRow=this.master[i],this.detailRow=e?this.details[o]:this.details[t][o],c(this.currentRow,this.detailRow,this.masterFields,e?this.detailFields:this.detailFieldsArr[t]))}},{key:"getMasterBookMark",value:function(){return i}},{key:"getDetailBookMark",value:function(){return o}},{key:"masterMoveNext",value:function(){i+=1,this.masterEof=i<this.master.length}},{key:"detailMoveNext",value:function(){o+=1}}]),t}())},function(t,e,r){"use strict";var n=function(t){return!!function(t){return t.constructor===Array}(t)&&Object.prototype.hasOwnProperty.call(t,"length")},i=function(t){return!!n(t)&&t.filter((function(t){return function(t){return t.constructor===Object}(t)})).length===t.length};t.exports={VerifyArguments:function(t,e){if(!i(t))throw new Error('"masterArray" is invalid');if(!i(e))throw new Error('"detailArray" is invalid');return!0},VerifyArguments2:function(t,e){if(!i(t))throw new Error('"masterArray" is invalid');if(!n(e))throw new Error('"detailArray" is invalid');return e.forEach((function(t){if(!i(t))throw new Error('"detailArray" is invalid')})),!0}}},function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(3).checkEqual;t.exports={Compare:function(t,e,r,n){for(var o=!0,u=0,a=r.length;u<a;u++){var f=r[u],s=n[u],l=f.field,c=s.field;if(!i(t[l],e[c])){o=!1;break}break}return o},Sort:function(t,e){return t.sort((function(t,r){return function(t,e,r){var i=[],o=!0;if(0===r.length)i.push(0);else for(var u=0,a=r.length;u<a;u++){var f=r[u],s=f.field,l=f.order;o="ASC"===(void 0===l?"ASC":l);var c=t[s],d=e[s];if((void 0===c?"undefined":n(c))!==(void 0===d?"undefined":n(d))){i.push(0);break}if("number"==typeof c){i.push(o?1:-1);break}if("string"==typeof c){var p=c.toUpperCase(),h=d.toUpperCase();if(p<h){i.push(o?-1:1);break}if(p>h){i.push(o?1:-1);break}i.push(0);break}i.push(0);break}for(var y=0,b=i.length;y<b;y++)if(1===i[y]||-1===i[y])return i[y]}(t,r,e)}))}}},function(t,e){t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=e.checkEqual=function(t,e){if(!t||!e)return t===e;if((void 0===t?"undefined":n(t))!==(void 0===e?"undefined":n(e)))return!1;if("object"===(void 0===t?"undefined":n(t))){var r=!0,i=!0;return t.hasOwnProperty("length")||(r=!1),e.hasOwnProperty("length")||(i=!1),r===i&&(r&&i?o(t,e):u(t,e))}return t===e},o=function(t,e){if(t.length!==e.length)return!1;var r=!0;a(t),a(e);for(var n=0,o=t.length;n<o;n++)if(!i(t[n],e[n])){r=!1;break}return r},u=function(t,e){var r=Object.keys(t),n=Object.keys(e);if(r.length!==n.length)return!1;var o=!0;return r.forEach((function(r){i(t[r],e[r])||(o=!1)})),o},a=function(t){t.sort((function(t,e){if((void 0===t?"undefined":n(t))!==(void 0===e?"undefined":n(e)))return 0;if("number"==typeof t)return t-e;if("string"==typeof t){var r=t.toUpperCase(),i=e.toUpperCase();return r<i?-1:r>i?1:0}return 0}))}}])}]);