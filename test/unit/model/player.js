import player from '../../../src/model/player';
import chai from 'chai';
const should = chai.should();

describe('player', () => {
	describe('#constructor', () => {
		describe('when given zero arguments', () => {
			it('should throw an error', () => {
				(() => player()).should.throw(Error);
			});
		});
	});

	describe('getPlayerName()', () => {
		it('should return the player\'s name', () => {
			const name = 'Player Name';
			const gamePlayer = player(name);

			gamePlayer.getPlayerName().should.equal(name);
		});
	});
});
