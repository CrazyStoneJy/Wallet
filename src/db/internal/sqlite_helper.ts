import SQLite from 'react-native-sqlite-storage';
import { DB_ALIAS_NAME, DB_NAME, DB_SIZE, DB_VERSION } from '../consts';
import xLog from '../../utils/logs';

/**
 * todo how to manager `db` 
 * @returns 
 */
function Sqlite3Helper() {

    let db: any = null;
    function connect(successCallback?: Function) {
        db = SQLite.openDatabase(DB_NAME, DB_VERSION, DB_ALIAS_NAME, DB_SIZE, (_db: any) => {
            xLog.logDB("open database success", _db);
            successCallback && successCallback(_db);
        }, (error: any) => {
            xLog.logDB("open database failure, error: ", error);
        } );
    }

    function close() {
        if (!db) {
            return;
        }
        db.close(() => {
            xLog.logDB("close database success");
        }, (error: any) => {
            console.log("close database failure error:", error);
        });
    }

    /**
     * upgrade database
     */
    function upgrade() {
        console.log(" todo upgrade");
    }

    function dropTable(tableName: string) {
        if (!tableName) {
            return;
        }
        if (!db) {
            return;
        }
        const sqlString = `DROP TABLE IF EXISTS ${DB_ALIAS_NAME}.${tableName};`;
        xLog.logDB(`drop table sql: ${sqlString}`);
        db.executeSql(sqlString, () => {
            xLog.logDB(`drop table ${tableName} successfully.`);
        }, (error: any) => {
            xLog.logDB(`drop table ${tableName} occur error, error info: `, error);
        });
    }

    function deleteDB() {
        SQLite.deleteDatabase(DB_NAME, () => {
            xLog.logDB("delete database success");
        }, (error: any) => {
            xLog.logDB("delete database error: ", error);
        });
    }

    function getTables() {
        console.log(" todo gettables");
    }

    function createTable(tableName: string, sqlString: string) {
        xLog.logDB(`create table ${tableName} `, sqlString);
        if (!db) {
            connect((_db: any) => {
                db.executeSql(sqlString, [], 
                    () => {
                        xLog.logDB(`create table ${tableName} successfully. `);
                    }, (error: any) => {
                        xLog.logDB(`create table ${tableName} occur error, error info:`, error);
                    });
            })
            return;
        }
        db.executeSql(sqlString, [], 
            () => {
                xLog.logDB(`create table ${tableName} successfully. `);
            }, (error: any) => {
                xLog.logDB(`create table ${tableName} occur error, error info:`, error);
            });
    }

    function getDB(callback: Function) {
        if (!db) {
            connect((_db: any) => {
                callback && callback(_db);
            });
        } else {
            callback && callback(db);
        }
    }

    return {
        connect,
        close,
        upgrade,
        dropTable,
        deleteDB,
        getTables,
        getDB,
        createTable 
    }
}

const sqliteHelper = Sqlite3Helper();

export default sqliteHelper;