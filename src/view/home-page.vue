<template>
    <Card :style="{height:contentHeight}" class="home-page">
        <div class="home-page-message">
            {{helloMessage}}
        </div>
    </Card>
</template>
<script>
export default {
  name: 'home_page',
  props: {
    contentHeight: {
      type: String,
      default: '800px'
    }
  },
  data () {
    return {
      helloMessage: ''
    }
  },
  methods: {
    hello () {
      let hello = ''
      const hour = new Date().getHours()
      if (hour < 6) hello = '凌晨好，欢迎来到小行星'
      else if (hour < 9) hello = '早上好，欢迎来到小行星'
      else if (hour < 12) hello = '上午好，欢迎来到小行星'
      else if (hour < 14) hello = '中午好，欢迎来到小行星'
      else if (hour < 17) hello = '下午好，欢迎来到小行星'
      else if (hour < 19) hello = '傍晚好，欢迎来到小行星'
      else if (hour < 22) hello = '晚上好，欢迎来到小行星'
      else { hello = '夜深了，注意休息' }
      this.helloMessage = hello
    }
  },
  created () {
    this.hello()
  },
  activated () {
    this.hello()
  }
}
</script>
<style lang="less">
.home-page{
  display:flex;
  align-items:center;
  justify-content:center;
  background: #FAFCFF;
  // 自定义一个透明度从0到1的动画，它的名称是fade-in
  @keyframes fade-in{
      0%{ opacity: 0;}
      100%{opacity:1;}
  }
  @-webkit-keyframes fade-in{
      0%{ opacity: 0;}
      100%{opacity:1;}
  }
  @-ms-keyframes fade-in{
      0%{ opacity: 0;}
      100%{opacity:1;}
  }
  @-o-keyframes fade-in{
      0%{ opacity: 0;}
      100%{opacity:1;}
  }
  @-moz-keyframes fade-in{
      0%{ opacity: 0;}
      100%{opacity:1;}
  }
  .home-page-message{
      font-size: 26px;
      // 下面这段是控制淡入淡出的
      opacity: 0;
      // 调用名称为fade-in的动画，全程动画显示时间3S，进入方式为ease，延时0S进入，播放次数1次
      animation: fade-in 3s ease 0s 1;
      -webkit-animation: fade-in 3s ease 0s 1;
      -moz-animation: fade-in 3s ease 0s 1;
      -o-animation: fade-in 3s ease 0s 1;
      -ms-animation: fade-in 3s ease 0s 1;

      // 规定动画的最后状态为结束状态
      animation-fill-mode:forwards;
      -webkit-animation-fill-mode: forwards;
      -o-animation-fill-mode: forwards;
      -ms-animation-fill-mode: forwards;
      -moz-animation-fill-mode: forwards;
  }
}
</style>
