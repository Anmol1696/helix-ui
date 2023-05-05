import toggleReducer, {
    ToggleState,
    toggle,
  } from './toggleSlice';
  
  describe('toggle reducer', () => {
    const initialState: ToggleState = {
      open: false,
    };
    const toggledState: ToggleState = {
      open: true,
    };
    it('should handle uninitialized state of drawer being open', () => {
      expect(toggleReducer(undefined, { type: 'unknown' })).toEqual({
        open: true
      });
    });
  
    it('should handle toggle from default', () => {
      const actual = toggleReducer(initialState, toggle());
      expect(actual.open).toBe(true);
    });
  
    it('should handle toggle twice', () => {
      const actual = toggleReducer(toggledState, toggle());
      expect(actual.open).toBe(false);
    });
  });