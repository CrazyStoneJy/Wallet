import csm from "../src/db/cost_storage_manager";

describe('test sqlite3', () => {
    test('delete table-cost by id', () => {
        let id = 3;
        csm.deleteById(id);

    });
});