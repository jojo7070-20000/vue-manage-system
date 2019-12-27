<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"/> 安全配置管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="320px">
                    <el-form-item label="id:" v-show="false">
                        <el-input type="input" :rows="9" v-model="form.id"/>
                    </el-form-item>

                    <el-form-item label="App端到安全网关端数据加解密密钥有效时长：">
                        <el-col class="line" :span="5">
                            <el-input v-model="form.secretKeyEffectiveTime" @change="onChangeValue"/>
                        </el-col>
                        <el-col class="line" :span="6" style="width: 216px;">秒。 不能小于0秒，默认为5秒</el-col>
                    </el-form-item>
                    ˛
                    <el-form-item label="视频文件分段标准时长：">
                        <el-col class="line" :span="5">
                            <el-input v-model="form.videoFileSegmentationTime" @change="onChangeValue"/>
                        </el-col>
                        <el-col class="line" :span="6" style="width: 216px;">秒。 不能小于1秒，默认为2秒</el-col>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import service from "../../utils/request";

    export default {
        name: 'securityGatewayConfigBaseform',
        data() {
            return {
                form: {
                    id: 0,
                    secretKeyEffectiveTime: '',
                    videoFileSegmentationTime: ''
                }
            }
        },
        mounted() {   //页面初始化方法
            let that = this;
            service.get("/security/secret/config/findOne")
                .then(function (response) {
                    console.log(response);

                    if (response.status === 1) {
                        that.form.id = response.data.id;
                        that.form.secretKeyEffectiveTime = response.data.secretKeyEffectiveTime;
                        that.form.videoFileSegmentationTime = response.data.videoFileSegmentationTime;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        methods: {
            onChangeValue() {
                console.log(
                    this.form.id,
                    this.form.secretKeyEffectiveTime,
                    this.form.videoFileSegmentationTime
                );

                let that = this;
                service.post("/security/secret/config/modify", this.form)
                    .then(function (response) {
                        console.log(response);

                        if (response.status === 1) {
                            that.form.id = response.data.id;
                            that.form.secretKeyEffectiveTime = response.data.secretKeyEffectiveTime;
                            that.form.videoFileSegmentationTime = response.data.videoFileSegmentationTime;

                            that.$message.success('提交成功！');
                        } else {
                            that.$message.error('提交错误！');
                        }
                    })
                    .catch(function (error) {
                        that.$message.error('提交错误！');
                        console.log(error);
                    })
            },
        }
    };
</script>
