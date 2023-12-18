import xLog from "../../utils/logs";
import sqliteHelper from "./sqlite_helper";

function StorageAccessManager() {

    function checkParameterAndValues(parameters: string[], values: string[]) {
        if (!parameters || !values) {
            return false;
        }
        return parameters.length === values.length;
    }

    function dealString(str: any, isDealString: boolean = false) {
        if (!isDealString) {
            return str;
        }
        if (typeof str === 'string') {
            return `"${str}"`;
        }
        return str;
    }

    function genParametersOrValuesString(array: any[], isDealString: boolean = false) {
        if (array.length === 1) {
            return "(" + dealString(array[0], isDealString) + ")";
        }
        return array.reduce((prev, current, currentIndex) => {
                let temp = '';
                if (currentIndex === 1) {
                    temp = "(" + dealString(prev, isDealString) + ", " + dealString(current, isDealString) + ", ";
                } else {
                    const isLast = currentIndex === array.length - 1;
                    temp = prev + dealString(current, isDealString) + (isLast ? "" : ", ");
                }
                if (currentIndex === array.length - 1) {
                    temp += ")";
                }
                return temp;
        });
    }

    async function insertData(tableName: string, parameters: string[], values: any[]): Promise<any> {
        if (!checkParameterAndValues(parameters, values)) {
            return;
        }
        const parameterStrings = genParametersOrValuesString(parameters);
        const valueStrings = genParametersOrValuesString(values, true);
        const sqlString = `INSERT INTO 
            ${tableName} ${parameterStrings} VALUES ${valueStrings};`;
        xLog.logDB("inset sql string: ", sqlString);
        const _db = await sqliteHelper.getDB();
        return new Promise((reoslve, reject) => {
            _db.executeSql(sqlString, [], (res: any) => {
                xLog.logDB(`insert table ${tableName} successfully.`);
                reoslve(res);
            }, (error: any) => {
                xLog.logDB(`insert table ${tableName} occur error, error info `, error);
                reject(error);
            });
        });
    }

    async function deleteData(sqlString: string): Promise<any> {
        xLog.logDB(`delete sql string: ${sqlString}`);
        const _db = await sqliteHelper.getDB();
        return new Promise((resolve, reject) => {
            _db.executeSql(sqlString, [], (res: any) => {
                xLog.logDB(`delete successfully.`);
                resolve(res);
            }, (error: any) => {
                xLog.logDB(`delete has been occur error, error info: `, error);
                reject(error);
            });
        });
    }

    async function updateData(sqlString: string): Promise<any> {
        xLog.logDB(`update sql string: ${sqlString}`);
        const _db = await sqliteHelper.getDB();
        return new Promise((resolve, reject) => {
            _db.executeSql(sqlString, [], (res: any) => {
                xLog.logDB(`update successfully.`);
                resolve(res);
            }, (error: any) => {
                xLog.logDB(`update has been occur error, error info: `, error);
                reject(error);
            });
        });
    }

    async function queryData(sqlString: string, parameters: any[]): Promise<any> {
        xLog.logDB(`query sql string: ${sqlString}`);
        xLog.logDB(`query parameters: `, parameters);
        const _db = await sqliteHelper.getDB();
        return new Promise((resolve, reject) => {
            _db.executeSql(sqlString, [ ...parameters ], (res: any) => {
                xLog.logDB(`query successfully, res: ${res}`);
                resolve(res);
            }, (error: any) => {
                xLog.logDB(`query has been occur error, error info: `, error);
                reject(error);
            });
        });
    }

    return {
        insertData,
        deleteData,
        updateData,
        queryData
    }
}

const dao = StorageAccessManager();

export default dao;