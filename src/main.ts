import { API_URL } from "./config/constants";
import { fetchRoundsData } from "./services/rounds";
import { GameData } from "./types/rounds";
import { roundsHtml } from "./views/rounds";

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

  container.innerHTML = '';

  games.forEach(game => {
    const html = roundsHtml(game)

    container.innerHTML += html;
  });
};

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

document.addEventListener('DOMContentLoaded', () => {
  fetchRoundsData({
    apiUrl: API_URL,
    handleResponse,
    handleData,
  });
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
