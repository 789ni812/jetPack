import { useFrame } from '@react-three/fiber';
import type { Player as PlayerType } from '../../types/game';
import { updatePlayerPhysics } from '../../utils/physics';

interface GameLoopProps {
  player: PlayerType;
  isJetpackActive: boolean;
  setPlayer: (p: PlayerType) => void;
}

export function GameLoop({ player, isJetpackActive, setPlayer }: GameLoopProps) {
  useFrame(() => {
    setPlayer(updatePlayerPhysics(player, isJetpackActive));
  });
  return null;
} 