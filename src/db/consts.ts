// database const
const DB_NAME = 'wallet.db';
const DB_VERSION = '1.0';
const DB_ALIAS_NAME = 'wallet';
const DB_SIZE = 200000;

// table const
const TABLE_COST = "table_cost";

enum CostType {
    SHOPPING = 1,
    TRANSPORT = 2,
}
export type CostEnity = {
    timestamp: number;
    cost: number;
    desc: string;
    type: CostType;
}

export {
    DB_NAME,
    DB_ALIAS_NAME,
    DB_SIZE,
    DB_VERSION,
    TABLE_COST ,
    CostType,
}