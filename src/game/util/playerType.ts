import { curry } from 'ramda';

import { PlayerType } from '../model/playerType';
import { Token } from '../model/token';

export const isTokenForPlayer = curry((player: PlayerType, token: Token): boolean =>
	token.playerType === player);

export const getNextPlayerTurn = (currentTurn: PlayerType): PlayerType =>
	currentTurn === PlayerType.PlayerOne
		? PlayerType.PlayerTwo
		: PlayerType.PlayerOne;
