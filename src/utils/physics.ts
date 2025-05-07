import type { Player as PlayerType } from '../types/game';

export function updatePlayerPhysics(player: PlayerType, isJetpackActive: boolean): PlayerType {
  // Update player position based on velocity
  const newPosition = {
    x: player.position.x + player.velocity.x,
    y: player.position.y + player.velocity.y,
  };

  // Physics constants
  const gravity = -0.1;
  const jetpackThrust = 0.005;

  // Apply physics
  const newVelocity = {
    x: player.velocity.x * 0.95, // Friction only on x
    y: player.velocity.y + (isJetpackActive ? jetpackThrust : gravity),
  };

  // Ground collision
  const groundY = -4;
  if (newPosition.y <= groundY) {
    newPosition.y = groundY;
    newVelocity.y = isJetpackActive ? jetpackThrust : 0;
  }

  return {
    ...player,
    position: newPosition,
    velocity: newVelocity,
  };
} 