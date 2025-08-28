import express from 'express';
import cors from 'cors';
const app = express();
import generateRoute from './routes/generate.js';
import interviewRoute from './routes/interview.js';
import feedbackRoute from './routes/feedback.js';
import { verifyToken } from './middleware/authMiddleware.js';

app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/generate',verifyToken, generateRoute);
app.use('/interview',verifyToken, interviewRoute);
app.use('/feedback',verifyToken, feedbackRoute);

app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});