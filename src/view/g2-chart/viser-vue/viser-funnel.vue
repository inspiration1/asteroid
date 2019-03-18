<template>
  <div>
    <v-chart
      :force-fit="true"
      :height="height"
      :padding="[ 20, 120, 95 ]"
      :data="data"
      :scale="scale">
      <v-tooltip :show-title="false" :item-tpl="tooltipOpts.itemTpl" />
      <v-legend />
      <v-coord type="rect" direction="LT" />
      <v-funnel
        :position="funnelOpts.position"
        :color="funnelOpts.color"
        :label="funnelOpts.label"
        :tooltip="funnelOpts.tooltip"
        :on-click="handleChartClick"
      />
      <v-guide v-for="(obj, index) in data"
        :key="index"
        type="text"
        :top="true"
        :position="getPosition(obj)"
        :content="getContent(obj)"
        :vStyle="{
          fill: '#fff',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }"
      />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 }
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'pv',
  dimension: 'action',
  as: 'percent'
})
const data = dv.rows

const scale = {
  dataKey: 'percent',
  nice: false
}

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
      '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
      '{name}<br/>' +
      '<span style="padding-left: 16px">浏览人数：{pv}</span><br/>' +
      '<span style="padding-left: 16px">占比：{percent}</span><br/>' +
      '</li>'
}

const funnelOpts = {
  position: 'action*percent',
  color: ['action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']],
  label: ['action*pv', (action, pv) => {
    return action + ' ' + pv
  }, {
    offset: 35,
    labelLine: {
      lineWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.15)'
    }
  }],
  tooltip: ['action*pv*percent', (action, pv, percent) => ({
    name: action,
    percent: Math.floor(percent * 100) + '%',
    pv: pv
  })]
}

export default {
  name: 'ViserFunnel',
  methods: {
    getPosition: (obj) => {
      return {
        action: obj.action,
        percent: 'median'
      }
    },
    getContent: (obj) => {
      return parseInt(String(obj.percent * 100)) + '%'
    },
    handleChartClick (ev, chart) {
      console.log(ev)
      console.log(chart)
      if (ev.data) {
        alert(ev.data._origin['action'])
      }
    }
    // handleLegendClick (ev, chart) {
    //   console.log(ev)
    //   console.log(chart)
    //   alert('click legend' + ev.item.value)
    // }
  },
  data () {
    return {
      data,
      scale,
      height: 400,
      tooltipOpts,
      funnelOpts
    }
  }
}
</script>
