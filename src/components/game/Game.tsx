import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { Player as PlayerType } from '../../types/game';
import { Player } from './Player';
import { GameLoop } from './GameLoop';

const initialPlayer: PlayerType = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  isJetpackActive: false,
  health: 100,
  score: 0,
};

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