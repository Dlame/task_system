<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="handleShowDrawer('新建用户')">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="员工id" width="110" align="center">
        <template slot-scope="{ row }">{{ row.userId }}</template>
      </el-table-column>
      <el-table-column label="员工名称" align="center">
        <template slot-scope="{ row }">{{ row.userName }}</template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="{ row }">{{ row.roleId | roleFilter }}</template>
      </el-table-column>
      <el-table-column label="登录用户名" align="center">
        <template slot-scope="{ row }">{{ row.account }}</template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="$router.push(`/user/detail/${row.userId}`)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleShowDrawer('编辑用户',row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="onDel(row.userId)"
          >
            <el-button slot="reference" size="mini" type="danger" style="margin-left:10px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="count"></el-pagination>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :before-close="handleCloseDrawer"
      size="40%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="form.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.departmentId" placeholder="请选择">
              <el-option
                v-for="item in deptOptions"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="团队">
            <el-select v-model="form.teamId" placeholder="请选择" :disabled="teamOptions.length<1">
              <el-option
                v-for="item in teamOptions"
                :key="item.teamId"
                :label="item.teamName"
                :value="item.teamId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录用户名">
            <el-input v-model="form.account" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="drawerTitle=='新建用户'" label="密码">
            <el-input v-model="form.pwd" autocomplete="off" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleConfirm">保存</el-button>
            <!-- <el-button type="danger" @click="onCancel">取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getUserList, delUser, addUser, editUser } from '@/api/user';
import { getTeam } from '@/api/options';

import { mapGetters } from 'vuex';

import md5 from 'js-md5';

export default {
  name: 'TaskTable',
  filters: {
    roleFilter(role) {
      const roleMap = {
        0: '超级管理员',
        1: '所长',
        2: '部门领导',
        3: '团队负责人',
        4: '普通员工',
      };
      return roleMap[role] || '';
    },
  },
  data() {
    return {
      list: null,
      count: 0,
      listLoading: true,
      params: { page: 1, limit: 10 },
      drawer: false,
      drawerTitle: '',
      form: {
        userName: '',
        roleId: '',
        departmentId: '',
        teamId: '',
        account: '',
        pwd: '',
      },
      roleOptions: [
        { value: 0, label: '超级管理员' },
        { value: 1, label: '所长' },
        { value: 2, label: '部门领导' },
        { value: 3, label: '团队负责人' },
        { value: 4, label: '普通员工' },
      ],
      teamOptions: [],
    };
  },
  computed: {
    ...mapGetters(['deptOptions']),
  },
  watch: {
    'form.departmentId'(val) {
      console.log(val);
      if (!val) return;
      getTeam(val).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.teamOptions = res.data;
      });
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUserList(this.params).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.list = res.data;
        this.count = res.count;
        this.listLoading = false;
      });
    },
    handleShowDrawer(title, user = {}) {
      this.drawerTitle = title;
      this.drawer = true;
      this.form = user;
    },
    handleCloseDrawer() {
      this.drawer = false;
    },
    addUser() {
      const form = this.form;
      form.pwd = md5(form.pwd);
      addUser(form).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '新建用户成功',
          type: 'success',
        });
        this.drawer = false;
      });
    },
    editUser() {
      editUser(this.form).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '编辑用户成功',
          type: 'success',
        });
        this.drawer = false;
      });
    },
    handleConfirm() {
      switch (this.drawerTitle) {
        case '新建用户':
          this.addUser();
          break;
        case '编辑用户':
          this.editUser();
          break;
        default:
          break;
      }
    },
    onDel(userid) {
      delUser(userid).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '删除成功',
          type: 'success',
        });
        this.fetchData();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.top-btns {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row-reverse;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.demo-drawer__content {
  padding: 0 20px;
}
</style>
