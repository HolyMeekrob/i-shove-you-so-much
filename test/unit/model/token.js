import token from '../../../src/model/token';
import chai from 'chai';
const should = chai.should();

describe('token', () => {
	describe('getPlayer()', () => {
		it('should return the player', () => {
			const player = { name: 'Player Name' };
			const square = { data: 5 };
			const gameToken = token(player, square);

			gameToken.getPlayer().should.deep.equal(player);
		});
	});

	describe('getSquare()', () => {
		it('should return the squares', () => {
			const player = { name: 'Player Name' };
			const square = { data: 5 };
			const gameToken = token(player, square);

			gameToken.getSquare().should.deep.equal(square);
		});
	});
});
