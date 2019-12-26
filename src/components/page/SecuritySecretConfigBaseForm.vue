<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 安全配置管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="320px" >
                    <el-form-item label="App端到安全网关端数据加解密密钥有效时长：">
                        <el-col class="line" :span="4">
                            <el-input v-model="form.name1"></el-input>
                        </el-col>
                        <el-col class="line" :span="6" style="width: 216px;">秒。 不能小于0秒，默认为5秒</el-col>
                    </el-form-item>
                    <el-form-item label="视频文件分段标准时长：">
                        <el-col class="line" :span="4">
                            <el-input v-model="form.name2"></el-input>
                        </el-col>
                        <el-col class="line" :span="6" style="width: 216px;">秒。 不能小于1秒，默认为2秒</el-col>
                    </el-form-item>
                </el-form>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'securityGatewayConfigBaseform',
        data() {
            return {
                form: {
                    name1: '5',
                    name2: '2',
                    desc: '',
                    options: []
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    };
</script>
