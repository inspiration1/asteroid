<template>
  <div>
    <tinymce-editor></tinymce-editor>
    <p>tinymce官网：<a href="https://www.tiny.cloud" target="_blank">https://www.tiny.cloud/</a></p>
    <p>遇到的问题及解决方案：<a href="https://segmentfault.com/a/1190000018358304" target="_blank">https://segmentfault.com/a/1190000018358304</a></p>
  </div>
</template>
<script>
import TinymceEditor from '_c/tinymce-editor/tinymce-editor'
export default {
  name: 'tinymce_page',
  components: { TinymceEditor },
  data () {
    return {

    }
  }
}
</script>
