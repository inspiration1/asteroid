<template>
<div>
    <Row :gutter="8">
        <Col span="12">
            <Card>
                <funnel></funnel>
            </Card>
        </Col>
        <Col span="12">
            <Card dis-hover>
                <viser-funnel></viser-funnel>
            </Card>
        </Col>
    </Row>
    <p>G2官网：<a href="http://antv.alipay.com/zh-cn/g2/3.x/index.html" target="_blank">http://antv.alipay.com/zh-cn/g2/3.x/index.html</a></p>
    <p>遇到的问题及解决方案：<a href="https://segmentfault.com/a/1190000018567839" target="_blank">https://segmentfault.com/a/1190000018567839</a></p>
</div>
</template>
<script>
import Funnel from './components/funnel'
import ViserFunnel from './viser-vue/viser-funnel'
export default {
  name: 'g2_chart_page',
  components: { Funnel, ViserFunnel }
}
</script>
