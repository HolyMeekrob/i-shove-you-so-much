import { Game } from '../game/model/game';

export class GameTracker {
	private _nextId: number;
	private readonly _games: Map<number, Game>;

	constructor() {
		this._games = new Map<number, Game>();
		this._nextId = 1;
	}

	public create(game: Game): number {
		const id = this._nextId;
		this._games.set(id, game);
		this._nextId += 1;

		return id;
	}

	public get(id: number): Game {
		const game = this._games.get(id);

		if (game === undefined) {
			throw new Error(`There is no game with id ${id}`);
		}

		return game;
	}
}
