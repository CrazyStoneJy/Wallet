// tod
/**
 * implment an async task structure.
 */

interface ITask {
    // taskId: number;
    init(): void;
    run(): void;
    cancel(): void;
}

class TaskManager {
    tasks = [];

    add() {
        // this
    }

    init() {

    }

}

enum TaskState {
    CANCEL = -1,
    DEAFULT = 0,
    INITED = 1,
    RUNNING = 2,
}

abstract class Task implements ITask{
   
    // taskId: number = ;
    state: TaskState = TaskState.DEAFULT;

    init(): void {
        this.state = TaskState.INITED;
    }
    run(): void {
        this.state = TaskState.RUNNING
        // return Promise.resolve(null);
    }
    cancel(): void {
        this.state = TaskState.CANCEL;
    }
}