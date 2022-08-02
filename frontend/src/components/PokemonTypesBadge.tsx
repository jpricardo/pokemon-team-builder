import { ITypesData } from './Types';

export default (props: { data: ITypesData }) => {
	const typeColors = {
		normal: { background: '#AEAD7D', text: 'black' },
		fighting: { background: '#c13029', text: 'black' },
		flying: { background: '#96a6e1', text: 'black' },
		poison: { background: '#bb5a9f', text: 'black' },
		ground: { background: '#e7d4a9', text: 'black' },
		rock: { background: '#BEA563', text: 'black' },
		bug: { background: '#A9BD42', text: 'black' },
		ghost: { background: '#6762b2', text: 'black' },
		steel: { background: '#AFADC3', text: 'black' },
		fire: { background: '#cc3502', text: 'black' },
		water: { background: '#1F93F6', text: 'black' },
		grass: { background: '#73DA65', text: 'black' },
		electric: { background: 'yellow', text: 'black' },
		psychic: { background: '#FD6FA1', text: 'black' },
		ice: { background: '#47CEE4', text: 'black' },
		dragon: { background: '#8567ED', text: 'black' },
		dark: { background: 'black', text: 'white' },
		fairy: { background: '#F6B1EA', text: 'black' },
	};

	const getBackgroundColor = () => typeColors[name]?.background ?? 'grey';
	const getTextColor = () => typeColors[name]?.text ?? 'black';

	type ObjectKey = keyof typeof typeColors;
	const name = props.data.type.name as ObjectKey;
	const color = getTextColor();
	const backgroundColor = getBackgroundColor();
	const fontSize = '0.75rem';

	return (
		<span className='pokemon-type border rounded p-2 m-auto text-uppercase' style={{ color, backgroundColor, fontSize }}>
			{name}
		</span>
	);
};
