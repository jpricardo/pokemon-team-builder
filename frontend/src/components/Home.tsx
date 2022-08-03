import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import TeamPokemonList from './TeamPokemonList';
import AddPokemonModal from './AddPokemonModal';

import { IPokemonData, IPokemonRequestResponse, ITeamData } from './Types';
import axios from 'axios';

const Home: React.FC<any> = (props) => {
	const [allPokemon, setAllPokemon] = useState<IPokemonData[]>([]);
	const pokemonTeam = props.team?.pokemon;

	useEffect(() => {
		getAllPokemon();
	}, []);

	const getAllPokemon = () => {
		axios
			.get<IPokemonRequestResponse>('https://pokeapi.co/api/v2/pokemon?limit=2000')
			.then((res) => {
				console.log(res.data.results);
				setAllPokemon(res.data.results.map((item) => ({ ...item, name: item.name.toUpperCase() })));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const getPokemonByName = (name: string) => allPokemon.find((pokemon) => pokemon.name === name);

	const addPokemon = (name: string) => {
		const foundPokemon = getPokemonByName(name);
		if (foundPokemon) {
			const newPokemon = { ...foundPokemon, customName: foundPokemon.name, lvl: 100 };
			props.addPokemon(newPokemon);
			closeModal();
		}
	};
	const removePokemon = (name: string) => {
		// setPokemonTeam((oldValue) => oldValue.filter((item) => item.name !== name));
	};

	const [showModal, setShowModal] = useState(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<div className='mx-2'>
			<Row className='mb-2'>
				<Col>
					<TeamPokemonList items={pokemonTeam ?? []} removeItem={removePokemon} />
				</Col>
			</Row>
			<Row className='mb-2'>
				<Col>
					{!pokemonTeam || pokemonTeam.length < 6 ? (
						<Button variant='primary' onClick={openModal}>
							+ Add Pokemon
						</Button>
					) : (
						<Button variant='secondary' disabled>
							Your Team is full!
						</Button>
					)}
				</Col>
			</Row>
			<AddPokemonModal addPokemon={addPokemon} allPokemon={allPokemon} show={showModal} handleClose={closeModal} />
		</div>
	);
};

export default Home;
