/**
 * 主要用于存放调度相关手写内容
 */
type CustomEvents = 'onSuccess' | 'onProgress'

interface EventsMap {
    [key: string]: Function
}

export class PromiseAsyncScheduler {
    private query: any[] = [];
    private maxRunCount = 2;
    private currentRunCount = 0;
    private eventsMap: EventsMap = {};

    addTask(fn: Function) {
        this.query.push(fn);
    }

    runTask() {
        if (this.currentRunCount >= this.maxRunCount) return;
        if (!this.query.length) {
            !this.currentRunCount && this.eventsMap?.onSuccess();
            return;
        }
        this.currentRunCount++;
        this.query.shift()().then((val: any) => {
            this.eventsMap?.onProgress(val);
            this.currentRunCount--;
            this.runTask();
        })
    }

    start() {
        for(let i = 0; i < 2; i++) {
            this.runTask();
        }
    }

    addEventsListener(eventName: CustomEvents, cb: Function) {
        this.eventsMap[eventName] = cb;
    }
}