let lastClickTime = 0;
const DEFAULT_DURATION = 2000;
function helper() {

    let _duration = DEFAULT_DURATION;
    let lastArgs: any[] = [];
    let lastFunc: Function | null = null;
    function debounce(func: Function, ...args: any[]) {
        if (lastClickTime) {
            const now = Date.now();
            const offset = now - lastClickTime;

            if (offset > _duration) {
                invoke(func, args);
            } else {
                // if not over time && current parameter is not equals last parameter.
                if (!isSame(func, args)) {
                    invoke(func, args);
                } else {
                    // console.log("arguments is same");
                }
            }
        } else {
            // the first time
            invoke(func, args);
        }
    }

    function invoke(func: Function, ...args: any[]) {
        lastClickTime = Date.now();
        lastArgs = args[0];
        lastFunc = func;
        func.call(null, args);
    }

    function isSame(func: Function, ...args: any[]): boolean {
        const isFuncSame = func === lastFunc;
        const isArgsSame = diffArgs(args);
        return isFuncSame && isArgsSame;
    }

    function diffArgs(...args: any[]): boolean {
        const lastLen = lastArgs ? lastArgs.length : 0;
        const len = args ? args.length : 0;
        if (lastLen !== len) {
            return false;
        }
        // iterate arguments 
        return args[0].every((value: any, index: number) => {
            const isTypeSame = (typeof value[index] === typeof lastArgs[index]);
            const isValueSame = value[index] === lastArgs[index];
            return isTypeSame && isValueSame;
        });
    }

    function setDuration(duration: number) {
        _duration = duration;
    }

    return {
        debounce,
        setDuration
    }

}

const _ = helper();
export default _;