import { Col, Row } from 'react-bootstrap';

import TeamPokemonCard from './TeamPokemonCard';

import { IPokemonData } from './Types';

type Props = { items: Array<IPokemonData>; onClick?: (name: string) => void; removeItem?: (pokemonIndex: number) => void };
const TeamPokemonList: React.FC<Props> = (props) => {
	return (
		<Row>
			{props.items.map((item, index) => (
				<Col className='my-1' lg={6} key={item.name}>
					<TeamPokemonCard onClick={props.onClick} data={item} index={index} removeItem={props.removeItem} />
				</Col>
			))}
		</Row>
	);
};

export default TeamPokemonList;
