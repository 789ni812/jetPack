import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { GameState, Player as PlayerType } from '../../types/game';
import { Player } from './Player';

const initialPlayer: PlayerType = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  isJetpackActive: false,
  health: 100,
  score: 0,
};

const initialGameState: GameState = {
  player: initialPlayer,
  isGameRunning: false,
  isGameOver: false,
  level: 1,
  platforms: [],
};

// Physics/game loop as a component
function GameLoop({ player, isJetpackActive, setPlayer }: { player: PlayerType, isJetpackActive: boolean, setPlayer: (p: PlayerType) => void }) {
  useFrame(() => {
    // Update player position based on velocity
    const newPosition = {
      x: player.position.x + player.velocity.x,
      y: player.position.y + player.velocity.y,
    };

    // Physics constants
    const gravity = -0.1;
    const jetpackThrust = 0.25;

    // Apply physics
    const newVelocity = {
      x: player.velocity.x * 0.95, // Friction only on x
      y: player.velocity.y + (isJetpackActive ? jetpackThrust : gravity),
    };

    // Ground collision
    const groundY = -4;
    if (newPosition.y <= groundY) {
      newPosition.y = groundY;
      // Only stop y-velocity if not using jetpack
      newVelocity.y = isJetpackActive ? jetpackThrust : 0;
    }

    setPlayer({
      ...player,
      position: newPosition,
      velocity: newVelocity,
    });
  });
  return null;
}

export const Game = () => {
  const [player, setPlayer] = useState<PlayerType>(initialPlayer);
  const isJetpackActive = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        isJetpackActive.current = true;
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        isJetpackActive.current = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="game-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Player player={{ ...player, isJetpackActive: isJetpackActive.current }} />
        <GameLoop player={player} isJetpackActive={isJetpackActive.current} setPlayer={setPlayer} />
      </Canvas>
    </div>
  );
}; 