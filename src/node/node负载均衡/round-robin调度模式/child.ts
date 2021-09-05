import { createServer } from 'http';
import net from 'net'

const server = createServer((req, res) => {
	console.log(`收到http请求`)
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Connection': 'close'
	});
	res.end(`hello, this request is handled by ${process.pid}`)
});

process.on('message', (type: string, socket: net.Socket) => {
	process.nextTick(() => {
		if (type === 'server' && socket) {
			console.log(`handle process pid is ${process.pid}`)
			server.emit('connection', socket);
			server.emit('connection', socket);
		}
	})
})

console.log(`child process ${process.pid} is OK`)