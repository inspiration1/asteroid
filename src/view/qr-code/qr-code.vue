<template>
<Card>
  <div style="width: 256px;margin: 0 auto;">
    <div id="qrcode"></div>
    <p>利用qrcode生成二维码名片,使用微信扫描可添加到手机通讯录</p>
  </div>
</Card>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'QrCode',
  data () {
    return {

    }
  },
  mounted () {
    let card = `BEGIN:VCARD
                    VERSION:4.0
                    N:Zoe
                    TITLE:前端开发工程师
                    TEL;WORK;VOICE:111111111
                    EMAIL:gt81@foxmail.com
                END:VCARD`
    let qrcode = new QRCode('qrcode', {
      text: card,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H

    })
    qrcode.clear()
    qrcode.makeCode(card)
  }
}
</script>
