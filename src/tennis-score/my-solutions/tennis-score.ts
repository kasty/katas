interface Player {
  score: number
  game: number
}

export class TennisGame {
  players: Array<Player> = [
    { score: 0, game: 0 },
    { score: 0, game: 0 }
  ]

  public incrementScoreByPlayerIndex(playerIndex: number) {
    this.players[playerIndex].score++
    const currentPlayerScore = this.players[playerIndex].score
    const otherPlayerScore = this.players[playerIndex === 0 ? 1 : 0].score

    if (currentPlayerScore >= 4 && currentPlayerScore - otherPlayerScore >= 2) {
      this.players[playerIndex].game++
      this.startNewGame()
    }
  }

  private startNewGame() {
    this.players.forEach(player => {
      player.score = 0
    })
  }
}
