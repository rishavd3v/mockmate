import express from 'express';
import cors from 'cors';
const app = express();
import chatRoute from './routes/chat.js';
import mockRoute from './routes/mock.js';
import feedbackRoute from './routes/feedback.js';
import { verifyToken } from './middleware/authMiddleware.js';

app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/chat',verifyToken, chatRoute);
app.use('/mock',verifyToken, mockRoute);
app.use('/feedback',verifyToken, feedbackRoute);

app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});