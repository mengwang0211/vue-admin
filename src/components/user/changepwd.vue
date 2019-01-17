<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" style="width: 160px;"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd" type="password" placeholder="请确认新密码" style="width: 160px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import API from '../../api/api_user';

  export default {
    data() {
      return {
        loading: false,
        form: {
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          newPwd: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ],
          confirmPwd: [
            {required: true, message: '请确认新密码', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      handleChangepwd() {
        let that = this;
        that.$refs.form.validate((valid) => {
          let newPwd = that.form.newPwd;
          let confirmPwd = that.form.confirmPwd;
          if (newPwd == confirmPwd){
            if (valid) {
              that.loading = true;
              let args = {
                password: that.form.newPwd,
                confirmPwd: that.form.confirmPwd
              };
              API.modifyPwd(args).then(function (result) {
                that.loading = false;
                console.log(result)
                if (result && parseInt(result.code) === 0) {
                  that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                  that.$router.push({ path: "/login" });
                } else {
                  that.$message.error({showClose: true, message: result.msg, duration: 2000});
                }
              }, function (err) {
                that.loading = false;
                that.$message.error({showClose: true, message: err.toString(), duration: 2000});
              }).catch(function (error) {
                that.loading = false;
                console.log(error);
                that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
              });
            }
          }else {
              that.$message.error({showClose: true, message: '两次输入的不一致', duration: 2000});
              that.form.newPwd = '';
              that.form.confirmPwd = '';
          }
        });
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.form.userId = user.userId;
        this.form.username = user.username;
      }
    }
  }
</script>
