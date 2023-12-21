const API_URL = "https://sevn-pleno-esportes.deno.dev";

interface GameData {
  round: number;
  games: Game[];
}

interface Game {
  team_home_id: string;
  team_home_name: string;
  team_home_score: number;
  team_away_id: string;
  team_away_name: string;
  team_away_score: number;
}

let currentRound = 0;
let data: GameData[] = [];

const updateButtonsState = (): void => {
  const prevBtn = document.getElementById('prev') as HTMLButtonElement;
  const nextBtn = document.getElementById('next') as HTMLButtonElement;

  prevBtn.disabled = currentRound === 0;
  nextBtn.disabled = currentRound === data.length - 1;
};

const handleResponse = (response: Response): Promise<GameData[]> => {
  if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.status}`);
  }
  return response.json();
};

const handleData = (games: GameData[]): void => {
  data = games;
  updateView();
};

const updateView = (): void => {
  const { games } = data[currentRound];
  const container = document.querySelector('.rounds_teams--container') as HTMLDivElement;
  const roundNumberText = document.querySelector('.rounds_text--subtitle') as HTMLParagraphElement;

  roundNumberText.innerHTML = `Rodada ${currentRound + 1}`;

  const mapResult: any[] = [];
  games.map(game => {

    const html = `
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

    mapResult.push(html);
  })

  const transformToHtml = mapResult.join().replace('\n', '').replace(',', '').toString();

  container!.innerHTML = transformToHtml;

}

const fetchData = (): void => {
  fetch(API_URL)
    .then(handleResponse)
    .then(handleData)
    .catch((error: Error) => console.error('Erro:', error));
};

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  updateButtonsState();
});
prevBtn!.addEventListener('click', () => {
  if (currentRound > 0) {
    currentRound -= 1;
    updateView();
    updateButtonsState();
  }
});

nextBtn!.addEventListener('click', () => {
  if (currentRound < data.length - 1) {
    currentRound += 1;
    updateView();
    updateButtonsState();
  }
});
