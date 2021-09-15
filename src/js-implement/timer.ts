/**
 * 记录与定时器相关的手写
 */

const timerObj: Record<string, NodeJS.Timeout> = {};
let id = 0;

export function setIntervalBySetTimeout(cb: Function, time: number): number {
    const timerId = id;
    id++;
    const fn = (): void => {
        timerObj[timerId] = setTimeout(() => {
            fn();
        }, time);
        cb();
    }
    timerObj[timerId] = setTimeout(fn, time);
    return timerId;
}

export function clearCustomInterval(id: number) {
    clearTimeout(timerObj[id]);
}

const myId = setIntervalBySetTimeout(() => {
    console.log(111);
    clearCustomInterval(myId);
    delete timerObj[myId]
}, 1000);