<template>
  <div>
    <tinymce-editor></tinymce-editor>
    <p>tinymce官网：<a href="https://www.tiny.cloud" target="_blank">https://www.tiny.cloud/</a></p>
    <p>参考链接：<a href="https://www.cnblogs.com/wisewrong/archive/2018/05/03/8985471.html" target="_blank">https://www.cnblogs.com/wisewrong/archive/2018/05/03/8985471.html</a></p>
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
