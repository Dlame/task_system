<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="dialogFormVisible = true">
            <span style="display: block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="changePwdRules" label-width="120px">
        <el-form-item label="原密码" prop="originPwd">
          <el-input v-model="form.originPwd" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="form.newPwd" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

import { changePwd } from '@/api/user';

import md5 from 'js-md5';

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于六个字符'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      form: { originPwd: '', newPwd: '' },
      changePwdRules: {
        originPwd: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
        newPwd: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    changePwd() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        changePwd({
          originPwd: md5(this.form.originPwd),
          pwd: md5(this.form.newPwd),
        }).then((res) => {
          if (res.code !== 0) {
            this.$message.error(res.msg);
            return;
          }
          this.dialogFormVisible = false;
          this.$store.dispatch('user/logout');
          this.$message.error('请重新登录');
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
