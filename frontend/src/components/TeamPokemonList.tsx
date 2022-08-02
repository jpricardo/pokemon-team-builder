import { useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ThemedCard from './ThemedCard';

import PokemonTypesBadge from './PokemonTypesBadge';
import PokemonSprite from './PokemonSprite';

import { ISpeciesData } from './Types';
import axios from 'axios';
import './PokemonTypesBadge.css';

const AddPokemonCard = (props: { data: ISpeciesData; onClick: any; removeItem: any }) => {
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

	const handleDelete = () => {
		if (props.removeItem) {
			props.removeItem(props.data.name);
		}
	};

	return (
		<ThemedCard
			title={
				<Row className='justify-content-end'>
					<Col lg={2} md={2} sm={2} xs={2}>
						<Button onClick={handleDelete} variant='danger' size='sm'>
							X
						</Button>
					</Col>
				</Row>
			}
		>
			<Row>
				<Col lg={6} md={6} sm={3}>
					<Row className='mb-2'>
						<Col>{getPokemonSprite('front_default')}</Col>
						<Col>{getPokemonSprite('back_default')}</Col>
					</Row>
				</Col>
				<Col className='d-flex flex-column justify-content-center'>
					<Row className='mb-2'>
						<span className='text-capitalize me-auto'>{props.data.name.split('-').join(' ')}</span>
					</Row>
					<Row className='mb-2'>
						<span className='small'>lvl. 100</span>
					</Row>
					<Row className='mb-2'>
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
		</ThemedCard>
	);
};

export default (props: { items: Array<any>; onClick?: any; removeItem?: any }) => {
	return (
		<Row>
			{props.items.map((item) => (
				<Col className='my-2' lg={6} key={item.name}>
					<AddPokemonCard onClick={props.onClick} data={item} removeItem={props.removeItem} />
				</Col>
			))}
		</Row>
	);
};
