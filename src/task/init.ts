import { StorageTask } from "./storage_task";
import { TaskManager } from "./task";

export function init() {
    const taskManager = new TaskManager();
    // add some task of initize.
    taskManager.add(new StorageTask());
    // add more task here.

    // init
    taskManager.init();
    // start
    taskManager.start();
}