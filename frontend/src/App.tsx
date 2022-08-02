import { useEffect, useState } from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import Home from './components/Home';
import ThemedCard from './components/ThemedCard';

const AppContainer: React.FC<any> = (props) => {
	return (
		<div className='App'>
			<Container>
				<ThemedCard title={<h2 className='m-2'>Pokémon Team Builder</h2>}>{props.children}</ThemedCard>
			</Container>
		</div>
	);
};

function App() {
	return (
		<AppContainer>
			<Home />
		</AppContainer>
	);
}

export default App;
