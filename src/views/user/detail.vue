<template>
  <div class="detail-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户详情</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">员工名称:</div>
              <div class="cell-content">{{ userInfo.userName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">角色名称:</div>
              <div class="cell-content">{{ userInfo.roleName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">部门名称:</div>
              <div class="cell-content">{{ userInfo.departmentName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">团队名称:</div>
              <div class="cell-content">{{ userInfo.teamName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">登录用户名:</div>
              <div class="cell-content">{{ userInfo.account }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user';
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  created() {
    getUserDetail(this.userId).then((res) => {
      if (res.code !== 0) {
        this.$message.error(res.msg);
        return;
      }
      this.userInfo = res.data || {};
    });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.detail-container {
  padding: 30px;
  box-sizing: border-box;
}
.table-cell {
  display: flex;
  font-size: 16px;
  line-height: 32px;
  .cell-label {
    width: 160px;
    color: #333;
  }
  .cell-content {
    color: #999;
  }
}
.box-card {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
