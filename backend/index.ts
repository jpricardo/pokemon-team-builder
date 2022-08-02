import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Salve!');
});

app.listen(port, () => {
	console.log(`[🌞] Server is UP and RUNNING on port ${port}`);
});
