//引入uuid
import { v4 as uuidv4 } from "uuid";
//查看本地是否有uuid，有直接用，没有再生成;封装成一个函数:持久化存储用户临时身份[只生成一次]
export function userId() {
    let id = localStorage.getItem("USERTEMPID");
    if (!id) {
        id = uuidv4();
        localStorage.setItem("USERTEMPID", id);
    }
    return id;
}
