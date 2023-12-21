import { Game } from "../types/rounds";

export const roundsHtml = (game: Game) => {
  return `
    <div class="rounds_teams">
      <div class="rounds_teams--info">
        <img src="/src/images/shields/${game.team_home_id}.png" alt="Escudo do ${game.team_away_name}" />
        <p>${game.team_home_name}</p>
      </div>
      <div class="rounds_teams--score">
        <p>${game.team_home_score}</p>
        <img src="/src/images/icon_x.svg" alt="Ícone de um X para indicar o placar">
        <p>${game.team_away_score}</p>
      </div>
      <div class="rounds_teams--info">
        <p>${game.team_away_name}</p>
        <img src="/src/images/shields/${game.team_away_id}.png" alt="Escudo do ${game.team_away_name}" />
      </div>
    </div>
  `;
};
