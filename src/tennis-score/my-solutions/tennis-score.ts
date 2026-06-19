interface Player {
  score: 0 | 1 | 2 | 3
  game: number
  advantage: boolean
}

export class TennisGame {
  players: Array<Player> = [
    { score: 0, game: 0, advantage: false },
    { score: 0, game: 0, advantage: false }
  ]

  public incrementScoreByPlayerIndex(playerIndex: number) {
    this.incrementScore(playerIndex)
    const otherPlayerIndex = playerIndex === 0 ? 1 : 0

    if (this.players[playerIndex].score === 3) {
      // game is deuce 40 - 40
      if (TennisGame.isDeuce(this)) {
        // player already has advantage, he win the game
        if (this.players[playerIndex].advantage) {
          this.incrementGame(playerIndex)
          this.startNewGame()
        }
        // player do not have advantage, he takes advantage
        else {
          this.players[playerIndex].advantage = true
          this.players[otherPlayerIndex].advantage = false
        }
      }
      // game is not deuce
      else {
        this.incrementGame(playerIndex)
        this.startNewGame()
      }
    }
  }

  startNewGame() {
    this.players.map((_, index) => {
      this.players[index].score = 0
      this.players[index].advantage = false
    })
  }

  incrementScore(playerIndex: number) {
    if (this.players[playerIndex].score < 3) {
      this.players[playerIndex].score++
    }
  }

  incrementGame(playerIndex: number) {
    this.players[playerIndex].game++
  }

  static isDeuce(Game: InstanceType<typeof TennisGame>): boolean {
    return Game.players[0].score === 3 && Game.players[1].score === 3
  }
}
