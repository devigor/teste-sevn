import { GameData } from "../types/rounds";

type ServiceRounds = {
  apiUrl: string;
  handleResponse: (response: Response) => Promise<GameData[]>;
  handleData: (games: GameData[]) => void;
}

export const fetchRoundsData = ({ apiUrl, handleData, handleResponse }: ServiceRounds): void => {
  fetch(apiUrl)
    .then(handleResponse)
    .then(handleData)
    .catch((error: Error) => console.error('Erro:', error));
};
