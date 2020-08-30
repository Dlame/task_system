<template>
  <div class="detail-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目详情</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务名称:</div>
              <div class="cell-content">{{ taskDetail.taskName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务级别:</div>
              <div class="cell-content">{{ taskDetail.taskLevel | levelFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务类别:</div>
              <div class="cell-content">{{ taskDetail.taskCategory | categoryFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务状态:</div>
              <div class="cell-content">{{ taskDetail.task | statusFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">所属所级任务名称:</div>
              <div class="cell-content">{{ taskDetail.oneName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">所属部门级任务名称:</div>
              <div class="cell-content">{{ taskDetail.twoName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">所级审核人名称:</div>
              <div class="cell-content">{{ taskDetail.reviewer1Name }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">部门级审核人名称:</div>
              <div class="cell-content">{{ taskDetail.reviewer2Name }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">团队级审核人名称:</div>
              <div class="cell-content">{{ taskDetail.reviewer3Name }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">发布人名称:</div>
              <div class="cell-content">{{ taskDetail.publisherName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务状态:</div>
              <div class="cell-content">{{ taskDetail.taskStatus | statusFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">发布时间:</div>
              <div class="cell-content">{{ taskDetail.publishTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务截止时间:</div>
              <div class="cell-content">{{ taskDetail.endTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务确认时间:</div>
              <div class="cell-content">{{ taskDetail.confirmTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">所级审核时间:</div>
              <div class="cell-content">{{ taskDetail.reviewer1Time }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">部门级审核时间:</div>
              <div class="cell-content">{{ taskDetail.reviewer2Time }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">团队级审核时间:</div>
              <div class="cell-content">{{ taskDetail.reviewer3Time }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">执行人:</div>
              <div class="cell-content">{{ taskDetail.exerNames }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table-cell">
              <div class="cell-label">任务内容:</div>
              <div class="cell-content">{{ taskDetail.taskContent }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table-cell">
              <div class="cell-label">备注:</div>
              <div class="cell-content">{{ taskDetail.taskRemark }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所属所级任务</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务名称:</div>
              <div class="cell-content">{{ oneDetail.taskName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务级别:</div>
              <div class="cell-content">{{ oneDetail.taskLevel | levelFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务类别:</div>
              <div class="cell-content">{{ oneDetail.taskCategory | categoryFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务状态:</div>
              <div class="cell-content">{{ oneDetail.taskStatus | statusFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务内容:</div>
              <div class="cell-content">{{ oneDetail.taskContent }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">发布时间:</div>
              <div class="cell-content">{{ oneDetail.publishTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务截止时间:</div>
              <div class="cell-content">{{ oneDetail.endTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务分数:</div>
              <div class="cell-content">{{ oneDetail.taskScore }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table-cell">
              <div class="cell-label">备注:</div>
              <div class="cell-content">{{ oneDetail.taskRemark }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所属部门级任务</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务名称:</div>
              <div class="cell-content">{{ twoDetail.taskName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务级别:</div>
              <div class="cell-content">{{ twoDetail.taskLevel | levelFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务类别:</div>
              <div class="cell-content">{{ twoDetail.taskCategory | categoryFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务状态:</div>
              <div class="cell-content">{{ twoDetail.taskStatus | statusFilter }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务内容:</div>
              <div class="cell-content">{{ twoDetail.taskContent }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">发布时间:</div>
              <div class="cell-content">{{ twoDetail.publishTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务截止时间:</div>
              <div class="cell-content">{{ twoDetail.endTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">任务分数:</div>
              <div class="cell-content">{{ twoDetail.taskScore }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table-cell">
              <div class="cell-label">备注:</div>
              <div class="cell-content">{{ twoDetail.taskRemark }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>子任务列表</span>
      </div>
      <div>
        <el-table :data="childList" fit highlight-current-row>
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
          <el-table-column label="任务分数" align="center">
            <template slot-scope="{ row }">{{ row.taskScore }}</template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="{ row }">{{ row.taskRemark }}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>反馈信息列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showDialog('add')">新增反馈</el-button>
      </div>
      <div>
        <el-table :data="fbList" fit highlight-current-row>
          <el-table-column label="反馈id" width="110" align="center">
            <template slot-scope="{ row }">{{ row.fbId }}</template>
          </el-table-column>
          <el-table-column label="反馈人名称" align="center">
            <template slot-scope="{ row }">{{ row.fberName }}</template>
          </el-table-column>
          <el-table-column label="反馈内容" align="center">
            <template slot-scope="{ row }">{{ row.fbContent }}</template>
          </el-table-column>
          <el-table-column label="反馈时间" align="center">
            <template slot-scope="{ row }">{{ row.fbTime }}</template>
          </el-table-column>
          <el-table-column label="反馈状态" align="center">
            <template slot-scope="{ row }">{{ row.fbStatus | fbStatusFilter }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                @click="$router.push(`/task/fbDetail?fbId=${row.fbId}&taskId=${taskId}`)"
              >详情</el-button>
              <el-button size="mini" type="primary" @click="showDialog('edit',row)">编辑</el-button>
              <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除吗？"
              >
                <!-- <el-button slot="reference" size="mini" type="danger" style="margin-left:10px">删除</el-button> -->
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="review-btns">
      <el-button type="primary" @click="showReviewDialog(true)">审核通过</el-button>
      <el-button @click="showReviewDialog">审核不通过</el-button>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="反馈内容">
          <el-input v-model="feedBack.fbContent" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核意见" :visible.sync="dialogReviewVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="审核意见">
          <el-input v-model="taskRemark" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReviewVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReviewConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskDetail,
  getTaskOneDetail,
  getTaskTwoDetail,
  getChildList,
  getFeedbackList,
  addFeedBack,
  editFeedBack,
  reviewPass,
  reviewNotPass,
} from '@/api/task';
export default {
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
    fbStatusFilter(status) {
      const fbStatusMap = {
        1: '已提交',
        2: '已评论',
      };
      return fbStatusMap[status] || '';
    },
  },
  data() {
    return {
      taskDetail: {},
      oneDetail: {},
      twoDetail: {},
      childList: [],
      fbList: [],
      dialogTitle: '',
      dialogFormVisible: false,
      feedBack: {
        fbContent: '',
      },
      dialogType: '',
      dialogReviewTitle: '',
      dialogReviewVisible: false,
      taskRemark: '',
      dialogReview: true,
    };
  },
  computed: {
    taskId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getTaskDetail();
    this.getTaskOneDetail();
    this.getTaskTwoDetail();
    this.getChildList();
    this.getFeedbackList();
  },
  mounted() {},
  methods: {
    getTaskDetail() {
      getTaskDetail(this.taskId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.taskDetail = res.data || {};
      });
    },
    getTaskOneDetail() {
      getTaskOneDetail(this.taskId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.oneDetail = res.data || {};
      });
    },
    getTaskTwoDetail() {
      getTaskTwoDetail(this.taskId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.twoDetail = res.data || {};
      });
    },
    getChildList() {
      getChildList(this.taskId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.childList = res.data || [];
      });
    },
    getFeedbackList() {
      getFeedbackList(this.taskId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.fbList = res.data || [];
      });
    },
    showDialog(type, row = {}) {
      this.dialogType = type;
      this.dialogTitle = type === 'add' ? '新增反馈' : '编辑反馈';
      this.feedBack = row;
      this.dialogFormVisible = true;
    },
    addFeedBack() {
      addFeedBack({
        taskId: this.taskId,
        fbContent: this.feedBack.fbContent,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '添加反馈成功',
          type: 'success',
        });
        this.dialogFormVisible = false;
        this.getFeedbackList();
      });
    },
    editFeedBack() {
      editFeedBack({
        taskId: this.taskId,
        fbId: this.feedBack.fbId,
        fbContent: this.feedBack.fbContent,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '编辑反馈成功',
          type: 'success',
        });
        this.dialogFormVisible = false;
        this.getFeedbackList();
      });
    },
    handleConfirm() {
      switch (this.dialogType) {
        case 'add':
          this.addFeedBack();
          break;
        case 'edit':
          this.editFeedBack();
          break;
        default:
          break;
      }
    },
    showReviewDialog(pass) {
      this.taskRemark = '';
      this.dialogReviewVisible = true;
      this.dialogReview = pass;
    },
    handleReviewConfirm() {
      this.dialogReview ? this.reviewPass() : this.reviewNotPass();
    },
    reviewPass() {
      reviewPass({
        taskId: this.taskId,
        taskRemark: this.taskRemark,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '评审成功',
          type: 'success',
        });
        this.dialogReviewVisible = false;
      });
    },
    reviewNotPass() {
      reviewNotPass({
        taskId: this.taskId,
        taskRemark: this.taskRemark,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '评审成功',
          type: 'success',
        });
        this.dialogReviewVisible = false;
      });
    },
  },
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
.review-btns {
  margin: 20px auto 0;
  width: 220px;
}
</style>
