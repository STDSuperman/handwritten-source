import { createServer } from 'http';
import net from 'net'

const server = createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end(`hello, this request is handled by ${process.pid}`)
})

process.on('message', (type: string, parentServer: net.Server) => {
	if (type !== 'server') return;
	console.log(`进程pid：${process.pid}`)
	parentServer.on('connection', (socket: net.Socket) => {
		server.emit('connection', socket);
	})
})