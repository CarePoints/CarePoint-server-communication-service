import express, { Application } from 'express';
import http from 'http';
import { VideoCallController } from './presentation/controllers/VideoCallController';
import connectDatabase from './config/database/connection';
import { ChatController } from './presentation/controllers/ChatController';

connectDatabase()

const app: Application = express();
const app2: Application = express();
const server = http.createServer(app);
const server2  = http.createServer(app2);



new VideoCallController(server);

new ChatController(server2); 


const PORT = 10000;
const PORT2 = 10001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server2.listen(PORT2, () => console.log(`Server running on port ${PORT2}`));