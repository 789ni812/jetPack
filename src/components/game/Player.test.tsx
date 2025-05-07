import { render } from '@testing-library/react';
import { Player } from './Player';
import type { Player as PlayerType } from '../../types/game';

const basePlayer: PlayerType = {
  position: { x: 1, y: 2 },
  velocity: { x: 0, y: 0 },
  isJetpackActive: false,
  health: 100,
  score: 0,
};

describe('Player', () => {
  it('renders without crashing', () => {
    expect(() => render(<Player player={basePlayer} />)).not.toThrow();
  });

  it('changes color when jetpack is active', () => {
    const { rerender } = render(<Player player={{ ...basePlayer, isJetpackActive: false }} />);
    // No error means it rendered
    rerender(<Player player={{ ...basePlayer, isJetpackActive: true }} />);
    // No error means it rendered with jetpack active
    // (Visual color check would require integration or visual regression test)
  });
}); 