import { safeParseInt } from "../../utils/safe_invoker"

function is_id(id: any) {
    if (typeof id === 'string') {
        return safeParseInt(id) > 0;
    }
    if (typeof id === 'number') {
        return id > 0;
    }
    return false;
}

export {
    is_id
}