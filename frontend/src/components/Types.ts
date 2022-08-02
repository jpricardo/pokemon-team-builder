export interface IPokemonData {
	name: string;
	url: string;
}

export interface ITypesData {
	slot: number;
	type: { name: string };
}

export interface ISpritesData {
	front_default: string;
	back_default: string;
}


export interface ISpeciesData {
	name: string;
	url: string;
	types: Array<ITypesData>;
	sprites: ISpritesData;
}

export interface IPokemonTeamMember {
	name: string;
	url: string
	lvl: number;
}

export interface IPokemonRequestResponse {
	results: Array<IPokemonData>
}