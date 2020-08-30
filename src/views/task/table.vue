<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="活动名称">
        <el-input v-model="params.taskName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="任务级别">
        <el-select v-model="params.taskLevel" placeholder="请选择" clearable>
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类别">
        <el-select v-model="params.taskCategory" placeholder="请选择" clearable>
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select v-model="params.taskStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="publishTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="fetchData">查询</el-button>
        <el-button type="primary" @click="handleShowDrawer('新建任务')">新建</el-button>
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
      <el-table-column label="任务id" width="110" align="center">
        <template slot-scope="{ row }">{{ row.taskId }}</template>
      </el-table-column>
      <el-table-column label="任务名" align="center">
        <template slot-scope="{ row }">{{ row.taskName }}</template>
      </el-table-column>
      <el-table-column label="任务级别" width="80" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskLevel | levelFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务类别" width="80" align="center">
        <template slot-scope="{ row }">{{ row.taskCategory | categoryFilter }}</template>
      </el-table-column>
      <el-table-column label="任务内容" align="center">
        <template slot-scope="{ row }">{{ row.taskContent }}</template>
      </el-table-column>
      <el-table-column label="任务状态" width="80" align="center">
        <template slot-scope="{ row }">{{ row.taskStatus | statusFilter }}</template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="180">
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.publishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务截止时间" width="180">
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务确认时间" width="180">
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.confirmTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{ row }">{{ row.taskRemark }}</template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="$router.push(`/task/detail/${row.taskId}`)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleShowDrawer('编辑任务',row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="onDel(row.taskId)"
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
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="任务名称">
            <el-input v-model="form.taskName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="任务级别">
            <el-select v-model="form.taskLevel" placeholder="请选择">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行人">
            <el-select
              v-model="form.exerIds"
              multiple
              placeholder="请选择"
              :disabled="exerIdOptions.length<1"
            >
              <el-option
                v-for="item in exerIdOptions"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务类别">
            <el-select v-model="form.taskCategory" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务内容">
            <el-input v-model="form.taskContent" autocomplete="off" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="所属所级任务">
            <el-select v-model="form.oneId" placeholder="请选择">
              <el-option
                v-for="item in oneIdOptions"
                :key="item.taskId"
                :label="item.taskName"
                :value="item.taskId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门级任务">
            <el-select v-model="form.twoId" placeholder="请选择">
              <el-option
                v-for="item in twoIdOptions"
                :key="item.taskId"
                :label="item.taskName"
                :value="item.taskId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="任务状态">
            <el-select v-model="form.taskStatus" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="任务截止时间">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">保存</el-button>
            <el-button type="primary" @click="onSubmit(true)">提交</el-button>
            <!-- <el-button type="danger" @click="onCancel">取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { getTaskList, saveTask, submitTask, delTask } from '@/api/task';
import { getExerId } from '@/api/options';

export default {
  name: 'TaskTable',
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
    categoryFilter(category) {
      const categoryMap = {
        1: '研发类',
        2: '设计类',
        3: '生产类',
      };
      return categoryMap[category] || '';
    },
  },
  data() {
    return {
      list: null,
      count: 0,
      listLoading: true,
      params: { page: 1, limit: 10 },
      publishTime: [],
      form: {
        taskId: null, // 任务id，主键
        taskName: '', // 任务名称
        taskLevel: '', // 任务级别
        taskCategory: '', // 任务类别
        taskContent: '', // 任务内容
        oneId: '', // 所属所级任务 下拉框选择
        twoId: '', // 所属部门级任务 下拉框选择
        endTime: '', // 任务截止时间
        taskRemark: '', // 备注
        exerIds: '', // 执行人ID字符串 下拉框选择 多选
      },
      levelOptions: [
        {
          value: 1,
          label: '所级',
        },
        {
          value: 2,
          label: '部门级',
        },
        {
          value: 3,
          label: '团队级',
        },
      ],
      categoryOptions: [
        {
          value: 1,
          label: '研发类',
        },
        {
          value: 2,
          label: '设计类',
        },
        {
          value: 3,
          label: '生产类',
        },
      ],
      statusOptions: [
        {
          value: 1,
          label: '待提交',
        },
        {
          value: 2,
          label: '待审核',
        },
        {
          value: 3,
          label: '待反馈',
        },
        {
          value: 4,
          label: '待评论',
        },
        {
          value: 5,
          label: '待确认',
        },
        {
          value: 6,
          label: '完结',
        },
        {
          value: 7,
          label: '审核不通过',
        },
      ],
      exerIdOptions: [],
      exerIds: '',
      drawerTitle: '',
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(['oneIdOptions', 'twoIdOptions']),
  },
  watch: {
    'form.taskLevel'(val) {
      if (!val) return;
      getExerId(val).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.exerIdOptions = res.data;
        this.$nextTick(() => {
          this.form.exerIds = this.exerIds.map((item) => item * 1);
        });
      });
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      const params = this.params;
      if (this.publishTime && this.publishTime.length > 0) {
        params.minPublishTime = this.publishTime[0];
        params.maxPublishTime = this.publishTime[1];
      }
      getTaskList(params).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.list = res.data;
        this.count = res.count;
        this.listLoading = false;
      });
    },
    handleShowDrawer(title, task = {}) {
      this.drawerTitle = title;
      this.drawer = true;
      this.exerIds =
        typeof task.exerIds === 'string' ? task.exerIds.split(',') : [];
      this.form = task;
    },
    handleCloseDrawer() {
      this.drawer = false;
    },
    onSubmit(isSubmit) {
      const form = this.form;
      form.exerIds = form.exerIds.join(',');
      saveTask(form).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.fetchData();
        if (isSubmit) {
          submitTask({
            taskId: res.data,
            taskLevel: this.form.taskLevel,
          }).then((res) => {
            if (res.code !== 0) {
              this.$message.error(res.msg);
              return;
            }
            this.form = {};
            this.drawer = false;
            this.$message({
              message: '提交成功',
              type: 'success',
            });
          });
        } else {
          this.$message({
            message: '保存成功',
            type: 'success',
          });
          this.form = {};
          this.drawer = false;
        }
      });
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning',
      });
    },
    onDel(taskid) {
      delTask(taskid).then((res) => {
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
