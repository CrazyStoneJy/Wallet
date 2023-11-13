import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { DB_ALIAS_NAME, DB_NAME, DB_SIZE, DB_VERSION } from './consts';

function Sqlite3Helper() {

    let db = null;
    function connect() {
        // db = SQLite.openDatabase(DB_NAME, DB_VERSION, DB_ALIAS_NAME, DB_SIZE, () => {

        // }, () => {

        // } );
    }

    function disConnect() {

    }

    /**
     * upgrade database
     */
    function upgrade() {

    }

    /**
     * database initize.
     */
    function init() {

    }

    function dropTable() {

    }

    return {
        init,
        connect,
        disConnect,
        upgrade,
        dropTable
    }
}

const sqliteHelper = Sqlite3Helper();

export default sqliteHelper;