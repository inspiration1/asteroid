import { on } from '@/libs/tools'
export default {
  inserted: (el, binding, vnode) => {
    const triggerDom = document.querySelector(binding.value.trigger)
    triggerDom.style.cursor = 'move'
    const bodyDom = document.querySelector(binding.value.body)
    let pageX = 0
    let pageY = 0
    let transformX = 0
    let transformY = 0
    let canMove = false
    const handleMousedown = e => {
      let transform = /\(.*\)/.exec(bodyDom.style.transform)
      if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1)
        const splitxy = transform.split('px, ')
        transformX = parseFloat(splitxy[0])
        transformY = parseFloat(splitxy[1].split('px')[0])
      }
      pageX = e.pageX
      pageY = e.pageY
      canMove = true
    }
    const handleMousemove = e => {
      const xOffset = e.pageX - pageX + transformX
      const yOffset = e.pageY - pageY + transformY
      if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    }
    const handleMouseup = e => {
      canMove = false
    }
    on(triggerDom, 'mousedown', handleMousedown)
    on(document, 'mousemove', handleMousemove)
    on(document, 'mouseup', handleMouseup)
  },
  update: (el, binding, vnode) => {
    if (!binding.value.recover) return
    const bodyDom = document.querySelector(binding.value.body)
    bodyDom.style.transform = ''
  }
}
