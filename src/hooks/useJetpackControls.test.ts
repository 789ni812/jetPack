import { renderHook, act } from '@testing-library/react';
import { useJetpackControls } from './useJetpackControls';

describe('useJetpackControls', () => {
  it('sets isJetpackActive to true on spacebar down and false on spacebar up', () => {
    const { result } = renderHook(() => useJetpackControls());

    // Simulate spacebar down
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    });
    expect(result.current.current).toBe(true);

    // Simulate spacebar up
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    });
    expect(result.current.current).toBe(false);
  });
}); 