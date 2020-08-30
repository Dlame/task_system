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
              <div class="cell-label">反馈人名称:</div>
              <div class="cell-content">{{ feedBack.fberName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">反馈时间:</div>
              <div class="cell-content">{{ feedBack.fbTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="table-cell">
              <div class="cell-label">反馈状态:</div>
              <div class="cell-content">{{ feedBack.fbStatus | fbStatusFilter }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="table-cell">
              <div class="cell-label">反馈内容:</div>
              <div class="cell-content">{{ feedBack.fbContent }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论信息列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showDialog('add')">新增评论</el-button>
      </div>
      <div>
        <el-table :data="commentList" fit highlight-current-row>
          <el-table-column label="评论id" width="80" align="center">
            <template slot-scope="{ row }">{{ row.commentId }}</template>
          </el-table-column>
          <el-table-column label="评论人名称" align="center">
            <template slot-scope="{ row }">{{ row.commentName }}</template>
          </el-table-column>
          <el-table-column label="评论内容" align="center">
            <template slot-scope="{ row }">{{ row.commentContent }}</template>
          </el-table-column>
          <el-table-column label="评论时间" align="center">
            <template slot-scope="{ row }">{{ row.commentTime }}</template>
          </el-table-column>
          <el-table-column label="任务分数" align="center">
            <template slot-scope="{ row }">{{ row.taskScore }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button size="mini" type="primary" @click="showDialog('edit',row)">编辑</el-button>
              <!-- <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除吗？"
              >
                <el-button slot="reference" size="mini" type="danger" style="margin-left:10px">删除</el-button>
              </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="review-btns">
      <el-button type="primary" @click="showDialog('final')">确认完结</el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="评论内容">
          <el-input v-model="comment.commentContent" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="任务分数">
          <el-input v-model="comment.taskScore" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFeedBackDetail,
  getCommentList,
  addComment,
  editComment,
  confirmComment,
} from '@/api/task';
export default {
  filters: {
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
      feedBack: {},
      commentList: [],
      dialogTitle: '',
      dialogFormVisible: false,
      comment: {
        commentContent: '',
        taskScore: '',
      },
      dialogType: '',
    };
  },
  computed: {
    fbId() {
      return this.$route.query.fbId;
    },
    taskId() {
      return this.$route.query.taskId;
    },
  },
  created() {
    this.getFeedBackDetail();
    this.getCommentList();
  },
  mounted() {},
  methods: {
    getFeedBackDetail() {
      getFeedBackDetail(this.fbId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.feedBack = res.data || {};
      });
    },
    getCommentList() {
      getCommentList(this.fbId).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.commentList = res.data || [];
      });
    },
    showDialog(type, row = {}) {
      const titleMap = {
        add: '新增评论',
        edit: '编辑评论',
        final: '确认完结',
      };
      this.dialogType = type;
      this.dialogTitle = titleMap[type] || '';
      this.comment = row;
      this.dialogFormVisible = true;
    },
    addFeedBack() {
      addComment({
        fbId: this.fbId,
        commentContent: this.comment.commentContent,
        taskScore: this.comment.taskScore,
        taskId: this.taskId,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '添加评论成功',
          type: 'success',
        });
        this.dialogFormVisible = false;
        this.getCommentList();
      });
    },
    editFeedBack() {
      editComment({
        taskId: this.taskId,
        commentId: this.comment.commentId,
        commentContent: this.comment.commentContent,
        taskScore: this.comment.taskScore,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '编辑评论成功',
          type: 'success',
        });
        this.dialogFormVisible = false;
        this.getCommentList();
      });
    },
    confirmComment() {
      confirmComment({
        fbId: this.fbId,
        commentContent: this.comment.commentContent,
        taskScore: this.comment.taskScore,
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: '确认完结成功',
          type: 'success',
        });
        this.dialogFormVisible = false;
        this.getCommentList();
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
        case 'final':
          this.confirmComment();
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
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
