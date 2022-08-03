import { User } from 'firebase/auth';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import pokeball from './pokeball.png';

type Props = { user: User | null | undefined; logout: () => void };
const AppNavbar: React.FC<Props> = (props) => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container className='justify-content-between'>
				<Navbar.Brand>
					<img className='mx-2' src={pokeball} height={25} width={25} />
					Team Builder
				</Navbar.Brand>
				{props.user ? (
					<Button size='sm' variant='secondary' onClick={props.logout}>
						Logout
					</Button>
				) : null}
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
