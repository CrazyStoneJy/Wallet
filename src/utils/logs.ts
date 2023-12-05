
const dbLogInfo = {
    isDebug: false,
    tag: 'db'
};

const defaulutInfo = {
    isDebug: true,
    tag: 'tag'
}

const taskInfo = {
    isDebug: false,
    tag: 'task'
};

function XLog() {

    function log(...message: any[]) {
        const { tag, isDebug } = defaulutInfo;
        if (isDebug) {
            console.log(`>>>${tag} `, message);
        }
    }

    function logDB(...message: any[]) {
        const { tag, isDebug } = dbLogInfo;
        if (isDebug) {
            console.log(`>>>${tag} `, message);
        }
    }

    function logT(...message: any[]) {
        const { tag, isDebug } = taskInfo;
        if (isDebug) {
            console.log(`>>>${tag} `, message);
        }
    }

    return {
        logDB,
        log,
        logT
    }

}

const xLog = XLog();

export default xLog;
