import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';

import PokemonSprite from './PokemonSprite';
import PokemonTypesBadge from './PokemonTypesBadge';
import ThemedCard from './ThemedCard';

import axios from 'axios';
import { IPokemonData, ISpeciesData } from './Types';
import styles from './TeamPokemonCard.module.css';

type Props = { data: IPokemonData; onClick?: (name: string) => void; removeItem?: (pokemonIndex: number) => void; index: number };
const TeamPokemonCard: React.FC<Props> = (props) => {
	const [pokemonData, setPokemonData] = useState<ISpeciesData>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getSpeciesData();
		setLoading(false);
	}, [props.data.name]);

	const getSpeciesData = () =>
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

	const handleClick = () => props.onClick && props.onClick(props.data.name);
	const handleDelete = () => props.removeItem && props.removeItem(props.index);

	const cardTitle = (
		<Row className='justify-content-end'>
			<Col lg={2} md={2} sm={2} xs={2}>
				<Button className={styles.deleteButton} onClick={handleDelete} variant='danger' size='sm'>
					X
				</Button>
			</Col>
		</Row>
	);

	return (
		<ThemedCard title={cardTitle} hover>
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

export default TeamPokemonCard;
