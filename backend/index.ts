import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

const mockTeams = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${new Date().toLocaleString()} - ${req.ip} ${req.path} ${res.statusCode}`);
	next();
});

app.get('/', (req, res) => {
	res.send('Salve!');
});

app.get('/team', (req, res) => {
	res.send(mockTeams);
});

app.get('/team/:id', (req, res, next) => {
	const team = mockTeams.find((team) => team.id == parseInt(req.params.id));
	if (team) {
		res.send(team);
	} else {
		next();
	}
});

app.get('*', (req, res) => {
	res.send({ error: 'Page not found!' }).status(404);
});

app.listen(port, () => {
	console.log(`[🌞] Server is UP and RUNNING on port ${port}`);
});
