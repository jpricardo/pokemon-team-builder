import { useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

import AddPokemonModal from './AddPokemonModal';
import PokemonTypesBadge from './PokemonTypesBadge';
import PokemonSprite from './PokemonSprite';

import axios from 'axios';
import { ISpeciesData, ITypesData, ISpritesData } from './Types';
import './PokemonTypesBadge.css';

const AddPokemonCard = (props: { data: ISpeciesData; onClick: any }) => {
	const [pokemonData, setPokemonData] = useState<ISpeciesData>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			getPokemonData();
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [props.data.name]);

	const getPokemonData = () => {
		axios
			.get<ISpeciesData>(props.data.url)
			.then((res) => {
				console.log(res.data);
				setPokemonData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const getPokemonSprite = (name: string) => {
		if (pokemonData) {
			return <PokemonSprite data={pokemonData.sprites} spriteName={name} />;
		}
		return <Spinner style={{ height: '98px', width: '98px' }} animation='grow' role='status' />;
	};

	const handleClick = () => {
		if (props.onClick) {
			props.onClick(props.data.name);
		}
	};

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

export default (props: { items: Array<any>; onClick?: any }) => {
	return (
		<Stack gap={2}>
			{props.items.map((item) => (
				<AddPokemonCard onClick={props.onClick} key={item.name} data={item} />
			))}
		</Stack>
	);
};
