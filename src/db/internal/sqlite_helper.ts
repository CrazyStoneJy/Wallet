// @ts-ignore
import SQLite from 'react-native-sqlite-storage';
import { DB_ALIAS_NAME, DB_NAME, DB_SIZE, DB_VERSION } from '../consts';
import xLog from '../../utils/logs';

/**
 * todo how to manager `db` 
 * @returns 
 */
function Sqlite3Helper() {

    let db_name = DB_NAME;
    let db_alias_name = DB_ALIAS_NAME;
    let db_version = DB_VERSION;
    let db: SQLite.SQLitePlugin = null;

    function setup_test(dbName: string) {
        db_name = `${dbName}.db`;
        db_alias_name = dbName;
    }

    function connect(successCallback: Function, failureCallback: Function): void {
        db = SQLite.openDatabase(db_name, db_version, db_alias_name, DB_SIZE, (_db: any) => {
            xLog.logDB("open database success");
            successCallback && successCallback(_db);
        }, (error: any) => {
            xLog.logDB("open database failure, error: ", error);
            failureCallback && failureCallback(error);
        } );
    }

    function close(): void {
        if (!db) {
            return;
        }
        db.close(() => {
            xLog.logDB("close database success");
        }, (error: any) => {
            xLog.logDB("close database failure error:", error);
        });
    }

    async function dropTable(tableName: string): Promise<any> {
        const _db = await getDB();
        // todo check tablename is valid.
        const sqlString = `DROP TABLE IF EXISTS ${DB_ALIAS_NAME}.${tableName};`;
        xLog.logDB(`drop table sql: ${sqlString}`);
        return new Promise((resolve, reject) => {
            _db.executeSql(sqlString, (res: any) => {
                xLog.logDB(`drop table ${tableName} successfully.`);
                resolve(res);
            }, (error: any) => {
                xLog.logDB(`drop table ${tableName} occur error, error info: `, error);
                reject(error);
            });
        });
    }

    async function createTable(tableName: string, sqlString: string): Promise<any> {
        const _db = await getDB();
        xLog.logDB(`create table ${tableName} `, sqlString);
        return new Promise((resolve, reject) => {
            _db.executeSql(sqlString, [], 
                (res: any) => {
                    xLog.logDB(`create table ${tableName} successfully`);
                    resolve(res);
                }, (error: any) => {
                    xLog.logDB(`create table ${tableName} occur error, error info:`, error);
                    reject(error);
                });
        });
    }

    function getDB(): Promise<SQLite.SQLitePlugin> {
        return new Promise((resolve, reject) => {
            if (!db) {
                connect((_db: SQLite.SQLitePlugin) => {
                    // callback && callback(_db);
                    resolve(_db);
                }, (error: any) => {
                    reject(error);
                });
            } else {
                resolve(db);
            }
        });
    }

    return {
        close,
        dropTable,
        getDB,
        createTable,
        setup_test 
    }
}

const sqliteHelper = Sqlite3Helper();

export default sqliteHelper;