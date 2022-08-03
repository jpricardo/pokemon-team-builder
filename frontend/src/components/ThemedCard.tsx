import Card from 'react-bootstrap/Card';

import styles from './ThemedCard.module.css';

type Props = { title: React.ReactNode | string; children: React.ReactNode; hover?: boolean | undefined };
const ThemedCard: React.FC<Props> = (props) => {
	return (
		<Card className={'border border-dark rounded-top shadow my-1 mx-1' + styles.card}>
			<Card.Header className={styles.header}>
				<Card.Title>{props.title}</Card.Title>
			</Card.Header>
			<Card.Body className={props.hover ? styles.hover : ''}>{props.children}</Card.Body>
		</Card>
	);
};

export default ThemedCard;
