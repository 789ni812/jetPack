export interface Player {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  isJetpackActive: boolean;
  health: number;
  score: number;
}

export interface GameState {
  player: Player;
  isGameRunning: boolean;
  isGameOver: boolean;
  level: number;
  platforms: Platform[];
}

export interface Platform {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  type: 'normal' | 'moving' | 'disappearing';
}

export interface GameControls {
  moveLeft: boolean;
  moveRight: boolean;
  jetpackActive: boolean;
} 