<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import AccountForm from "./components/AccountForm.vue"
import PhoneForm from "./components/PhoneForm.vue"
import useCache from "@/utils/cache"
import api from "@/service/api"
import init from "@/utils/init"

import { UserOutlined, PhoneOutlined } from "@ant-design/icons-vue"

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
    await api
      .accountLogin(accountFormRef.value?.accountFormState)
      .then((res) => {
        useCache.setItem("cmsToken", res.data.token)
        useCache.setItem("cmsUserID", res.data.id)
        init().then(() => {
          router.push("/main")
        })
      })
      .catch((err) => {
        console.warn(err)
      })
  }
}

const getImages = (i: number) => {
  const path = new URL(`../../assets/img/${i}.png`, import.meta.url)
  return path as unknown as string
}
</script>
<template>
  <div class="login-container">
    <div class="login-left">
      <a-carousel autoplay dotsClass="dot">
        <div v-for="item in 7" :key="item">
          <img :src="getImages(item)" alt="" />
        </div>
      </a-carousel>
    </div>
    <div class="login-right">
      <div class="login-box">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1">
            <template #tab>
              <UserOutlined />
              <span> {{ $t("login.passwordLogin") }} </span>
            </template>
            <AccountForm ref="accountFormRef" @handleLogin="submit" />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <PhoneOutlined />
              <span> {{ $t("login.phoneLogin") }} </span>
            </template>
            <PhoneForm ref="phoneFormRef" />
          </a-tab-pane>
        </a-tabs>
        <div class="remember-password">
          <a-checkbox v-model:checked="checked">{{ $t("login.rememberPassword") }}</a-checkbox>
        </div>
        <a-button class="submit-btn" type="primary" @click="submit">{{
          $t("login.login")
        }}</a-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;

  .login-left {
    padding: 20px;
    width: 50%;
    height: 100%;
    background-color: var(--content-background-color);
    :deep(.ant-carousel) {
      height: 100%;
    }
    :deep(.slick-slider) {
      height: 100%;
    }
    :deep(.slick-list) {
      height: 100%;
    }
    :deep(.slick-track) {
      height: 100%;
    }
    :deep(.slick-slide) {
      height: 100%;
      overflow: hidden;
    }
    :deep(.slick-dots li button) {
      background: var(--color);
    }
  }
  .login-right {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--content-background-color);
    .login-box {
      width: 90%;
      max-width: 350px;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: var(--background-color);
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
    flex-direction: column;
  }
  .login-right {
    width: 100% !important;
  }
  .login-left {
    display: none;
  }
}
</style>
