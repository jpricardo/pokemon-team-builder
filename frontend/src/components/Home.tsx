import { useEffect, useState } from 'react';

import { Button, Col, Row } from 'react-bootstrap';

import AddPokemonModal from './AddPokemonModal';
import TeamPokemonList from './TeamPokemonList';

import axios from 'axios';
import { IPokemonData, IPokemonRequestResponse, ITeamData } from './Types';

type Props = { team: ITeamData; addPokemon: (newPokemon: IPokemonData) => void; removePokemon: (pokemonIndex: number) => void };
const Home: React.FC<Props> = (props) => {
	const [allPokemon, setAllPokemon] = useState<IPokemonData[]>([]);
	const pokemonTeam = props.team.pokemon;

	useEffect(() => getAllPokemon(), []);

	const getAllPokemon = () => {
		axios
			.get<IPokemonRequestResponse>('https://pokeapi.co/api/v2/pokemon?limit=2000')
			.then((res) => setAllPokemon(res.data.results.map((item) => ({ ...item, name: item.name.toUpperCase() }))))
			.catch((err) => console.error(err));
	};

	const getPokemonByName = (name: string) => allPokemon.find((pokemon) => pokemon.name === name);

	const addPokemon = (name: string) => {
		const foundPokemon = getPokemonByName(name);
		if (!foundPokemon) return;
		const newPokemon = { ...foundPokemon, customName: foundPokemon.name, lvl: 100 };
		props.addPokemon(newPokemon);
		closeModal();
	};

	// Modal controls
	const [showModal, setShowModal] = useState(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<div className='mx-2'>
			<Row className='mb-2'>
				<Col>
					<TeamPokemonList items={pokemonTeam ?? []} removeItem={props.removePokemon} />
				</Col>
			</Row>
			<Row className='mb-2'>
				<Col>
					{pokemonTeam && pokemonTeam.length < 6 ? (
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
