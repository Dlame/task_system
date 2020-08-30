<template>
  <div class="app-container">
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
      <el-form-item label="任务状态">
        <el-select v-model="form.taskStatus" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务截止时间">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {},
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
    };
  },
  computed: {
    ...mapGetters(['oneIdOptions', 'twoIdOptions']),
  },
  methods: {
    onSubmit() {
      // addTask(this.form).then((res) => {
      //   if (res.code !== 0) {
      //     this.$message.error(res.msg);
      //     return;
      //   }
      //   this.$message({
      //     message: '提交成功',
      //     type: 'success',
      //   });
      // });
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning',
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

