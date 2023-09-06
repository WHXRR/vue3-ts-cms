<script setup lang="ts">
import { ref } from "vue"
import { useLoginStore } from "@/stores/login"
import { useUserInfoStore } from "@/stores/user"
import { useRouter } from "vue-router"
import AccountForm from "./components/AccountForm.vue"
import PhoneForm from "./components/PhoneForm.vue"
import useCache from "@/utils/cache"
import api from "@/service/api"

import { UserOutlined, PhoneOutlined } from "@ant-design/icons-vue"

const loginStore = useLoginStore()
const userStore = useUserInfoStore()
const router = useRouter()

const activeKey = ref("1")

const accountFormRef = ref()
const phoneFormRef = ref()
const checked = ref(true)
const submit = async () => {
  if (activeKey.value === "1") {
    accountFormRef.value?.validateForm().then(() => {
      if (checked.value) {
        useCache.setItem("cmsAccount", accountFormRef.value?.accountFormState.name)
        useCache.setItem("cmsPassword", accountFormRef.value?.accountFormState.password)
      } else {
        useCache.removeItem("cmsAccount")
        useCache.removeItem("cmsPassword")
      }
    })
    let res = await api.accountLogin(accountFormRef.value?.accountFormState)
    loginStore.token = res.data.token
    userStore.userID = res.data.id
    useCache.setItem("cmsToken", res.data.token)
    useCache.setItem("cmsUserID", res.data.id)
    await userStore.getUserInfo()
    await userStore.getUserMenu()
    router.push("/main")
  }
}
</script>
<template>
  <div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-box">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1">
            <template #tab>
              <UserOutlined />
              <span> 密码登录 </span>
            </template>
            <AccountForm ref="accountFormRef" @handleLogin="submit" />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <PhoneOutlined />
              <span> 手机号登录 </span>
            </template>
            <PhoneForm ref="phoneFormRef" />
          </a-tab-pane>
        </a-tabs>
        <div class="remember-password">
          <a-checkbox v-model:checked="checked">记住密码</a-checkbox>
        </div>
        <a-button class="submit-btn" type="primary" @click="submit">登录</a-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  .login-left {
    height: 100%;
    background-image: linear-gradient(#ffffff, #ffffff);
  }
  .login-right {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    .login-box {
      width: 90%;
      max-width: 350px;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .remember-password {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
    .submit-btn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
  }
  .login-left {
    display: none;
  }
}
</style>
