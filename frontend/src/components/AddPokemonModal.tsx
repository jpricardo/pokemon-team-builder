import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import Modal from 'react-bootstrap/Modal';

import AddPokemonList from './AddPokemonList';
import { IPokemonData } from './Types';

const PokemonPicker = (props: { allPokemon: Array<IPokemonData>; addPokemon: any; nextStep: any }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleClick = (name: string) => {
		props.addPokemon(name);
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

export default (props: { allPokemon: Array<IPokemonData>; show: boolean; handleClose: any; addPokemon: any }) => {
	const [step, setStep] = useState(0);
	const nextStep = () => setStep((prevValue) => prevValue + 1);
	const prevStep = () => setStep((prevValue) => prevValue - 1);

	const formSteps = [<PokemonPicker allPokemon={props.allPokemon} addPokemon={props.addPokemon} nextStep={nextStep} />];

	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header className='p-3' style={{ color: 'white', backgroundColor: '#DD3931' }} closeButton>
				<Modal.Title as='h3'>Add Pokémon</Modal.Title>
			</Modal.Header>
			<Modal.Body>{formSteps[step]}</Modal.Body>
		</Modal>
	);
};
