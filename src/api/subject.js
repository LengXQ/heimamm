// 导入抽取的axios请求函数
import instance from '../utils/request.js';



// 新增学科
export function subjectAdd(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data,
    })
}

// 获取学科列表
export function subjectList(params) {
    return instance({
        url: "/subject/list",
        method: "get",
        params,
    })
}

// 删除学科列表
export function subjectRemove(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data,
    })
}


// 编辑学科列表
export function subjectEdit(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data,
    })
}

// 改变学科状态
export function subjectChange(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data,
    })
}


