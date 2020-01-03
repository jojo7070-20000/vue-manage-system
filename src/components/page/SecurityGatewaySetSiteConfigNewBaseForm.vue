<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"/> 下载关集合站管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="网关url | IP：">
                        <el-input type="textarea" rows="15" v-model="form.desc"/>
                    </el-form-item>
                    <el-form-item style="width: 700px;">
                        输入格式： url | ip , 例如： https://www1.abc.org | 202.172.241.55,如果多行，请用“;”分割
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
        name: 'securityGatewaySetSiteConfigNewBaseForm',
        data() {
            return {
                form: {
                    desc: '',
                }
            };
        },
        methods: {
            onSubmit() {

                let that = this;
                console.log(this.form);
                service.post("/security/gateway/set/site/config/batch_modify", this.form)
                    .then(function (response) {
                        if (response.status !== 1) {
                            that.$message.error('提交失败！' + response.msg);
                            return;
                        }
                        console.log(
                            response.data
                        );
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
