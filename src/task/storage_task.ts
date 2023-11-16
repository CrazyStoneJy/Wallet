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
        costStorageManager.createTable();
        return Promise.resolve(new StorageChildTask());
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
        console.log("child task running....");
        return Promise.resolve(new NoopTask());
    }

}