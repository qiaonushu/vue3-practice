import { useIntervalFn } from '@vueuse/core'

export default timer => {
  // pause:暂停、 resume:恢复、 isActive:激活
  const { pause } = useIntervalFn(() => {
    timer.value <= 0
      ? pause()
      : timer.value--
  }, 1000, {
    // 立即启动计时器
    immediate: true,
    // 调用此函数后立即执行回调
    immediateCallback: false
  })
}
