import { describe, it, expect, beforeEach } from 'vitest'
import { TennisGame } from './tennis-score'

describe('TennisScore', () => {
  let game: InstanceType<typeof TennisGame>
  beforeEach(() => {
    game = new TennisGame()
  })
  it('should have 2 players well init', () => {
    expect(game.players[0]).toStrictEqual({ score: 0, game: 0, advantage: false })
    expect(game.players[1]).toStrictEqual({ score: 0, game: 0, advantage: false })
  })

  it('should increment player 1 score', () => {
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].score).toEqual(1)
  })

  it('should increment player 2 score', () => {
    game.incrementScoreByPlayerIndex(1)
    expect(game.players[1].score).toEqual(1)
  })

  it('should add a game and reset score to 0 if new score is 3', () => {
    game.players[0].score = 2
    game.players[1].score = 1
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].score).toEqual(0)
    expect(game.players[0].game).toEqual(1)
    expect(TennisGame.isDeuce(game)).toBeFalsy()
    expect(game.players[1].advantage).toBeFalsy()
    expect(game.players[1].advantage).toBeFalsy()
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

  it('should set advantage when both players already have 3 points', () => {
    game.players[0].score = 3
    game.players[1].score = 3
    game.incrementScoreByPlayerIndex(1)
    expect(game.players[1].score).toEqual(3)
    expect(game.players[0].score).toEqual(3)
    expect(TennisGame.isDeuce(game)).toBeTruthy()
    expect(game.players[1].advantage).toBeTruthy()
  })

  it('should set add a game to the player who has advantage', () => {
    game.players[0].score = 3
    game.players[1].score = 3
    game.players[1].advantage = true
    game.incrementScoreByPlayerIndex(1)
    expect(game.players[1].score).toEqual(0)
    expect(game.players[0].score).toEqual(0)
    expect(TennisGame.isDeuce(game)).toBeFalsy()
    expect(game.players[1].advantage).toBeFalsy()
    expect(game.players[0].advantage).toBeFalsy()
    expect(game.players[1].game).toEqual(1)
  })

  it('should switch advantage', () => {
    game.players[0].score = 3
    game.players[1].score = 3
    game.players[1].advantage = true
    game.incrementScoreByPlayerIndex(0)
    expect(game.players[0].score).toEqual(3)
    expect(game.players[1].score).toEqual(3)
    expect(TennisGame.isDeuce(game)).toBeTruthy()
    expect(game.players[1].advantage).toBeFalsy()
    expect(game.players[0].advantage).toBeTruthy()
  })
})
