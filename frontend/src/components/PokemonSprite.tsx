import { ISpritesData } from './Types';

export default (props: { data: ISpritesData; spriteName: string }) => {
	type ObjectKey = keyof typeof props.data;
	const spriteName = props.spriteName as ObjectKey;
	const spriteUrl = props.data[spriteName];
	return spriteUrl ? <img className='border shadow-sm bg-light m-1' src={spriteUrl} style={{ height: '98px', width: '98px' }} /> : null;
};
