import { Game } from '../game/model/game';
import { GameFactory } from './gameFactory';
import { INewGameInput } from './newGameInput';

export class GameTracker {
	private nextId: number;
	private readonly games: Map<number, Game>;
	private readonly gameFactory: GameFactory;

	constructor() {
		this.games = new Map<number, Game>();
		this.nextId = 1;
		this.gameFactory = new GameFactory();
	}

	public create(input: INewGameInput): number {
		const id = this.nextId;
		const game = this.gameFactory.createGame(input);
		this.games.set(id, game);
		this.nextId += 1;

		return id;
	}

	public get(id: number): Game {
		const game = this.games.get(id);

		if (game === undefined) {
			throw new Error(`There is no game with id ${id}`);
		}

		return game;
	}
}
