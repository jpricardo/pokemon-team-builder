import Card from 'react-bootstrap/Card';

const ThemedCard: React.FC<any> = (props) => {
	return (
		<Card className='border border-dark rounded-top shadow my-4'>
			<Card.Header style={{ color: 'white', backgroundColor: '#DD3931' }}>
				<Card.Title>{props.title}</Card.Title>
			</Card.Header>
			<Card.Body>{props.children}</Card.Body>
		</Card>
	);
};

export default ThemedCard;
