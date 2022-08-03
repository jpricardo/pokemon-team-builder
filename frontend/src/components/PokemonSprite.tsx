import { ISpritesData } from './Types';

type Props = { data: ISpritesData; spriteName: string };
const PokemonSprite: React.FC<Props> = (props) => {
	type ObjectKey = keyof typeof props.data;
	const spriteName = props.spriteName as ObjectKey;
	const spriteUrl = props.data[spriteName];
	return spriteUrl ? <img className='border shadow-sm bg-light m-1' src={spriteUrl} style={{ height: '98px', width: '98px' }} /> : null;
};

export default PokemonSprite;
