import xLog from "../utils/logs";
import { CostEnity, CostState, TABLE_COST, TABLE_COST_INFO } from "./consts";
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
    async function createTable() {
        const sqlString = `CREATE TABLE IF NOT EXISTS ${TABLE_COST} ( 
            ${TABLE_COST_INFO.ID} INTEGER PRIMARY KEY NOT NULL, 
            ${TABLE_COST_INFO.COST} FLOAT, 
            ${TABLE_COST_INFO.DESC} VARCHAR(20),
            ${TABLE_COST_INFO.TYPE} INTEGER,
            ${TABLE_COST_INFO.STATE} INTEGER,
            ${TABLE_COST_INFO.TIMESTAMP} INTEGER ); `;
        
        return new Promise((resolve, reject) => {
            sqliteHelper.createTable(TABLE_COST, sqlString, () => {
                resolve('success');
            }, (error: any) => {
                reject(error);
            });
        });
    }

    function insert(enity: CostEnity) {
        if (!enity) {
            return;
        }
        const { cost, type, desc, timestamp } = enity || {};
        dao.insertData(TABLE_COST, [TABLE_COST_INFO.COST, TABLE_COST_INFO.DESC, TABLE_COST_INFO.TYPE, TABLE_COST_INFO.TIMESTAMP, TABLE_COST_INFO.STATE], [cost, desc, type, timestamp, CostState.INIT]);
    }

    function queryAll(callback: Function) {
        const sqlString = `SELECT * from ${TABLE_COST} ORDER BY timestamp DESC;`;
        dao.queryData(sqlString, [], (results: any) => {
            let array = [];
            const { rows } = results || {};
            const len = rows.length || 0;
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const { cost, desc, type, timestamp, id, state } = row || {};
                xLog.logDB('row: ', row);
                const entity = {
                    cost,
                    desc,
                    type,
                    timestamp,
                    id,
                    state
                }
                array.push(entity);
            }
            callback && callback(array);
        });
    }

    return {
        createTable,
        insert,
        queryAll
    }

}

const costStorageManager = CostStorageManager();

export default costStorageManager;
