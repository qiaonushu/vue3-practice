<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="!signIn" @click="toggle(true)">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-if="signIn" @click="toggle(false)">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form class="form" ref="target" v-slot="{errors}">
      <template v-if="signIn">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="account" type="text" placeholder="请输入用户名" :rules="schema.account" v-model="form.account" />
            <!-- 错误提示信息 -->
            <div class="error" v-if='errors.account'><i class="iconfont icon-warning" />{{errors.account}}</div>
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field name="password" type="password" placeholder="请输入密码" :rules="schema.password" v-model="form.password" />
            <!-- 错误提示信息 -->
            <div class="error" v-if='errors.password'><i class="iconfont icon-warning" />{{errors.password}}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field name="mobile" type="text" placeholder="请输入手机号" :rules="schema.mobile" v-model="form.mobile" />
          </div>
          <!-- 错误提示信息 -->
          <div class="error" v-if='errors.mobile'><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field name="code" type="password" placeholder="请输入验证码" :rules="schema.code" v-model="form.code" />
            <span class="code" @click="Verification">
              {{timer===0?'发送验证码':`${timer}秒后发送`}}
            </span>
          </div>
          <!-- 错误提示信息 -->
          <div class="error" v-if='errors.code'><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as='XtxCheckbox' name="isAgree" :rules="schema.isAgree" v-model="form.isAgree" />
          <!--Field as='XtxCheckbox'===XtxCheckbox组件 -->
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 错误提示信息 -->
        <div class="error" v-if='errors.isAgree'><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
      </div>
      <a href="javascript:;" class="btn" @click="onSubmit">登录</a>
    </Form>
    <div class="action">
      <!-- <RouterLink to="/login/LoginCallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </RouterLink> -->
      <!-- <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
// 接口
import { getLoginCodeAPI } from '@/api'
// vue按需导入
import { ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// 第三方组件
import { Form, Field } from 'vee-validate'
// util自定义方法
import schema from '@/utils/vee-validate-schema'
import countdown from '@/utils/countDown.js'

export default {
  name: 'LoginForm',
  components: {
    Field,
    Form
  },
  setup () {
    const instance = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    // 控制登录方式
    const signIn = ref(true)
    // ref获取form表单标签
    const target = ref(null)
    // 表单数据
    const form = reactive({
      // 用户名
      account: 'xiaotuxian001',
      // 密码
      password: 123456,
      // 手机号
      mobile: null,
      // 验证码
      code: null,
      // 是否同意
      isAgree: true
    })
    // 验证码的倒计时
    const timer = ref(0)
    // 封装的倒计时函数
    // 验证码点击事件
    const Verification = () => {
      // 获取手机的校验信息
      const flag = schema.mobile(form.mobile)
      // 没有通过校验进行消息提示并返回
      if (flag !== true) {
        instance.proxy.$message({ text: flag, type: 'error' })
        return
      }
      // 验证通过，给倒计时数字赋值开启倒计时
      // 倒计时没有归零就返回
      if (timer.value === 0) {
        timer.value = 60
        countdown(timer)
      } else {
        return
      }
      // 调用接口获取验证码
      const res = getLoginCodeAPI({ mobile: form.mobile })
      console.log(res)

      // 底层方法
      //   setInterval(() => {
      //     document.querySelector('.code').innerText--
      //     if (document.querySelector('.code').innerText === '1') {
      //       clearInterval()
      //       document.querySelector('.code').innerText = '发送验证码'
      //     }
      //   }, 1000)
    }
    // 切换登录方式触发的事件
    const toggle = state => {
      // 切换登录方式
      signIn.value = state
      // 清空表单
      for (const key in form) {
        key === 'isAgree'
          ? form[key] = false
          : form[key] = null
      }
      // 直接操作组件: 组件的实例方法resetForm可以重置表单错误信息
      target.value.resetForm()
    }
    // 点击登录按钮
    const onSubmit = async () => {
      // vee-validate提供的验证是否通过Blooean值
      const flag = await target.value.validate()
      if (flag) {
        // 通过，判断是账户还是手机号登录，发送相应请求
        const res = await store.dispatch('user/postLogin', { account: form.account, password: form.password, mobile: form.mobile, code: form.code })
        if (res.result) {
          router.push('/')
          instance.proxy.$message({ text: '登陆成功', type: 'success' })
        } else {
          instance.proxy.$message({ text: res.message, type: 'error' })
        }
        // 消息提示
      } else {
        // 失败，获取所有class是error的文本内容，展示错误信息提示
        const errList = document.querySelectorAll('.error')
        errList.forEach(item => {
          instance.proxy.$message({ text: item.innerText, type: 'error' })
        })
      }
    }

    return { signIn, form, schema, target, toggle, Verification, onSubmit, timer }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
