<template>
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
</template>
<script>
import Funnel from './components/funnel'
import ViserFunnel from './viser-vue/viser-funnel'
export default {
  name: 'g2_chart_page',
  components: { Funnel, ViserFunnel }
}
</script>
