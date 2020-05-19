<template>
  <div>
    <a-row>
      <a-col :span="8" :offset="8">
        <a-card title="Login" style="margin-top: 200px">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item
              :validate-status="!!error.errors ? (!!error.errors.username ? 'error' : null) : null"
              :help="!!error.errors ? (!!error.errors.username ? error.errors.username[0] : null) : null"
            >
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [
                      {
                        required: false,
                        message: 'Please input your username!'
                      }
                    ]
                  },
                ]"
                placeholder="Username"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item
              :validate-status="!!error.errors ? (!!error.errors.password ? 'error' : null) : null"
              :help="!!error.errors ? (!!error.errors.password ? error.errors.password[0] : null) : null"
            >
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: false, message: 'Please input your Password!' }] },
                  ]"
                type="password"
                placeholder="Password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
              >
                Remember me
              </a-checkbox>
              <a class="login-form-forgot" href="">
                Forgot password
              </a>
              <a-button type="primary" html-type="submit" class="login-form-button" :loading="loading">
                Log in
              </a-button>
              Or
              <a href="">
                register now!
              </a>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'login_form' })
  },
  data () {
    return {
      error: {},
      loading: false
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    openNotificationWithIcon (type, message) {
      this.$notification[type]({
        message: 'Login Failed',
        description: message
      })
    },
    async handleSubmit (e) {
      e.preventDefault()
      this.loading = true
      await this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.login(values).then(() => {
            this.loading = false
            this.$router.replace({
              name: 'home'
            })
          }).catch(error => {
            this.loading = false
            this.openNotificationWithIcon('error', error.response.data.message)
            this.error = error.response.data
          })
        }
      })
    }
  }
}
</script>

<style>
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>
