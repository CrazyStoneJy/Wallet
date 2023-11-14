import { CostEnity, TABLE_COST } from "./consts";
import sqliteHelper from "./internal/sqlite_helper";
import dao from "./internal/storage_access_manager";

function CostStorageManager() {

    /**
     * data type
     * 
     * type CostEnity = {
            timestamp: number;
            cost: number;
            desc: string;
            type: CostType;
        }
     */
    function createTable() {
        const sqlString = `CREATE TABLE IF NOT EXISTS ${TABLE_COST} ( 
            id INTEGER PRIMARY KEY NOT NULL, 
            cost FLOAT, 
            desc VARCHAR(20),
            type INTEGER,
            timestamp INTEGER ); `;
        sqliteHelper.createTable(TABLE_COST, sqlString);
    }

    function insert(enity: CostEnity) {
        if (!enity) {
            return;
        }
        const { cost, type, desc, timestamp } = enity || {};
        dao.insertData(TABLE_COST, ['cost', 'desc', 'type', 'timestamp'], [cost, desc, type, timestamp]);
    }

    function queryAll() {
        const sqlString = `SELECT`;
        dao.queryData(sqlString, []);
    }

    return {
        createTable,
        insert,
        queryAll
    }

}

const costStorageManager = CostStorageManager();

export default costStorageManager;
