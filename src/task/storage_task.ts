import { ITask, Task } from './task';
class StorageTask extends Task {

    run(): Promise<ITask | number> {
        return super.run();
    }
}