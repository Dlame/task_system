<template>
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>待我执行的任务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ul v-infinite-scroll="load(1)" class="infinite-list" style="overflow:auto">
            <li class="infinite-list-item">
              <span>任务名</span>
              <span>任务状态</span>
              <span>任务级别</span>
              <span>发布时间</span>
            </li>
            <li
              v-for="item in taskList1"
              :key="item.taskId"
              class="infinite-list-item"
              @click="$router.push(`/task/detail/${item.taskId}`)"
            >
              <span>{{ item.taskName }}</span>
              <span>{{ item.taskStatus | statusFilter }}</span>
              <span>{{ item.taskLevel | levelFilter }}</span>
              <span>{{ item.publishTime }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>待我审核的任务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ul v-infinite-scroll="load(2)" class="infinite-list" style="overflow:auto">
            <li class="infinite-list-item">
              <span>任务名</span>
              <span>任务状态</span>
              <span>任务级别</span>
              <span>发布时间</span>
            </li>
            <li v-for="item in taskList2" :key="item.taskId" class="infinite-list-item">
              <span>{{ item.taskName }}</span>
              <span>{{ item.taskStatus | statusFilter }}</span>
              <span>{{ item.taskLevel | levelFilter }}</span>
              <span>{{ item.publishTime }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待我确认的任务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ul v-infinite-scroll="load(3)" class="infinite-list" style="overflow:auto">
            <li class="infinite-list-item">
              <span>任务名</span>
              <span>任务状态</span>
              <span>任务级别</span>
              <span>发布时间</span>
            </li>
            <li
              v-for="item in taskList3"
              :key="item.taskId"
              class="infinite-list-item"
              @click="$router.push(`/task/detail/${item.taskId}`)"
            >
              <span>{{ item.taskName }}</span>
              <span>{{ item.taskStatus | statusFilter }}</span>
              <span>{{ item.taskLevel | levelFilter }}</span>
              <span>{{ item.publishTime }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我参与的任务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <ul v-infinite-scroll="load(4)" class="infinite-list" style="overflow:auto">
            <li class="infinite-list-item">
              <span>任务名</span>
              <span>任务状态</span>
              <span>任务级别</span>
              <span>发布时间</span>
            </li>
            <li
              v-for="item in taskList4"
              :key="item.taskId"
              class="infinite-list-item"
              @click="$router.push(`/task/detail/${item.taskId}`)"
            >
              <span>{{ item.taskName }}</span>
              <span>{{ item.taskStatus | statusFilter }}</span>
              <span>{{ item.taskLevel | levelFilter }}</span>
              <span>{{ item.publishTime }}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { getIndexList } from '@/api/task';

export default {
  name: 'Dashboard',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待提交',
        2: '待审核',
        3: '待反馈',
        4: '待评论',
        5: '待确认',
        6: '完结',
        7: '审核不通过',
      };
      return statusMap[status] || '';
    },
    levelFilter(level) {
      const levelMap = {
        1: '所级',
        2: '部门级',
        3: '团队级',
      };
      return levelMap[level] || '';
    },
  },
  data() {
    return {
      taskList1: [],
      taskParams1: {
        page: 1,
        limit: 10,
      },
      taskList2: [],
      taskParams2: {
        page: 1,
        limit: 10,
      },
      taskList3: [],
      taskParams3: {
        page: 1,
        limit: 10,
      },
      taskList4: [],
      taskParams4: {
        page: 1,
        limit: 10,
      },
    };
  },
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    for (let i = 1; i < 5; i++) {
      this.getIndexList(i);
    }
  },
  methods: {
    getIndexList(index) {
      getIndexList(index, this[`taskParams${index}`]).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this[`taskList${index}`] = this[`taskList${index}`].concat(res.data);
      });
    },
    load() {},
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    width: 100%;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box-card {
  margin-top: 30px;
}

.infinite-list {
  height: 300px;
  list-style: none;
  padding: 0;
}
.infinite-list-item {
  background-color: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
  cursor: pointer;
  span {
    display: inline-block;
    width: 25%;
    line-height: 50px;
    text-align: center;
  }
}
.infinite-list-item:first-child {
  margin-top: 0;
  color: #333;
}
</style>
