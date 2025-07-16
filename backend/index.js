import express from 'express';
import cors from 'cors';
const app = express();

import chatRoute from './routes/chat.js';
import mockRoute from './routes/mock.js';

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());
app.use('/chat',chatRoute);
app.use('/mock',mockRoute);

app.get('/', (req, res) => {
    res.send('server is running');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});