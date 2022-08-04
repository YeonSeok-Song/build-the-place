import cors from 'cors';
import express from 'express';
import http from 'http';
import { errorMiddleware } from './middlewares/error_message';
import { userAuthRouter } from './routers/userRouter';
import { Client } from "@notionhq/client"
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
    res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

const httpServer = http.createServer(app);

app.use(errorMiddleware);

export { httpServer};