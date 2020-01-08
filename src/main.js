// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import Viser from 'viser-vue'

import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Viser)
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/**
 * 全局过滤器
 */
Vue.filter('timeFormat', (value, format) => {
  Date.prototype.format = function (fmt) {
      let o = {
          'M+': this.getMonth() + 1,                 //月份
          'd+': this.getDate(),                    //日
          'h+': this.getHours(),                   //小时
          'm+': this.getMinutes(),                 //分
          's+': this.getSeconds(),                 //秒
          'q+': Math.floor((this.getMonth() + 3) / 3), //季度
          'S': this.getMilliseconds()             //毫秒
      }
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() +
              '').substr(4 -
              RegExp.$1.length))
      }
      for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                  ? (o[k])
                  : (('00' + o[k]).substr(('' + o[k]).length)))
          }
      }
      return fmt
  }
  
  let timeFormat = 'yyyy-MM-dd';
  switch (format) {
      case 'Time':
          timeFormat = 'hh:mm:ss';
          break;
      case 'DateTime':
          timeFormat = 'yyyy-MM-dd hh:mm:ss';
          break;
      case 'TimeHM':
          timeFormat = 'hh:mm';
          break;
      case 'DateTimeHM':
          timeFormat = 'yyyy-MM-dd hh:mm';
          break;
      case 'DateMD':
          timeFormat = 'MM-dd';
          break;
  }
  if (value instanceof Date) {
      return value.format(timeFormat);
  }
  let temp = '';
  if (/^\d+$/.test(value + '')) {
      temp = new Date(parseInt(value)).format(timeFormat);
  } else if (/^\d+$/.test(Date.parse(value) + '')) {
      temp = new Date(Date.parse(value)).format(timeFormat);
  }
  return temp;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
