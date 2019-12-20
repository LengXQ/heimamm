// 导入抽取的axios请求函数
import instance from '../utils/request.js';


// 新增企业
export function enterpriseAdd(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data,
    })
}

// 企业列表
export function enterpriseList(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params,
    })
}

// 企业状态设置
export function enterpriseChange(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data,
    })
}

// 企业删除
export function enterpriseDelete(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data,
    })
}

// 企业编辑
export function enterpriseEdit(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data,
    })
}

