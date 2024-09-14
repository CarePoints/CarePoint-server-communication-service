import express, { Application } from 'express';
import http from 'http';
import { VideoCallController } from './presentation/controllers/VideoCallController';

const app: Application = express();
const server = http.createServer(app);

new VideoCallController(server);


const PORT = 10000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));