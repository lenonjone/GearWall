import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { asyncComponent } from './services/global';
import './index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Moment from 'moment'

import axios from './http';



// //配置请求数据
// import {AxiosInstance } from "axios";
// import Axios from "axios";


// //全局配置Axios
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $axios: AxiosInstance;
//   }
// }

// 通用图标样式
import {createFromIconfontCN } from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2688551_cm84y9ekbc7.js',
});

const app = createApp(App);
asyncComponent(app);


app.component('IconFont',IconFont);

app.config.globalProperties.moment=Moment;
app.use(Antd)
.use(store)
.use(router)
.use(axios)
app.mount('#app')

