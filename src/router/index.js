import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/security-secret-config',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecuritySecretConfigBaseForm.vue'),
                    meta: { title: '安全配置管理' }
                },
                {
                    path: '/security-gateway-config-view',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecurityGatewayConfigBaseTable.vue'),
                    meta: { title: '安全网关管理' }
                },
                {
                    path: '/new-security-gateway-config-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecurityGatewayConfigNewBaseForm.vue'),
                    meta: { title: '安全网关管理-新增' }
                },

                {
                    path: '/security-gateway-set-site-config-view',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecurityGatewaySetSiteConfigBaseTable.vue'),
                    meta: { title: '下载集合站管理' }
                },
                {
                    path: '/new-security-gateway-set-site-config-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecurityGatewaySetSiteConfigNewBaseForm.vue'),
                    meta: { title: '下载集合站管理-新增' }
                },

                {
                    path: '/security-set-site-config-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecuritySetSiteConfigNewBaseForm.vue'),
                    meta: { title: '安全集合站配置' }
                },

                {
                    path: '/security-set-site-config-v2-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SecuritySetSiteConfigV2NewBaseForm.vue'),
                    meta: { title: '安全集合站配置v2' }
                },

                {
                    path: '/cdn-config-view',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/CdnConfigBaseTable.vue'),
                    meta: { title: 'cdn管理' }
                },
                {
                    path: '/new-cdn-config-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/CdnConfigNewBaseForm.vue'),
                    meta: { title: 'cdn管理-新增' }
                },

                {
                    path: '/fs-config-view',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/FsConfigBaseTable.vue'),
                    meta: { title: 'fs管理' }
                },
                {
                    path: '/new-fs-config-form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/FsConfigNewBaseForm.vue'),
                    meta: { title: 'fs管理-新增' }
                },

                 // test
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
