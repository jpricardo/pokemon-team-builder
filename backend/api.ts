import express, { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// try {
// 	const credsFile = fs.readFileSync('firebase_creds.json').toString();
// 	const serviceAccount = JSON.parse(credsFile);
// } catch (e) {
// 	throw new Error('Please provide your Firebase credentials!');
// }

const firebaseCreds = process.env.BASE_64_FIREBASE_CREDENTIALS;
if (!firebaseCreds) throw new Error('Firebase credentials are missing!');

const serviceAccount = JSON.parse(Buffer.from(firebaseCreds, 'base64').toString());
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const teamsDb = db.collection('teams');

const apiRouter = express.Router();

const validateTeamsBody = (req: Request, res: Response, next: NextFunction) => {
	const { pokemon } = req.body;
	if (pokemon && pokemon instanceof Array && pokemon.length <= 6) {
		next();
	} else {
		res.status(400).send({ error: 'Invalid request body!' });
	}
};

// Teams list / post routes
apiRouter
	.route('/teams')
	.get(async (req, res) => {
		const { owner } = req.query;
		if (owner) {
			const teams = (await teamsDb.where('owner', '==', owner).get()).docs.map((team) => team.data());
			res.send(teams);
		} else {
			const teams = (await teamsDb.get()).docs.map((team) => team.data());
			res.send(teams);
		}
	})
	.post(validateTeamsBody, async (req: Request, res: Response) => {
		const newTeam = teamsDb.doc();
		newTeam.set({ ...req.body, id: newTeam.id });
		res.status(201).send({ status: 'OK', id: newTeam.id });
	});

// Teams update / get / delete routes
apiRouter
	.route('/teams/:id')
	.patch(validateTeamsBody, async (req, res) => {
		await teamsDb.doc(req.params.id).update({ ...req.body, id: req.params.id });
		res.status(200).send({ status: 'OK' });
	})
	.get(async (req, res, next) => {
		const teams = (await teamsDb.get()).docs.map((team) => team.data());
		const team = teams.find((team) => team.id === req.params.id);
		if (team) {
			res.send(team);
		} else {
			res.send({ error: 'Resource not found!' }).status(404);
		}
	})
	.delete(async (req, res) => {
		const teams = (await teamsDb.get()).docs.map((team) => team.data());
		const team = teams.find((team) => team.id === req.params.id);
		if (team) {
			team.delete();
		} else {
			res.status(404).send({ error: 'Resource not found!' });
		}
	});

export default apiRouter;
