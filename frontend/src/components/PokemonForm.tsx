import { useState } from 'react';

import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';

import AddPokemonCard from './AddPokemonCard';

import { IPokemonData } from './Types';

type Props = {
	pokemonData: IPokemonData | undefined;
	addPokemon: (pokemonData: IPokemonData) => void;
	nextStep: () => void;
	prevStep: () => void;
	closeModal: () => void;
};
const PokemonForm: React.FC<Props> = (props) => {
	const { pokemonData } = props;
	const [customName, setCustomName] = useState<string>(pokemonData?.name ?? '');
	const [lvl, setLvl] = useState<number>(100);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (!pokemonData || !customName || lvl === NaN) return;
		props.addPokemon({ ...pokemonData, customName, lvl });
		props.closeModal();
	};

	if (!pokemonData) return null;
	return (
		<>
			<AddPokemonCard data={pokemonData} onClick={() => {}} />
			<Form onSubmit={handleSubmit}>
				<Row className='mb-2 mt-4'>
					<Col>
						<InputGroup>
							<InputGroup.Text>Name</InputGroup.Text>
							<Form.Control type='text' placeholder='Name your pokémon' value={customName} onChange={(e) => setCustomName(e.target.value)} required />
						</InputGroup>
					</Col>
				</Row>
				<Row className='mb-4'>
					<Col>
						<InputGroup>
							<InputGroup.Text>Lvl</InputGroup.Text>
							<Form.Control
								type='number'
								min={0}
								max={100}
								placeholder='Pokemon Level'
								value={lvl}
								onChange={(e) => setLvl(isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10))}
								required
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button variant='secondary' onClick={props.prevStep}>
							Go Back!
						</Button>
					</Col>
					<Col>
						<Button type='submit'>Add Pokémon!</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default PokemonForm;
