import csm from "../src/db/cost_storage_manager";
import sqliteHelper from "../src/db/internal/sqlite_helper";
import dao from "../src/db/internal/storage_access_manager";

describe('test sqlite3', () => {

    beforeEach(async () => {
        // await sqliteHelper.
    });

    test('delete table-cost by id', () => {
        let id = 3;
        csm.deleteById(id);

    });
});