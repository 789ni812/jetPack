import { useRef } from 'react';
import type { Player as PlayerType } from '../../types/game';
import type { Mesh } from 'three';

interface PlayerProps {
  player: PlayerType;
}

export const Player = ({ player }: PlayerProps) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={[player.position.x, player.position.y, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={player.isJetpackActive ? "orange" : "blue"} />
    </mesh>
  );
}; 