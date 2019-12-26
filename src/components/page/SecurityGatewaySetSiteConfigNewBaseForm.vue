<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 安全网关集合站管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="网关url | IP：">
                        <el-input type="textarea" rows="15" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item  style="width: 700px;">
                        <el-sl-panel>
                            输入格式：   url  |  ip  , 例如： https://www1.abc.org | 202.172.241.55,如果多行，请用“;”分割
                        </el-sl-panel>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                desc: '',
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>
