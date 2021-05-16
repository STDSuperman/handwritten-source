import { PromiseAsyncScheduler } from '../sheduler'

describe('异步调度器', () => {
    test('异步调度Promise', done => {
        const scheduler = new PromiseAsyncScheduler();
        const addTask = (time, order) => {
            scheduler.addTask(
                () => new Promise<void>
                (resolve => setTimeout(() => resolve(), time))
                    .then(() => order));
        }
        addTask(1000, 1);
        addTask(500, 2);
        addTask(300, 3);
        addTask(600, 4);
        const result = []
        scheduler.addEventsListener('onProgress', val => result.push(val))
        scheduler.addEventsListener('onSuccess', () => {
            expect(result).toEqual([2, 3, 1, 4])
            done();
        })
        scheduler.start()
    })
})