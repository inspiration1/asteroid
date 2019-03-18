
<template>
  <div id='calendar'></div>
</template>

<script>
import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'

export default {
  name: 'Fullcalendar',
  data () {
    return {

    }
  },
  methods: {
    /* 初始化日历插件fullcalendar */
    calendarInit () {
      $('#calendar').fullCalendar({
        defaultView: 'month',
        locale: 'zh-cn', // 设置语言为中文
        timezone: 'local',
        header: {
          left: '',
          center: 'prev title next',
          right: 'newButton'
        },
        views: { // 设置不同视图中标题日期显示格式等
          month: {
            titleFormat: 'YYYY年M月',
            displayEventTime: false // allDay等于false是可以用来设置不显示时间
          },
          listWeek: {
            titleFormat: 'YYYY-M-D',
            noEventsMessage: '没有任务' // 没有任务时显示的提示
            // columnFormat:"M.D dddd",
            // allDaySlot:false,   //是否显示all-day行
          },
          day: {
            titleFormat: 'YYYY-M-D dddd'
            // columnFormat:"M/D dddd"
          }
        },
        // eventLimit: true,    //是否限制每天日程显示个数
        events: [],
        timeFormat: 'HH:mm', // 设置的是添加的日程上显示的时间
        customButtons: {
          newButton: {
            text: '新建任务',
            click: function () {

            }
          }
        },
        dayClick: function (date, allDay, jsEvent, view) {

        },
        eventClick: function (event, jsEvent, view) {

        }
      })
    }

  },
  created () {

  },
  mounted () {
    this.calendarInit()
  },
  watch: {

  }
}
</script>

<style lang="less">

</style>
