<template>
  <div class="boxouter">
    <h1>typeScript</h1>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
      <div class="outerbox">
        <el-tabs type="border-card" class="demo-tabs" stretch>
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon>
                  <calendar />
                </el-icon>
                <span>密码登录</span>
              </span>
            </template>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" show-password type="password" autocomplete="off" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="手机登录">=</el-tab-pane>
        </el-tabs>
      </div>
      <el-form-item>
        <div class="login-opt-footer">
          <el-checkbox v-model="rememberme" label="记住密码" size="large" />
          <el-button link @click="forgetPassword">忘记密码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import useLoginStore from "@/stores/login/login";
import type { ILoginparam, Ipow } from "@/types/login";
import Api from '@/api/user'
import router from "@/router";
import useAES from '@/hooks/useAES'
const AESFunc = useAES()
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<ILoginparam>({
  username: window.localStorage.getItem('username') ? AESFunc.decrypt(window.localStorage.getItem('username'), 'hqy') : '',
  password: window.localStorage.getItem('password') ? AESFunc.decrypt(window.localStorage.getItem('password'), 'hqy') : '',
});
const rememberme = ref<boolean>(window.localStorage.getItem('rememberme') ? true : false);
watch(rememberme, (newval) => {
  if (newval) {
    window.localStorage.setItem('rememberme', '1')
  } else {
    window.localStorage.removeItem('rememberme')
  }
})
const rules = reactive<FormRules<ILoginparam>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { min: 3, max: 20, message: "3-20", trigger: "change" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});

const loginStore = useLoginStore();
const submitForm = async (formEl: FormInstance | undefined = ruleFormRef.value) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginStore.changeUsers(toRaw(ruleForm)).then(() => {
        if (window.localStorage.getItem('rememberme')) {
          window.localStorage.setItem("password", AESFunc.encrypt(ruleForm.password, 'hqy'));
          window.localStorage.setItem("username", AESFunc.encrypt(ruleForm.username, 'hqy'))
        } else {
          window.localStorage.removeItem('rememberme')
          window.localStorage.removeItem("username")
        }
        Api.getUserDetail().then((res: Ipow) => {
          console.log(res)
          loginStore.setUserPow(res)
          router.push({
            path: '/home'
          })
        })

      }).catch(err => {
        ElMessage({
          message: err,
          type: "warning",
        })
      })
    } else {
      ElMessage({
        message: "nn" + JSON.stringify(fields),
        type: "warning",
      });

    }
  });
};

const resetForm = (formEl: FormInstance | undefined = ruleFormRef.value) => {
  if (!formEl) return;
  formEl.resetFields();
};
defineExpose({ submitForm, resetForm });
const forgetPassword = () => {
  Api.test()
}
</script>

<style lang="less" scoped>
.boxouter {
  --el-color-primary-light-3: black;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  // overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: colorchange 5s infinite linear alternate;

  &::before {
    content: "";
    width: 415px;
    height: 415px;
    position: absolute;
    left: -7.5px;
    top: -7.5px;
    box-shadow: 0 0 15px 0 black;
    border-radius: 50%;
  }
}

:deep(.el-form-item__content) {
  display: initial;
  align-items: initial;
}

@keyframes colorchange {
  from {
    background-color: rgb(183, 255, 232);
  }

  to {
    background-color: rgb(222, 255, 170);
  }
}

.login-header {
  box-shadow: 0 0 5px 0px gray;
  padding: 8px 30px;
}

.login-opt-footer {
  display: flex;
  justify-content: space-between;
}

.outerbox {}
</style>
