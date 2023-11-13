import SQLite from 'react-native-sqlite-storage';
import { DB_ALIAS_NAME, DB_NAME, DB_SIZE, DB_VERSION } from './consts';

function Sqlite3Helper() {

    let db: any = null;
    function connect() {
        console.log('SQLite: ', SQLite);
        
        db = SQLite.openDatabase(DB_NAME, DB_VERSION, DB_ALIAS_NAME, DB_SIZE, () => {
            console.log(">>> open database success");
        }, (error: any) => {
            console.log(">>> open database failure, error: ", error);
        } );
    }

    function close() {
        if (!db) {
            return;
        }
        db.close(() => {
            console.log("close database success.");
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

    /**
     * database initize.
     */
    function init() {

    }

    function dropTable() {
        console.log(" todo drop table");
    }

    function deleteDB() {
        SQLite.deleteDatabase(DB_NAME, () => {
            console.log("delete database success");
        }, (error: any) => {
            console.log("delete database error: ", error);
        });
    }

    function getTables() {
        console.log(" todo gettables");
    }

    function createTable() {
        
    }

    return {
        init,
        connect,
        close,
        upgrade,
        dropTable,
        deleteDB,
        getTables 
    }
}

const sqliteHelper = Sqlite3Helper();

export default sqliteHelper;