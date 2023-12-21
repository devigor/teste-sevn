export type GameData = {
  round: number;
  games: Game[];
}

export type Game = {
  team_home_id: string;
  team_home_name: string;
  team_home_score: number;
  team_away_id: string;
  team_away_name: string;
  team_away_score: number;
}
