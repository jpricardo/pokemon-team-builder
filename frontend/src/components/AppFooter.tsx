import { Container } from 'react-bootstrap';

import styles from './AppFooter.module.css';

const AppFooter: React.FC = () => (
	<Container className='my-2'>
		<a className={styles.link} href='https://github.com/jpricardo' target='_blank'>
			<small>@jpricardo</small>
		</a>
	</Container>
);

export default AppFooter;
