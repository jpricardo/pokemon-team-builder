import { useState } from 'react';

import { Col, Form, Row } from 'react-bootstrap';

import AddPokemonList from './AddPokemonList';

import { IPokemonData } from './Types';

type Props = {
	allPokemon: Array<IPokemonData>;
	nextStep: () => void;
	prevStep: () => void;
	setPokemonData: React.Dispatch<React.SetStateAction<IPokemonData | undefined>>;
};
const PokemonPicker: React.FC<Props> = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleClick = (pokemonData: IPokemonData) => {
		props.setPokemonData(pokemonData);
		props.nextStep();
	};
	return (
		<>
			<Form onSubmit={(e) => e.preventDefault()}>
				<Row>
					<Col className='mb-2'>
						<Form.Control
							type='search'
							placeholder='Type Here...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
							required
						/>
					</Col>
				</Row>
			</Form>
			<Row>
				<Col>
					<AddPokemonList onClick={handleClick} items={props.allPokemon.filter((pokemon) => searchQuery.length > 2 && pokemon.name.includes(searchQuery))} />
				</Col>
			</Row>
		</>
	);
};

export default PokemonPicker;
