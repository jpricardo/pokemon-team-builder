import { useEffect, useState } from 'react';

import { Card, Col, Row, Spinner } from 'react-bootstrap';

import PokemonSprite from './PokemonSprite';
import PokemonTypesBadge from './PokemonTypesBadge';

import axios from 'axios';
import { IPokemonData, ISpeciesData } from './Types';

type Props = { data: IPokemonData; onClick: (pokemonData: IPokemonData) => void };
const AddPokemonCard: React.FC<Props> = (props) => {
	const [pokemonData, setPokemonData] = useState<ISpeciesData>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			getPokemonData();
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [props.data.name]);

	const getPokemonData = () =>
		axios
			.get<ISpeciesData>(props.data.url)
			.then((res) => setPokemonData(res.data))
			.catch((err) => console.error(err));

	const getPokemonSprite = (name: string) =>
		pokemonData ? (
			<PokemonSprite data={pokemonData.sprites} spriteName={name} />
		) : (
			<Spinner style={{ height: '98px', width: '98px' }} animation='grow' role='status' />
		);

	const handleClick = () => props.onClick(props.data);

	return (
		<Card className='shadow border border-dark rounded-top' onClick={handleClick}>
			<Card.Body>
				<Row>
					<Col lg={4} md={4} sm={4} xs={4}>
						{getPokemonSprite('front_default')}
					</Col>
					<Col className='d-flex flex-column justify-content-center'>
						<Row className='text-center mb-2'>
							<span className='text-capitalize me-auto'>{props.data.name.split('-').join(' ')}</span>
						</Row>
						<Row>
							{loading
								? null
								: pokemonData?.types.map((type) => (
										<Col key={type.slot} className='text-center'>
											<PokemonTypesBadge data={type} />
										</Col>
								  ))}
						</Row>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default AddPokemonCard;
