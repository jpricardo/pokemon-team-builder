import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import TeamPokemonList from './TeamPokemonList';
import AddPokemonModal from './AddPokemonModal';

import { IPokemonData, IPokemonRequestResponse } from './Types';
import axios from 'axios';

export default () => {
	const [allPokemon, setAllPokemon] = useState<IPokemonData[]>([]);

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

	const [pokemonTeam, setPokemonTeam] = useState<IPokemonData[]>([]);
	const getPokemonByName = (name: string) => allPokemon.find((pokemon) => pokemon.name === name);

	const addPokemon = (name: string) => {
		const newPokemon = getPokemonByName(name);
		if (newPokemon) {
			setPokemonTeam([...pokemonTeam, newPokemon]);
			// closeModal();
		}
	};
	const removePokemon = (name: string) => setPokemonTeam((oldValue) => oldValue.filter((item) => item.name !== name));

	const [showModal, setShowModal] = useState(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const getTeamCards = () => {
		if (pokemonTeam.length > 0) {
			return pokemonTeam.map((item) => {
				<p>{item?.name}</p>;
			});
		}
		return <p>Cringe</p>;
	};

	return (
		<div className='mx-2'>
			<Row className='mb-2'>
				<Col>
					<TeamPokemonList items={pokemonTeam} removeItem={removePokemon} />
				</Col>
			</Row>
			<Row className='mb-2'>
				<Col>
					{pokemonTeam.length < 6 ? (
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
