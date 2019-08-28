# AJ-components
some vue components

一些vue组件


Toast组件需要在main.js里挂载:
import Toast from './components/toast'
Vue.prototype.$Toast=new Toast();

ant design pro vue使用导出表格功能：
1、直接引入table2excel.js
2、table2Excel([{ sheetName: '测试', data: this.$refs.exportTable }], '会员列表')
tips：可以导出多sheet，传入多数组就可以了（此插件依赖js-xlsx和downloadjs）
