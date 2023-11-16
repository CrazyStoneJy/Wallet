// todo
/**
 * implment an async task structure.
 */

import xLog from "../utils/logs";

const TASK_END_FLAG = 1;
export interface ITask {
    // taskId: number;
    init(): void;
    run(): Promise<ITask | number>;
    cancel(): void;  // TODO how to cancel Promise funtion
}

/**
 * represent manager of task.
 */
export class TaskManager {
    tasks: Array<Task> = [];

    add(task: Task) {
        this.tasks.push(task);
    }

    /**
     * @private
     * @param task 
     * @returns 
     */
    find(task: Task): number {
        return this.tasks.indexOf(task);
    }

    remove(task: Task) {
        let index = -1;
        if ((index = this.find(task)) < 0) {
            return;
        }
        this.tasks.splice(index, 1);
    }

    start() {
        if (!this.tasks) {
            console.log("no task can be execute");
            return;
        }
        xLog.logT("task manager execute.");
        for (const task of this.tasks) {
            task.execute();
        }
    }

    init() {
        if (!this.tasks) {
            console.log("no task can be execute");
            return;
        }
        xLog.logT("task manager init.");
        for (const task of this.tasks) {
            task.init();
        }
    }

}

enum TaskState {
    CANCEL = -1,
    DEAFULT = 0,
    INITED = 1,
    RUNNING = 2,
    DONE = 3
}

export abstract class Task implements ITask {

    public taskName: string = '';
    protected state: TaskState = TaskState.DEAFULT;

    init(): void {
        this.state = TaskState.INITED;
    }

    /**
     * todo 
     * here should be recursively to execute promise function.
     */
    execute(): void {
        this.state = TaskState.RUNNING
        this.run()
            .then((doneFlag: any) => {
                this.state = TaskState.DONE;
                xLog.logT(`${this.taskName} finished successfully.`);
            })
            .catch((error) => {
                xLog.logT(`${this.taskName} has been occure some error, `,error);
            })
    }

    run(): Promise<ITask | number> {
        return Promise.resolve(new NoopTask());
    }

    cancel(): void {
        this.state = TaskState.CANCEL;
    }
}


export class NoopTask extends Task {
    run(): Promise<ITask | number> {
        // this number represent task is end.
        return Promise.resolve(TASK_END_FLAG);
    }
}