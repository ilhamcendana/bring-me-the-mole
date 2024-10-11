import { renderHook, act } from '@testing-library/react-hooks';
import useMoleEngine from './useMoleEngine';
import { useUserStore } from '@/zustand-hooks/useUserStore';

// Mock the Zustand store
jest.mock('@/zustand-hooks/useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('useMoleEngine', () => {
  beforeEach(() => {
    (useUserStore).mockReturnValue({
      level: 'EASY', // Default level for tests
    });
  });

  test('should initialize with correct values', () => {
    const { result } = renderHook(() => useMoleEngine());
    
    expect(result.current.totalMoleByLevel).toBe(3);
    expect(result.current.timer).toBe(0);
    expect(result.current.catchCounter).toBe(0);
    expect(result.current.whichHolesMoleShowed).toBe(null);
    expect(result.current.isWin).toBe(false);
    expect(result.current.isPrank).toBe(false);
    expect(result.current.isLose).toBe(false);
  });

  test('should update total mole count on level change', () => {
    const { result, rerender } = renderHook(() => useMoleEngine());
    
    act(() => {
      (useUserStore).mockReturnValue({ level: 'MEDIUM' });
      rerender();
    });

    expect(result.current.totalMoleByLevel).toBe(6);
  });

  test('should increase catch counter when mole is caught', () => {
    const { result } = renderHook(() => useMoleEngine());

    act(() => {
      result.current.onCatchMole(1); 
    });

    expect(result.current.catchCounter).toBe(1);
  });

  test('should set isWin to true when mole is caught correctly', () => {
    const { result } = renderHook(() => useMoleEngine());

    act(() => {
      act(() => {
        (result.current).whichHolesMoleShowed = [0, 1]; 
      });
      result.current.onCatchMole(0); // Correct catch
    });

    expect(result.current.isWin).toBe(true);
  });

  test('should trigger prank for LEVEL.GOD after 10 catches', () => {
    const { result } = renderHook(() => useMoleEngine());

    act(() => {
      (useUserStore).mockReturnValue({ level: 'GOD' });
      for (let i = 0; i < 10; i++) {
        result.current.onCatchMole(1); 
      }
    });

    expect(result.current.isPrank).toBe(true);
  });

  test('should lose if timer exceeds 180 seconds', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMoleEngine());

    act(() => {
      // Simulate starting the game
      result.current.startGame();
    });

    act(() => {
      // Advance time by 181 seconds
      jest.advanceTimersByTime(181 * 1000);
    });

    expect(result.current.isLose).toBe(true);
    jest.useRealTimers();
  });
});
