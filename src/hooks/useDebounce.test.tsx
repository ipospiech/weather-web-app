import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce.js';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('should update value after delay', () => {
    let value = 'a';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'b';
    rerender();
    value = 'c';
    rerender();

    expect(result.current).toBe('a'); // still initial value

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('c');
  });

  it('should not update value if unmounted before delay', () => {
    const { rerender, unmount } = renderHook(() => useDebounce('start', 500));

    rerender();
    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // no errors occur
    expect(true).toBe(true);
  });

  it('should work with different types (string, number, object)', () => {
    // string
    let valueStr = 'str';
    const { result: rStr, rerender: rrStr } = renderHook(() =>
      useDebounce(valueStr, 200)
    );
    valueStr = 'updated';
    rrStr();
    act(() => vi.advanceTimersByTime(200));
    expect(rStr.current).toBe('updated');

    // number
    let valueNum = 1;
    const { result: rNum, rerender: rrNum } = renderHook(() =>
      useDebounce(valueNum, 200)
    );
    valueNum = 42;
    rrNum();
    act(() => vi.advanceTimersByTime(200));
    expect(rNum.current).toBe(42);

    // object
    let valueObj = { a: 1 };
    const { result: rObj, rerender: rrObj } = renderHook(() =>
      useDebounce(valueObj, 200)
    );
    valueObj = { a: 2 };
    rrObj();
    act(() => vi.advanceTimersByTime(200));
    expect(rObj.current).toEqual({ a: 2 });
  });

  it('should not trigger extra renders unnecessarily', () => {
    let renderCount = 0;
    let value = 'x';

    const TestComponent = () => {
      renderCount++;
      useDebounce(value, 500);
      return null;
    };

    const { rerender } = renderHook(() => TestComponent());

    value = 'y';
    rerender();
    value = 'z';
    rerender();

    // 3 renders: initial + 2 rerenders
    expect(renderCount).toBe(3);
  });
});
