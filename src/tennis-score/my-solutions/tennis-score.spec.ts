import { describe, it, expect, beforeEach } from 'vitest'
import { TennisGame } from './tennis-score'

describe('TennisScore', () => {
  let game: InstanceType<typeof TennisGame>
  beforeEach(() => {
    game = new TennisGame()
  })
  it('should have 2 players well init', () => {
    expect(game.players[0]).toStrictEqual({ score: 0, game: 0 })
    expect(game.players[1]).toStrictEqual({ score: 0, game: 0 })
  })

  it('should increment player 1 score', () => {
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].score).toEqual(1)
  })

  it('should increment player 2 score', () => {
    game.incrementScoreByPlayerIndex(1)
    expect(game.players[1].score).toEqual(1)
  })

  it('should not add a game if both players have 3 points', () => {
    game.players[0].score = 3
    game.players[1].score = 2
    game.incrementScoreByPlayerIndex(1)
    expect(game.players[0].score).toEqual(3)
    expect(game.players[0].game).toEqual(0)
    expect(game.players[1].score).toEqual(3)
    expect(game.players[1].game).toEqual(0)
  })

  it('should set deuce when score goes from 3-2 to 3-3', () => {
    game.players[0].score = 3
    game.players[1].score = 2
    game.incrementScoreByPlayerIndex(1)
  })

  it('should add a game to player 1', () => {
    game.players[0].score = 3
    game.players[1].score = 2
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].game).toEqual(1)
  })

  it('should not add a game to player 1', () => {
    game.players[0].score = 3
    game.players[1].score = 3
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].game).toEqual(0)
  })

  it.todo('should win a love game (4 points in a row from 0-0)')
  it.todo('should win the game after advantage (deuce, then 2 points)')
  it.todo('should not win after advantage on a single point (5-3 needed, not 4-3)')
  it.todo('should return to deuce when the opponent had advantage')
})
