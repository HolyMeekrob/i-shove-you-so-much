import token from '../../../src/model/token';
import * as pt from '../../../src/model/playerType';
import * as tt from '../../../src/model/tokenType';

import chai from 'chai';
const should = chai.should();

describe('token', () => {
	describe('#constructor', () => {
		describe('when missing all arguments', () => {
			it('should throw an error', () => {
				(() => token()).should.throw(Error);
			});
		});
	});

	describe('#constructor', () => {
		describe('when missing all arguments', () => {
			it('should throw an error', () => {
				(() => token()).should.throw(Error);
			});
		});
	});

	describe('#constructor', () => {
		describe('when missing a player type', () => {
			it('should throw an error', () => {
				(() => token(null, tt.BULLY)).should.throw(Error);
			});
		});
	});

	describe('#constructor', () => {
		describe('when missing a token type', () => {
			it('should throw an error', () => {
				(() => token(pt.PLAYER_ONE, null)).should.throw(Error);
			});
		});
	});

	describe('getPlayerType()', () => {
		it('should return the player type', () => {
			const player = pt.PLAYER_TWO;
			const tokenType = tt.BULLY;
			const gameToken = token(player, tokenType);

			gameToken.getPlayerType().should.equal(player);
		});
	});

	describe('getTokenType()', () => {
		it('should return the tokenType', () => {
			const player = pt.PLAYER_ONE;
			const tokenType = tt.VICTIM;
			const gameToken = token(player, tokenType);

			gameToken.getTokenType().should.equal(tokenType);
		});
	});
});
