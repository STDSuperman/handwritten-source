import net from 'net';
import { fork, ChildProcess } from 'child_process';
import { cpus } from 'os'
import { resolve as pathResolve } from 'path';

const server = net.createServer();
const childProcessList: ChildProcess[] = [];
let curHandlerProcessIdx = 0;

server.on('error', (err) => {
	console.log(err);
});

server.on('connection', (socket: net.Socket) => {
	console.log(`新连接`)
	const child = childProcessList[curHandlerProcessIdx];
	child.send('server', socket);
	curHandlerProcessIdx = (curHandlerProcessIdx + 1) % childProcessList.length;
})

const batchCreateChildProcess = () => {
	const cpusLength = cpus().length;
	console.log(`cpus: ${cpusLength}`)
	for (let i = 0; i < cpusLength; i++) {
		handleForkChild()
	}
}

const handleForkChild = () => {
	const child = fork(pathResolve(__dirname, './child.ts'));
	const processIdx = childProcessList.push(child);
	child.on('exit', () => {
		console.log(`进程${child.pid}退出`);
		childProcessList.splice(processIdx, 1);
		handleForkChild();
	});
}

server.listen(3000, () => {
	batchCreateChildProcess();
	console.log(`server is listening on ${3000}`)
	net.createConnection({
		port: 3000
	}, () => {
		console.log('服务唤醒')
	})
});