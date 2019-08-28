/*
2019年8月28日   更新自动判断中英文字节。自适应长度完美了~

* author: 操健
* */

import download from 'downloadjs'
import XLSX from 'xlsx'

// 导出表格2（依赖XLSX插件）
export function table2Excel (refData, filename) {
  const jsonArr = []
  refData.forEach((item, index) => {
    const columns = item.data.columns
    const dataSource = item.data.dataSource
    const resArr = []
    dataSource.forEach((item, index) => {
      const obj = {}
      columns.forEach((colItem, idx) => {
        // !colItem.notExport // 第一版是添加notEexport属性来排除不导出的数据
        if (!(item[colItem.dataIndex] === undefined)) { // 第二版
          obj[colItem['title']] = item[colItem.dataIndex]
          if (colItem.customRender) {
            obj[colItem['title']] = colItem.customRender(item[colItem.dataIndex])
          }
        }
      })
      resArr.push(obj)
    })
    jsonArr.push({ sheetName: item.sheetName, data: resArr })
  })
  downloadExl(jsonArr)
  var tmpDown // 导出的二进制对象
  function downloadExl (jsonArr, type) {
    var tmpdata = jsonArr[0].data[0]
    var tmpWB = {
      SheetNames: [],
      Sheets: {}
    }
    jsonArr.forEach((json, index) => {
      json.data.unshift({})
      var keyMap = [] // 获取keys
      // keyMap =Object.keys(json[0]);
      for (var k in tmpdata) {
        keyMap.push(k)
        json.data[0][k] = k
      }
      var tmpdata1 = []// 用来保存转换好的json
      json.data.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        // eslint-disable-next-line no-return-assign
      }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata1[v.position] = {
        v: v.v
      })

      // 处理每列的宽度
      const wscols = []
      const newArr = {}
      for (const key in json.data[0]) {
        newArr[key] = ''
      }
      Object.keys(newArr).forEach((value) => {
        newArr[value] = [...json.data].sort(lengthSort(value))[0][value]
        wscols.push({
          wch: getStrFullLength(newArr[value]) + 2
        })
      })

      var outputPos = Object.keys(tmpdata1) // 设置区域,比如表格从A1到D10
      tmpWB.SheetNames.push(json.sheetName)
      tmpWB.Sheets[json.sheetName] = Object.assign({},
        tmpdata1, // 内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], // 设置填充区域js-xlsx导出表格width不是自适应
          '!cols': wscols
        })
    })
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
      { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }// 这里的数据是用来定义导出的格式类型
    ))], {
      type: ''
    }) // 创建二进制对象写入转换好的字节流
    // return
    download(tmpDown, ((filename || '数据表') + '.xls'))
  }

  function lengthSort (name) {
    return function (a, b) {
      if (a[name].length > b[name].length) {
        return -1
      } else {
        return 1
      }
    }
  }
  // 获取中英文数字的实际字节大小
  function getStrFullLength (str) {
    return str.split('').reduce((pre, cur) => {
      const charCode = cur.charCodeAt(0)
      if (charCode >= 0 && charCode <= 128) {
        return pre + 1
      }
      return pre + 2
    }, 0)
  }

  function s2ab (s) { // 字符串转字符流
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  function getCharCol (n) {
    let s = ''
    let m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  }
}
