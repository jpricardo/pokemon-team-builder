import { Stack } from 'react-bootstrap';

import AddPokemonCard from './AddPokemonCard';

import { IPokemonData } from './Types';

const AddPokemonList = (props: { items: Array<IPokemonData>; onClick: (name: string) => void }) => {
	return (
		<Stack gap={2}>
			{props.items.map((item) => (
				<AddPokemonCard onClick={props.onClick} key={item.name} data={item} />
			))}
		</Stack>
	);
};

export default AddPokemonList;
