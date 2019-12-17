<template>
    <div class="chat-box" :style="{height:contentHeight}">
        <div class="chat-header">
            <div class="chat-header-left">
                <div style="display:inline-block;" class="chat-header-name" id="conversationName">{{conversation.conversationName}}</div>
            </div>
        </div>
        <div id="scroll_loader_container" class="container-main">
            <div v-for="message in messageList" :key="message.id" class="message-block">
                <p class="message-time" v-if="new Date(message.ctime).toDateString()===new Date().toDateString()"> {{message.ctime | timeFormat("TimeHM")}} </p>
                <p class="message-time" v-else> {{message.ctime | timeFormat("DateTime")}} </p>
                <div :class="'message-main' + (message.direction===1?' self':'')">
                    <Avatar :src="message.direction===1?avatorImgPath:conversation.conversationAvatar" size="large"/>
                    <!-- 图片 -->
                    <div v-if="message.messageType==='image'" class="message-img">
                        <img
                            :src="message.attachmentsUrl"
                            class="image"
                            alt="聊天图片">
                    </div>
                    <div v-else class="message-content">
                         <!-- 文本 -->
                        <template v-if="message.messageType==='text'">
                            {{message.content}}
                        </template>
                        <!-- 文件 -->
                        <template v-else-if="message.messageType==='file'">
                            <Icon type="document" size="20"></Icon>
                            <a :href="message.attachmentsUrl">
                                {{message.attachmentName}}
                            </a>
                        </template>
                         <!-- 其他类型 -->
                        <template v-else>
                            暂不支持的消息类型
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-footer">
            <div class="input-box">
                <Input v-model="inputMessage" type="textarea" :rows="3" placeholder="Enter 发送" @keyup.enter.native="sendMessage"/>
                <div class="input-box-footer-left">

                </div>
                <div class="input-box-footer-right">
                    <Button :disabled="!inputMessage" @click="sendMessage" :loading="sendLoading" style="margin-left:10px;">发送</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'ChatBox',
  props: {
    contentHeight: {
      type: String,
      default: '800px'
    },
    messageList: {
      type: Array,
      default () {
        return []
      }
    },
    conversation: {
      type: Object,
      default () {
        return {}
      }
    },
    conversationId: {
      required: true
    }
  },
  data () {
    return {
      inputMessage: '',
      sendLoading: false
    }
  },
  computed: {
    ...mapState({
      avatorImgPath: state => state.user.avatorImgPath
    }),
    bodyHeight () {
      return parseInt(this.contentHeight) - 120
    }
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const div = document.getElementById('scroll_loader_container')
        div.scrollTop = div.scrollHeight
      })
    },
    sendMessage () {
      document.onkeydown = function (e) {
        if (e.keyCode === 13) {
          e.preventDefault()
          return false
        }
      }
      if (!this.sendLoading) {
        if (this.inputMessage.replace(/(^\s*)|(\s*$)/g, '') !== '') {
          this.sendLoading = true
          setTimeout(() => {
            this.messageList.push({
              messageType: 'text',
              content: this.inputMessage,
              id: this.messageList[this.messageList.length - 1].id + 1,
              direction: 1,
              ctime: Date.now()
            })
            this.inputMessage = ''
            this.$emit('handleSendMessage', Date.now())
            this.sendLoading = false
          }, 500)
        } else {
          this.$Message.warning('发送不能为空')
          if (event.keyCode === 13) {
            return false
          }
        }
      }
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    messageList (val) {
      this.scrollToBottom()
      this.inputMessage = ''
      val.forEach(item => {
        if (item.messageType === 'file') {
          const url = decodeURI(item.attachmentsUrl)
          const tempArr = url.split('?')[0].split('/')
          item.attachmentName = tempArr[tempArr.length - 1]
        }
      })
    }
  }
}
</script>
<style lang="less">
@import url('../css/ChatBox.less');
</style>
