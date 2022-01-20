
import { App, defineAsyncComponent } from "vue";
import { Router, RouteRecordRaw } from "vue-router";

function getModules() {
    const components = import.meta.glob('../views/**/*.vue')
    return components
}
function getComponents() {
    const components = import.meta.globEager('../views/**/*.vue')
    return components
}

export const _getModules =function (){
    const components = import.meta.glob('../views/**/*.vue')
    return components
}
export const _getComponents =function (){
    const components = import.meta.glob('../views/**/*.vue')
    return components
}

// 自动注册组件
export const asyncComponent = function (app: App<Element>): void {
    const modules = getModules();
    const components = getComponents();
    // with options（动态组件）
    Object.keys(modules).forEach((key: string) => {
        const viewSrc = components[key];
        const file = viewSrc.default;
        if (!file.isComponents) return
        const AsyncComponent = defineAsyncComponent(modules[key])
        app.component(letterToUpperCase(file.name), AsyncComponent)
    });
    // console.log(app._component.components)
};

// 自动注册路由
export const autoRouters = function (): Array<RouteRecordRaw> {
    let routerList: Array<RouteRecordRaw> = [];
    const modules = getModules();
    const components = getComponents();
    Object.keys(modules).forEach(key => {
        const viewSrc = components[key];
        const file = viewSrc.default;
        if (!file.isRouter) return
        // 首字母转小写 letterToLowerCase 首字母转大写 letterToUpperCase
        routerList.push({
            path: `/${letterToLowerCase(file.name)}`,
            name: `${letterToUpperCase(file.name)}`,
            component: modules[key]
        });
    })
    return routerList

}

// 动态注册路由
export const dynamicRouters = function (router: Router): void {
    let routerList: Array<RouteRecordRaw> = [];
    const modules = import.meta.glob('../views/**/*.vue')
    for (const path in modules) {
        modules[path]().then((mod) => {
            const file = mod.default;
            if (!file.isRouter) return
            // 首字母转小写 letterToLowerCase 首字母转大写 letterToUpperCase
            router.addRoute({
                path: `/${letterToLowerCase(file.name)}`,
                name: `${letterToUpperCase(file.name)}`,
                component: file
            })
        })
    }
};



const letterToLowerCase = (name: string) =>
    `${name[0].toLowerCase()}${name.slice(1)}`;
const letterToUpperCase = (name: string) =>
    `${name[0].toUpperCase()}${name.slice(1)}`;

