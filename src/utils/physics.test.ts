import { updatePlayerPhysics } from './physics';
import type { Player as PlayerType } from '../types/game';

describe('updatePlayerPhysics', () => {
  const basePlayer: PlayerType = {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isJetpackActive: false,
    health: 100,
    score: 0,
  };

  it('moves player up when jetpack is active', () => {
    const result = updatePlayerPhysics(basePlayer, true);
    expect(result.velocity.y).toBeGreaterThan(0);
    expect(result.position.y).toBe(0);
  });

  it('moves player down when jetpack is inactive', () => {
    const result = updatePlayerPhysics(basePlayer, false);
    expect(result.velocity.y).toBeLessThan(0);
    expect(result.position.y).toBe(0);
  });

  it('does not let player fall below ground', () => {
    const playerAtGround: PlayerType = { ...basePlayer, position: { x: 0, y: -4 }, velocity: { x: 0, y: -1 } };
    const result = updatePlayerPhysics(playerAtGround, false);
    expect(result.position.y).toBe(-4);
    expect(result.velocity.y).toBe(0);
  });
}); 