import { useState } from 'react';

import { Modal } from 'react-bootstrap';

import PokemonPicker from './PokemonPicker';
import PokemonForm from './PokemonForm';

import { IPokemonData } from './Types';

type Props = { show: boolean; allPokemon: Array<IPokemonData>; handleClose: () => void; addPokemon: (pokemonData: IPokemonData) => void };
const AddPokemonModal: React.FC<Props> = (props) => {
	const [step, setStep] = useState(0);
	const [pokemonData, setPokemonData] = useState<IPokemonData>();

	const nextStep = () => setStep((prevValue) => prevValue + 1);
	const prevStep = () => setStep((prevValue) => prevValue - 1);

	const handleClose = () => {
		setStep(0);
		props.handleClose();
	};

	const formSteps = [
		<PokemonPicker allPokemon={props.allPokemon} nextStep={nextStep} prevStep={prevStep} setPokemonData={setPokemonData} />,
		<PokemonForm pokemonData={pokemonData} addPokemon={props.addPokemon} nextStep={nextStep} prevStep={prevStep} closeModal={handleClose} />,
	];

	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header className='p-3' style={{ color: 'white', backgroundColor: '#DD3931' }} closeButton>
				<Modal.Title as='h3'>Add Pokémon</Modal.Title>
			</Modal.Header>
			<Modal.Body>{formSteps[step]}</Modal.Body>
		</Modal>
	);
};

export default AddPokemonModal;
