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
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="id:" v-show="false">
                        <el-input type="input" :rows="9" v-model="form.id"/>
                    </el-form-item>
                    <el-form-item label="集合站名:">
                        <el-input type="input" :rows="9" v-model="form.name"/>
                    </el-form-item>
                    <el-form-item label="App logo url:" style="width: 900px;">
                        <el-col :span="6">
                            <el-input type="input" :rows="7" v-model="form.cdn" :disabled="true"/>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="9">
                            <el-input type="input" :rows="7" v-model="form.log_url"/>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-pic"
                                    class="handle-del mr10"
                                    @click="preViewImg"
                            >
                            </el-button>
                        </el-col>
                        <img v-if="preViewLogUrl!=''" :src="preViewLogUrl" class="pre-img el-icon-lx-pic"
                             style="width:50%;height:50%;">
                    </el-form-item>
                    <el-form-item label="iOS App下载地址:" style="width: 900px;">
                        <el-col :span="6">
                            <el-input type="input" :rows="7" v-model="form.cdn" :disabled="true"/>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="9">
                            <el-input type="input" :rows="9" v-model="form.download_ios"/>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-down"
                                    class="handle-del mr10"
                                    @click="download(form.download_ios)"
                            >
                            </el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="安卓 App 下载地址:" style="width: 900px;">
                        <el-col :span="6">
                            <el-input type="input" :rows="7" v-model="form.cdn" :disabled="true"/>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="9">
                            <el-input type="input" :rows="9" v-model="form.download_android"/>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-down"
                                    class="handle-del mr10"
                                    @click="download(form.download_android)"
                            >
                            </el-button>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="粉丝群:" v-for="(ele,index) in form.fansGroupList"
                                  style="width: 1200px;">
                        <el-col :span="4">
                            <el-select v-model="ele.group_name" placeholder="请选择">
                                <el-option key="potato" label="potato" value="potato"></el-option>
                                <el-option key="telegram" label="telegram" value="telegram"></el-option>
                                <el-option key="微信" label="微信" value="微信"></el-option>
                                <el-option key="QQ" label="QQ" value="QQ"></el-option>
                                <!--                               // <el-option v-for="(v,k) in dictMap.fansGroupMap">{{k}}</el-option>-->
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="input" :rows="7" v-model="form.cdn" :disabled="true"/>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="9">
                            <el-input type="input" :rows="9" v-model="ele.url"/>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-pic"
                                    class="handle-del mr10"
                                    @click="preViewImgEle(ele)"
                            >
                            </el-button>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-move"
                                    class="handle-del mr10"
                                    @click="del"
                            >
                            </el-button>
                        </el-col>
                        <el-col class="line" :span="1">
                            <el-button
                                    type="primary"
                                    icon="el-icon-lx-add"
                                    class="handle-del mr10"
                                    @click="add"
                            >
                            </el-button>
                        </el-col>
                        <img v-if="ele.xurl" :src="ele.xurl" class="pre-img el-icon-lx-pic"
                             style="width:50%;height:50%;">
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
                    name: '',
                    log_url: '',
                    download_ios: '',
                    download_android: '',
                    cdn: '',
                    fansGroupList: [
                        {
                            "group_name": "",
                            "group_cate": 0,
                            "url": "",
                        },
                    ],
                },
                dictMap: {
                    fansGroupMap: {},
                },
                preViewLogUrl: "",
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
                        response.data
                    );
                    that.form.id = response.data.id;
                    that.form.name = response.data.name;
                    that.form.log_url = response.data.log_url;

                    that.form.download_ios = response.data.download_ios;
                    that.form.download_android = response.data.download_android;

                    that.form.cdn = (response.data.cdnConfigList.length > 0)
                        ? response.data.cdnConfigList[0].domain
                        : "";

                    that.preViewLogUrl = that.form.log_url != "" && that.form.cdn != ""
                        ? that.form.cdn + that.form.log_url
                        : "";

                    that.form.fansGroupList = response.data.fansGroupList;

                    that.dictMap.fansGroupMap = response.data.fansGroupMap;
                })
                .catch(function (error) {
                    console.log(error);
                })

        },
        methods: {
            onSubmit() {

                let that = this;
                this.form.fansGroupList.forEach(function (v, index) {
                    v.group_cate = that.dictMap.fansGroupMap[v.group_name];
                    delete v.xurl
                });
                console.log(this.form);
                service.post("/security/set/site/config/modify", this.form)
                    .then(function (response) {
                        // console.log(response);
                        if (response.status !== 1) {
                            that.$message.error('提交失败！' + response.msg);
                            return;
                        }
                        console.log(
                            response.data
                        );
                        that.form.id = response.data.id;
                        // that.form.indexHtml = response.data.indexHtml;
                        // that.form.detailTrueHtml = response.data.detailTrueHtml;
                        // that.form.detailFalseHtml = response.data.detailFalseHtml;
                        that.$message.success('提交成功！');
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.$message.error('提交失败！');
                    });
            },
            add() {
                this.form.fansGroupList.push({})
            },
            del() {
                this.form.fansGroupList.pop();
                let size = this.form.fansGroupList.length;
                if (size == 0) {
                    this.add();
                }
            },
            preViewImg() {
                this.preViewLogUrl = this.form.cdn + this.form.log_url;
            },
            preViewImgEle(ele) {
                console.log("b", ele);
                ele.xurl = this.form.cdn + ele.url;
                console.log("a", ele);

            },
            download(path) {
                let newPath = this.form.cdn + path;
                console.log(newPath);

                let a = document.createElement('a');
                a.href = newPath;
                a.click();
            }
        }
    };
</script>
