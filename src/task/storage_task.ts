import costStorageManager from '../db/cost_storage_manager';
import xLog from '../utils/logs';
import { ITask, NoopTask, Task } from './task';
export class StorageTask extends Task {

    public taskName: string = "storageTask";
    init(): void {
        super.init();
        xLog.logT("storage task init.");
    }

    run(): Promise<ITask | number> {
        xLog.logT("storage task run.");
        return new Promise(async (resolve, reject) => {
            xLog.logT(">>> storage task promise");
            await this.initOrUpgradeTable();
            xLog.logT(">>> storage task promise execute success");
            resolve('success');
        })
        .then(() => {
            return new StorageChildTask().run();
        });
    }

    async initOrUpgradeTable() {
        return new Promise(async (resolve, reject) => {
            try {
                await costStorageManager.createTable();
                // add some tables.

                resolve('success');
            } catch (error) {
                reject(`init or upgrade table occur error: ${error}`);
                xLog.logT("init or upgrade table occur error: ", error);
            }
        });
    }

}

class StorageChildTask extends Task {

    public taskName: string = "storageChildTask";
    init(): void {
        super.init();
        xLog.logT("storage child task init.");
    }

    run(): Promise<ITask | number> {
        xLog.logT("storage child task run.");
        // console.log("child task running....");
        return new NoopTask().run();
    }

}