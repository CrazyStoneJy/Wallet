
const dbLogInfo = {
    isDebug: true,
    tag: 'db'
};

const defaulutInfo = {
    isDebug: false,
    tag: 'tag'
}

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

    return {
        logDB,
        log
    }

}

const xLog = XLog();

export default xLog;
