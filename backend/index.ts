import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import apiRouter from './api.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

// Middleware
app.use((req, res, next) => {
	console.log(`${new Date().toLocaleString()} - ${req.method} ${req.ip} ${req.path} ${res.statusCode}`);
	next();
});

const allowedOrigins = ['https://pokemon-team-builder-1a601.web.app', 'http://localhost:3000'];

const corsOption: cors.CorsOptions = {
	origin: allowedOrigins,
};
app.use(cors(corsOption));

app.use(express.json());
app.use('/api', apiRouter);

// 404 Response
app.get('*', (req, res) => {
	res.send({ error: 'Page not found!' }).status(404);
});

// Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ error: 'Something went wrong!' });
};
app.use(errorHandler);

// Listen to connections
app.listen(port, () => {
	console.log(`[🌞] Server is UP and RUNNING on port ${port}`);
});
