import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button, Container, Spinner } from 'react-bootstrap';

import AppFooter from './components/AppFooter';
import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import ThemedCard from './components/ThemedCard';

import axios from 'axios';
import './App.css';
import { IPokemonData, ITeamData } from './components/Types';
import firebaseConfig from './firebase_config.json';

const App: React.FC = () => {
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
				const team = await getTeamsByUser(user.uid).then((res) => res.data[0]);
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
		if (!apiUrl) throw new Error('Invalid API URL!');
		return axios.post(apiUrl + '/teams', { owner: uid, pokemon: [] });
	};

	const updateTeam = async (payload: any) => {
		if (!apiUrl) throw new Error('Invalid API URL!');
		return axios.patch(apiUrl + '/teams/' + payload.id, payload);
	};

	const getTeamsByUser = (uid: string) => {
		if (!apiUrl) throw new Error('Invalid API URL!');
		else if (!uid) throw new Error('User ID is missing!');
		return axios.get<ITeamData[]>(apiUrl + '/teams' + '?owner=' + uid);
	};

	const getTeam = (id: string) => {
		if (!apiUrl) throw new Error('Invalid API URL!');
		else if (!id) throw new Error('Resource ID is missing!');
		return axios.get<ITeamData>(apiUrl + '/teams/' + id);
	};

	const addPokemon = (pokemonData: IPokemonData) => {
		if (!team?.pokemon) return;
		const newPokemonArray = team.pokemon.map((item) => item);
		newPokemonArray.push(pokemonData);
		setTeam((prevValue) => {
			const newTeam = { ...prevValue, pokemon: newPokemonArray };
			const update = async () => updateTeam(newTeam).then((res) => console.log(res.data));
			update();
			return newTeam;
		});
	};

	const removePokemon = (pokemonIndex: number) => {
		if (!team?.pokemon || team.pokemon.length === 0) return;

		const newPokemonArray = team.pokemon.filter((item, index) => index !== pokemonIndex);
		setTeam((prevValue) => {
			const newTeam = { ...prevValue, pokemon: newPokemonArray };
			const update = async () => updateTeam(newTeam).then((res) => console.log(res.data));

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

	const logout = () => signOut(auth);

	const getContent = () => {
		if (user) {
			if (team) return <Home team={team} addPokemon={addPokemon} removePokemon={removePokemon} />;
			return <Spinner style={{ height: '98px', width: '98px' }} animation='grow' role='status' />;
		}
		return <Button onClick={googleSignIn}>Sign In</Button>;
	};

	return (
		<>
			<AppNavbar user={user} logout={logout} />
			<Container className='text-center mt-3'>
				<ThemedCard title={<h2 className='m-2 fs-3'>{user && team ? `${user.displayName}'s Team` : 'Please Sign in!'}</h2>}>{getContent()}</ThemedCard>
			</Container>
			<AppFooter />
		</>
	);
};

export default App;
