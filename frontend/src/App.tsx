import { useEffect, useState } from 'react';

import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc, DocumentData } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Home from './components/Home';
import ThemedCard from './components/ThemedCard';

import { IPokemonData, ITeamData } from './components/Types';

import firebaseConfig from './firebase_config.json';
import './App.css';
import pokeball from './pokeball.png';

function App() {
	const app = initializeApp(firebaseConfig);
	// Auth
	const auth = getAuth(app);
	const [user, loading, error] = useAuthState(auth);
	// Database
	const db = getFirestore(app);
	const googleProvider = new GoogleAuthProvider();

	// Team
	const [team, setTeam] = useState<ITeamData>();

	// API URL
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				const team = await getTeamByUser(user.uid).then((res) => res.data[0]);
				if (!team) {
					const teamId = await createTeam(user.uid).then((res) => res.data.id);
					const team = await getTeam(teamId).then((res) => res.data);
					setTeam(team);
				} else {
					setTeam(team);
				}
			}
		};

		fetchData().catch((err) => console.error(err));
	}, [user]);

	const createTeam = async (uid: string) => {
		if (!apiUrl) {
			throw new Error('Invalid API URL!');
		}
		const payload = { owner: uid, pokemon: [] };
		return axios.post(apiUrl + '/teams', payload);
	};

	const updateTeam = async (payload: any) => {
		if (!apiUrl) {
			throw new Error('Invalid API URL!');
		}
		return axios.patch(apiUrl + '/teams/' + payload.id, payload);
	};

	const getTeamByUser = (uid: string) => {
		if (!apiUrl) {
			throw new Error('Invalid API URL!');
		} else if (!uid) {
			throw new Error('User ID is missing!');
		}
		return axios.get<ITeamData[]>(apiUrl + '/teams' + '?owner=' + uid);
	};

	const getTeam = (id: string) => {
		if (!apiUrl) {
			throw new Error('Invalid API URL!');
		} else if (!id) {
			throw new Error('Resource ID is missing!');
		}
		return axios.get<ITeamData>(apiUrl + '/teams/' + id);
	};

	const addPokemon = (pokemonData: IPokemonData) => {
		if (!team?.pokemon) {
			return;
		}
		const newPokemonArray = team.pokemon.map((item) => item);
		newPokemonArray.push(pokemonData);
		setTeam((prevValue) => {
			const newTeam = { ...prevValue, pokemon: newPokemonArray };
			const update = async () => {
				updateTeam(newTeam).then((res) => console.log(res.data));
			};
			update();
			return newTeam;
		});
	};

	const googleSignIn = async () => {
		const usersCollection = collection(db, 'users');
		try {
			const { user } = await signInWithPopup(auth, googleProvider);
			const usersQuery = query(usersCollection, where('uid', '==', user.uid));
			const users = (await getDocs(usersQuery)).docs.map((doc) => doc.data());
			if (!users.length) {
				await addDoc(usersCollection, {
					uid: user.uid,
					name: user.displayName,
					authProvider: 'google',
					email: user.email,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const logout = () => {
		signOut(auth);
	};

	return (
		<>
			<Navbar bg='dark' expand='lg'>
				<Container className='justify-content-between px-4'>
					<Navbar.Brand>
						<img src={pokeball} height={25} width={25} />
					</Navbar.Brand>
					{user ? (
						<Button size='sm' variant='secondary' onClick={logout}>
							Logout
						</Button>
					) : null}
				</Container>
			</Navbar>
			<Container className='text-center'>
				{user ? (
					<ThemedCard title={<h2 className='m-2'>{user.displayName}'s Team</h2>}>
						<Home logout={logout} team={team} addPokemon={addPokemon} />
					</ThemedCard>
				) : (
					<ThemedCard title={<h2 className='m-2'>Please Sign In!</h2>}>
						<Button onClick={googleSignIn}>Sign In</Button>
					</ThemedCard>
				)}
			</Container>
		</>
	);
}

export default App;
