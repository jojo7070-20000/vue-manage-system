<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 安全集合站配置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="130px">
                    <el-form-item label="index.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.indexHtml"></el-input>
                    </el-form-item>
                    <el-form-item label="真detail.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.detailTrueHtml"></el-input>
                    </el-form-item>
                    <el-form-item label="假detail.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.detailFalseHtml"></el-input>
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
        name: 'securitySetSiteConfigNewBaseForm',
        data() {
            return {
                form: {
                    indexHtml: '',
                    detailTrueHtml: '',
                    detailFalseHtml: '',
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
