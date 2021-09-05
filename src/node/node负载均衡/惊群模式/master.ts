import net from 'net';
import { fork, ChildProcess } from 'child_process';
import { cpus } from 'os'
import { resolve as pathResolve } from 'path';

const server = net.createServer();
const childProcessList: ChildProcess[] = [];

server.on('error', (err) => {
	console.log(err);
});

const batchCreateChildProcess = (server: net.Server) => {
	const cpusLength = cpus().length;
	for (let i = 0; i < cpusLength; i++) {
		handleForkChild(server)
	}
}

const handleForkChild = (server: net.Server) => {
	const child = fork(pathResolve(__dirname, './child.ts'));
	const processIdx = childProcessList.push(child);
	child.send('server', server);
	child.on('exit', () => {
		console.log(`进程${child.pid}退出`);
		childProcessList.splice(processIdx, 1);
		handleForkChild(server);
	});
}

server.listen(3000, () => {
	batchCreateChildProcess(server);
	console.log(`server is listening on ${3000}`)
});