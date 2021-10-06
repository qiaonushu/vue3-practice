<template>
  <Form class="xtx-form" v-slot="{errors}">
    <div class="user-info">
      <img :src="user.avatar" alt="" />
      <p>Hi{{user.nickname}}， 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field ref='mobileRef' v-model="form.mobile" name='mobile' :rules='schema.mobile' class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if='errors.mobile'>{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field v-model="form.code" name='code' :rules='schema.code' class="input" type="text" placeholder="短信验证码" />
        <span @click='Verification' class="code">{{timer === 0 ? '发送验证码': `${timer}秒后重发`}}</span>
      </div>
      <div class="error" v-if='errors.code'>{{errors.code}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="onSubmit">立即绑定</a>
  </Form>
</template>

<script>
import { ref, reactive } from 'vue'
import { Form, Field } from 'vee-validate'
import { getLoginSocialCodeAPI } from '@/api'
import countdown from '@/utils/countDown.js'
import schema from '@/utils/vee-validate-schema'
import $message from '@/utils/message.js'

export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: {
    user: {
      type: Object,
      default: () => {
        return { nickname: '', avatar: '' }
      }
    }
  },
  setup () {
    // 验证码的倒计时
    const timer = ref(0)
    // 表单内容
    const form = reactive({
      mobile: null,
      code: null
    })
    // 封装的倒计时函数
    const Verification = () => {
      const flag = schema.mobile(form.mobile)
      if (flag !== true) return $message({ text: flag, type: 'error' })
      if (timer.value !== 0) return
      timer.value = 60
      countdown(timer)
      const res = getLoginSocialCodeAPI({ mobile: form.mobile, unionId: 1, source: 1 })
      console.log(res)
      // schema.code(form.code)
    }

    const onSubmit = () => { }

    return { timer, form, onSubmit, Verification, schema }
  }
}
</script>

<style scoped lang='less'>
// 表单
.xtx-form {
  padding: 50px 0;
  .user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
  &-item {
    display: flex;
    align-items: center;
    width: 700px;
    margin: 0 auto;
    padding-bottom: 25px;
    .label {
      width: 180px;
      padding-right: 10px;
      text-align: right;
      color: #999;
      ~ .field {
        margin-left: 0;
      }
    }
    .field {
      width: 320px;
      height: 50px;
      position: relative;
      margin-left: 190px;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #999;
        ~ .input {
          padding-left: 40px;
        }
      }
      .input {
        border: 1px solid #e4e4e4;
        width: 320px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        &.err {
          border-color: @priceColor;
        }
        &:focus,
        &:active {
          border-color: @xtxColor;
        }
      }
    }
    .error {
      width: 180px;
      padding-left: 10px;
      color: @priceColor;
    }
  }
  .submit {
    width: 320px;
    height: 50px;
    border-radius: 4px;
    background: @xtxColor;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
