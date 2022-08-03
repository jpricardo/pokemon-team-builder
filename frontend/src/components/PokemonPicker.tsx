import { useState } from 'react';

import { Col, Form, Row } from 'react-bootstrap';

import AddPokemonList from './AddPokemonList';

import { IPokemonData } from './Types';

type Props = { allPokemon: Array<IPokemonData>; addPokemon: (name: string) => void; nextStep: () => void; prevStep: () => void };
const PokemonPicker: React.FC<Props> = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleClick = (name: string) => {
		props.addPokemon(name);
		// props.nextStep();
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
