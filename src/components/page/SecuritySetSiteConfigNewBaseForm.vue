<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"/> 安全集合站配置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="130px">
                    <el-form-item label="id:" v-show="false">
                        <el-input type="input" :rows="9" v-model="form.id"/>
                    </el-form-item>
                    <el-form-item label="index.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.indexHtml"/>
                    </el-form-item>
                    <el-form-item label="真detail.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.detailTrueHtml"/>
                    </el-form-item>
                    <el-form-item label="假detail.html 内容:">
                        <el-input type="textarea" :rows="9" v-model="form.detailFalseHtml"/>
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
    import service from "../../utils/request";

    export default {
        name: 'securitySetSiteConfigNewBaseForm',
        data() {
            return {
                form: {
                    id: 0,
                    indexHtml: '',
                    detailTrueHtml: '',
                    detailFalseHtml: '',
                }
            };
        },
        mounted() {   //页面初始化方法
            let that = this;
            service.get("/security/set/site/config/findOne")
                .then(function (response) {
                    if (response.status !== 1) {
                        that.$message.error('提交失败！' + response.msg);
                        return;
                    }
                    console.log(
                        response.data.id,
                        response.data.indexHtml,
                        response.data.detailTrueHtml,
                        response.data.detailFalseHtml
                    );
                    that.form.id = response.data.id;
                    that.form.indexHtml = response.data.indexHtml;
                    that.form.detailTrueHtml = response.data.detailTrueHtml;
                    that.form.detailFalseHtml = response.data.detailFalseHtml;
                })
                .catch(function (error) {
                    console.log(error);
                })

        },
        methods: {
            onSubmit() {

                let that = this;
                console.log(this.form);
                service.get("/security/set/site/config/modify", {params: this.form})
                    .then(function (response) {
                        // console.log(response);
                        if (response.status !== 1) {
                            that.$message.error('提交失败！' + response.msg);
                            return;
                        }
                        console.log(
                            response.data.indexHtml,
                            response.data.detailTrueHtml,
                            response.data.detailFalseHtml
                        );
                        that.form.id = response.data.id;
                        that.form.indexHtml = response.data.indexHtml;
                        that.form.detailTrueHtml = response.data.detailTrueHtml;
                        that.form.detailFalseHtml = response.data.detailFalseHtml;
                        that.$message.success('提交成功！');
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.$message.error('提交失败！');
                    });
            }
        }
    };
</script>
