<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"/> 下载集合站管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="formSearch" label-width="80px">
                    <el-radio-group v-model="formSearch.resource">
                        <el-radio label="有效下载集合站" @change="queryChange(1)"/>
                        <el-radio label="无效下载集合站" @change="queryChange(0)"/>
                    </el-radio-group>
                </el-form>
            </div>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-lx-add"
                        class="handle-del mr10"
                        @click="jmpAdd"
                >新增
                </el-button>

                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="setDel"
                >批量删除
                </el-button>

                <el-button
                        v-if="showInvalid"
                        type="primary"
                        icon="el-icon-lx-comment"
                        class="handle-del mr10"
                        @click="setAvail(0)"
                >批量设置为无效下载集合网站
                </el-button>
                <el-button
                        v-if="showAvila"
                        type="primary"
                        icon="el-icon-lx-comment"
                        class="handle-del mr10"
                        @click="setAvail(1)"
                >批量设置为有效下载集合网站
                </el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column prop="name" label="IP">
                    <template slot-scope="scope">{{scope.row.ip}}</template>
                </el-table-column>
                <el-table-column label="域名">
                    <template slot-scope="scope">{{scope.row.domain}}</template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.isAbled===1?'success':(scope.row.isAbled===0?'danger':'')"
                        >{{scope.row.isAbled===1?'有效':'无效'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间">
                    <template slot-scope="scope">{{scope.row.addTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!--                        <el-button-->
                        <!--                                type="text"-->
                        <!--                                icon="el-icon-edit"-->
                        <!--                                @click="handleEdit(scope.$index, scope.row)"-->
                        <!--                        >编辑-->
                        <!--                        </el-button>-->
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageNo"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                />
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!--        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">-->
        <!--            <el-form ref="form" :model="form" label-width="70px">-->
        <!--                <el-form-item label="用户名">-->
        <!--                    <el-input v-model="form.name"/>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="地址">-->
        <!--                    <el-input v-model="form.address"/>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <span slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="editVisible = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
        <!--            </span>-->
        <!--        </el-dialog>-->
    </div>
</template>

<script>
    import {fetchData} from '../../api/securityGatewaySetSiteConfig';
    import service from "../../utils/request";

    export default {
        name: 'securityGatewaySetSiteConfigBaseTable',
        data() {
            return {
                showInvalid: 1,
                showAvila: 0,//控制按钮显示
                formSearch: {
                    resource: '有效下载集合站',
                },
                query: {
                    address: '',
                    name: '',
                    isAbled: 1,
                    pageNo: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {
                    console.log(res);
                    if (res.status !== 1) {
                        return;
                    }
                    this.tableData = res.data.list;
                    this.pageTotal = res.data.pageTotal || 50;
                });
            },
            // 筛选
            queryChange(val) {
                console.log(val);
                if (val === 1) {
                    this.showInvalid = 1;
                    this.showAvila = 0;
                }
                if (val === 0) {
                    this.showInvalid = 0;
                    this.showAvila = 1;
                }

                this.$set(this.query, 'isAbled', val);
                this.$set(this.query, 'pageNo', 1);
                console.log(this.query);
                this.getData();
            },
            // 新增路由跳转
            jmpAdd() {
                this.$router.push('/new-security-gateway-set-site-config-form')
            },
            // 设置无效
            setAvail(isAbled) {
                let that = this;
                // (v,x,y)->
                this.multipleSelection.forEach(function (p1, p2, p3) {
                    console.log(p1.id, "p1");
                    p1.isAbled = isAbled;
                    service.post("/security/gateway/set/site/config/modify",
                        {
                            "isAbled": p1.isAbled,
                            "id": p1.id
                        })
                        .then(function (response) {
                            if (response.status !== 1) {
                                return;
                            }
                            console.log(
                                response.data
                            );
                            that.$message.success('提交成功！');
                            that.handlePageChange(1);
                        })
                        .catch(function (error) {
                            console.log(error);
                            that.$message.error('提交失败！');
                        });
                });
            },
            // 设置删除
            setDel() {
                let that = this;
                this.multipleSelection.forEach(function (p1, p2, p3) {
                    p1.isDel = 1;
                    console.log(p1.id, "p1");
                    p1.isAbled = 0;
                    service.post("/security/gateway/set/site/config/modify",
                        {
                            "isDel": p1.isDel,
                            "isAbled": p1.isAbled,
                            "id": p1.id
                        })
                        .then(function (response) {
                            if (response.status !== 1) {
                                return;
                            }
                            console.log(
                                response.data
                            );
                            that.$message.success('提交成功！');
                            that.handlePageChange(1);
                        })
                        .catch(function (error) {
                            console.log(error);
                            that.$message.error('提交失败！');
                        });
                });

            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageNo', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, p1) {
                let that = this;
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示',
                    {
                        type: 'warning'
                    })
                    .then(() => {

                        console.log(p1);
                        p1.isDel = 1;
                        console.log(p1.id, "p1");
                        p1.isAbled = 0;
                        service.post("/security/gateway/set/site/config/modify",
                            {
                                "isDel": p1.isDel,
                                "isAbled": p1.isAbled,
                                "id": p1.id
                            })
                            .then(function (response) {
                                if (response.status !== 1) {
                                    return;
                                }
                                console.log(
                                    response.data
                                );
                                that.$message.success('提交成功！');
                                that.tableData.splice(index, 1);
                            })
                            .catch(function (error) {
                                console.log(error);
                                that.$message.error('提交失败！');
                            });
                    })
                    .catch(() => {
                    });
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageNo', val);

                let that = this;
                setTimeout(function () {
                    that.getData();
                    console.log("=====end getData");
                }, 50);
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
