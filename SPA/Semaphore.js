export default function Semaphore() {
    let value = 1;
    let queue = [];

    const clazz = {
        P: func => {
            value = value-1;
            if(value < 0) queue.push(func);
            else func();
        },
        V: () => {
            value = value+1;
            if(value <= 0) queue.shift()();
        }
    };

    return clazz;
}