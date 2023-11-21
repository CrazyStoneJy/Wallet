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

    function insertData(tableName: string, parameters: string[], values: any[]) {
        if (!checkParameterAndValues(parameters, values)) {
            return;
        }
        const parameterStrings = genParametersOrValuesString(parameters);
        const valueStrings = genParametersOrValuesString(values, true);
        const sqlString = `INSERT INTO 
            ${tableName} ${parameterStrings} VALUES ${valueStrings};`;
        xLog.logDB("inset sql string: ", sqlString);
        sqliteHelper.getDB((db: any) => {
            db.executeSql(sqlString, [], () => {
                xLog.logDB(`insert table ${tableName} successfully.`);
            }, (error: any) => {
                xLog.logDB(`insert table ${tableName} occur error, error info `, error);
            });
        })
    }

    function deleteData(sqlString: string) {
        xLog.logDB(`query sql string: ${sqlString}`);
        // xLog.logDB(`query parameters: `, parameters);
        sqliteHelper.getDB((db: any) => {
            db.executeSql(sqlString, [], (results: any) => {
                xLog.logDB(`delete successfully.`);
                // successCallback && successCallback(results);
            }, (error: any) => {
                xLog.logDB(`delete has been occur error, error info: `, error);
            });
        });
    }

    function updateData() {

    }

    function queryData(sqlString: string, parameters: any[], successCallback: Function) {
        xLog.logDB(`query sql string: ${sqlString}`);
        xLog.logDB(`query parameters: `, parameters);
        sqliteHelper.getDB((db: any) => {
            db.executeSql(sqlString, [ ...parameters ], (results: any) => {
                xLog.logDB(`query successfully.`);
                successCallback && successCallback(results);
            }, (error: any) => {
                xLog.logDB(`query has been occur error, error info: `, error);
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