<template>
<div>
  <!--
    给editor加key是因为给tinymce keep-alive以后组件切换时tinymce编辑器会显示异常，
    在activated钩子里改变key的值可以让编辑器重新创建
  -->
  <editor id="tinymceEditor" :init="tinymceInit" v-model="content" :key="tinymceFlag"></editor>
  <Upload
      multiple
      ref="imageUpload"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-success="insertImage"
      style="display:none">
  </Upload>
</div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'

export default {
  name: 'TinymceEditor',
  components: {
    editor: Editor
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      tinymceFlag: 1,
      tinymceInit: {},
      content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址'
    }
  },
  methods: {
    // 插入图片至编辑器
    insertImage (res, file) {
      const src = '' // 图片存储地址
      tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
    }
  },
  created () {
    const that = this
    this.tinymceInit = {
      skin_url: `${this.publicPath}tinymce/skins/ui/oxide`,
      content_css: `${this.publicPath}tinymce/skins/content/default`,
      language_url: `${this.publicPath}tinymce/langs/zh_CN.js`,
      language: 'zh_CN',
      height: document.body.offsetHeight - 300,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: false, // 隐藏最上方menu
      plugins: 'advlist table lists paste preview fullscreen',
      toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
      /**
       * 下面方法是为tinymce添加自定义插入图片按钮
       * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
       */
      setup: (editor) => {
        editor.ui.registry.addButton('imageUpload', {
          // text: '插入图片',
          tooltip: '插入图片',
          icon: 'image',
          onAction: () => {
            const upload = that.$refs.imageUpload
            upload.handleClick()
          }
        })
      }
    }
  },
  activated () {
    this.tinymceFlag++
  },
  mounted () {

  }
}
</script>
