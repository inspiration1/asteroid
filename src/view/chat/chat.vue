<template>
    <Card class="chat">
        <Row>
            <Col span="7" :style="{height:contentHeight}">
                <div class="chat-toolbar">
                    <Input v-model="searchInput" placeholder="输入关键字搜索" @keyup.enter.native="handleSearch">
                        <Icon slot="append" type="ios-search" size="18" style="margin-left:4px;cursor:pointer;" @click.native="handleSearch" />
                    </Input>
                </div>
                <Menu
                    ref="conversationMenu"
                    :active-name="currentConversationId"
                    width=auto
                    @on-select="handleConversationSelect">
                    <Spin fix v-if="conversationLoading"></Spin>
                    <Scroll :on-reach-bottom="handleLoadConversation" :distance-to-edge="10" :height="scrollHeight">
                        <MenuItem v-for="conversation in conversationList" :name="conversation.conversationId" :key="conversation.conversationId">
                            <Avatar :src="conversation.conversationAvatar" size="large"/>
                            <span class="conversation-name">{{conversation.conversationName}}</span>
                            <Badge :count="conversation.unreadCount"></Badge>
                            <span v-if="new Date(conversation.updateTime).toDateString()===new Date().toDateString()" class="conversation-time">{{conversation.updateTime | timeFormat("TimeHM")}}</span>
                            <span v-else class="conversation-time">{{conversation.updateTime | timeFormat("DateMD")}}</span>
                        </MenuItem>
                    </Scroll>
                </Menu>
            </Col>
            <Col span="17" :style="{height:contentHeight,border:'none'}">
                <Spin fix v-if="chatLoading"></Spin>
                <chat-box
                    :content-height="contentHeight"
                    :message-list="messageList"
                    :conversation-id="currentConversationId"
                    :conversation="currentConversation"
                    @handleSendMessage="handleSendMessage">
                </chat-box>
            </Col>
        </Row>
    </Card>
</template>
<script>
import ChatBox from './components/ChatBox'
export default {
  name: 'chat_page',
  props: {
    contentHeight: {
      type: String,
      default: '800px'
    }
  },
  components: { ChatBox },
  data () {
    return {
      searchInput: '',

      // 会话数据
      chatShow: false,
      conversationLoading: false,
      conversationList: [],
      conversationListAll: [],
      currentConversation: {},
      currentConversationId: '',
      currentConversationIndex: -1,
      letChatLoading: false,
      chatLoading: true,
      messageList: []
    }
  },
  computed: {
    scrollHeight () {
      return parseInt(this.contentHeight) - 53
    }
  },
  methods: {
    // 获取会话列表
    getConversations () {
      this.conversationLoading = true
      setTimeout(() => {
        this.conversationList = [
          {
            conversationId: 0,
            conversationAvatar: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=19137b054936acaf4ded9eae1db0e675/0824ab18972bd407e706ebc179899e510eb309cc.jpg',
            conversationName: 'Jack Ma',
            conversationStatus: 1,
            unreadCount: 1,
            updateTime: 1551670287000
          },
          {
            conversationId: 1,
            conversationAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550911704510&di=36c07e4989be9ce3c869a9ae7215ae94&imgtype=0&src=http%3A%2F%2Fimg.hexun.com%2F2010-07-26%2F124367816.jpg',
            conversationName: 'Pony Ma',
            conversationStatus: 1,
            unreadCount: 1,
            updateTime: 1551670287000
          },
          {
            conversationId: 2,
            conversationAvatar: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=f9b42032db43ad4bb2234e92e36b31ca/4bed2e738bd4b31ca786492c8dd6277f9f2ff8eb.jpg',
            conversationName: 'Bill Gates',
            conversationStatus: 1,
            unreadCount: 1,
            updateTime: 1551670287000
          }
        ]
        this.conversationListAll = this.conversationList.concat()
        this.conversationLoading = false
        this.handleConversationSelect(0)
        this.$nextTick(() => {
          this.$refs.conversationMenu.updateActiveName()
        })
      }, 300)
    },
    // 会话列表滚动加载下一页
    handleLoadConversation () {
      this.conversationPage += 1
      return this.getConversations()
    },
    // 选中会话
    handleConversationSelect (name) {
      this.currentConversationId = name
      this.getChatMessages(name)
      this.conversationList.forEach((item, index) => {
        if (item.conversationId === name) {
          this.currentConversation = item
          this.currentConversationIndex = index
          item.unreadCount = 0
          // this.$set(item,'unreadCount',0)
        }
      })
    },
    // 获取会话内容
    getChatMessages (id) {
      this.chatLoading = true
      setTimeout(() => {
        this.messageList = [
          {
            messageType: 'text',
            content: 'Hello Zoe',
            id: 0,
            direction: 2,
            ctime: 1551670108000
          },
          {
            messageType: 'text',
            content: `Hello ${this.currentConversation.conversationName}`,
            id: 1,
            direction: 1,
            ctime: 1551670249000
          },
          {
            messageType: 'text',
            content: "We will meet at three o'clock this afternoon.",
            id: 2,
            direction: 1,
            ctime: 1551670272000
          },
          {
            messageType: 'text',
            content: 'Ok',
            id: 3,
            direction: 2,
            ctime: 1551670287000
          }
        ]
        this.chatLoading = false
      }, 300)
    },
    // 搜索
    handleSearch () {
      this.conversationList = this.conversationListAll.filter(item => item.conversationName.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1)
      if (this.conversationList.length) {
        this.handleConversationSelect(this.conversationList[0].conversationId)
        this.$nextTick(() => {
          this.$refs.conversationMenu.updateActiveName()
        })
      }
    },

    // 主动发送消息会话列表顺序改变
    handleSendMessage (val) {
      if (this.currentConversationIndex !== 0) {
        this.currentConversation.updateTime = val
        this.conversationList.splice(this.currentConversationIndex, 1)
        this.conversationList = [this.currentConversation, ...this.conversationList]
        this.currentConversationIndex = 0
      }
    }
  },
  created () {
    this.getConversations()
  },
  mounted () {

  },
  watch: {

  }

}
</script>
<style lang="less">
.chat{
    .ivu-card-body{
        padding: 0;
        .ivu-col{
            border-right: 1px solid #E8E8E8;
        }
        .ivu-scroll-container{
            overflow-y: auto;
            &::-webkit-scrollbar{
                width: 4px;
            }
            .ivu-scroll-loader{
                &:first-child{
                    display: none;
                }
            }
        }
        .chat-toolbar{
            padding: 10px;
            border-bottom: 1px solid #E8E8E8;
            .ivu-input-group{
                >.ivu-input{
                    border-right: 0;
                    border-top-left-radius: 17px;
                    border-bottom-left-radius: 17px;
                    box-shadow: none;
                    -webkit-box-shadow: none;
                    &:hover{
                        border-color: #E8E8E8;
                    }
                    &:focus{
                        border-color: #E8E8E8;
                    }
                }
                >.ivu-input-group-append{
                    padding: 0 7px;
                    background-color: #fff;
                    border-radius: 17px;
                }
            }
        }
        .ivu-menu-vertical{
            overflow-y: auto;
            &::after{
                display: none;
            }
            .ivu-menu-submenu-title{
                padding: 12px 10px;
                font-size: 15px;
                color: #495060;
                font-weight: 700;
            }
            .ivu-menu-item{
                padding: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:hover{
                    color: #495060;
                }
                .conversation-name{
                    display: inline-block;
                    font-size: 14px;
                    color: #495060;
                    padding: 0 10px;
                    max-width: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                }
                .conversation-time{
                    float: right;
                    line-height: 40px;
                    font-size: 12px;
                    color: rgba(73,80,96,0.60);
                }
            }
            .ivu-menu-item-active{
                &:not(.ivu-menu-submenu){
                    color: #495060;
                    background: #F5F5F5;
                    &::after{
                        display: none;
                    }
                }
            }
        }
        .empty-content{
            text-align: center;
            padding-top: 45%;
            font-size: 16px;
        }
    }
}
</style>
