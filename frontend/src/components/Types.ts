export interface IPokemonData {
	name: string;
	url: string;
	customName?: string;
	lvl?: number;
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

export interface IPokemonRequestResponse {
	results: Array<IPokemonData>;
}

export interface ITeamData {
	owner?: string;
	id?: string;
	pokemon: Array<IPokemonData>;
}
