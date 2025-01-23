// MorseSettings.js
const STORAGE_KEY = 'morseTrainerSettings';

export class MorseSettings {
  static getDefaults() {
    return {
      currentLevel: 1,
      wpm: 20,
      frequency: 600,
      groupSize: 3,
      advanceThreshold: 3,
      headCopyMode: false,
      hideChars: false
    };
  }

  static load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.getDefaults();
      
      const settings = JSON.parse(stored);
      return { ...this.getDefaults(), ...settings };
    } catch (e) {
      console.error('Failed to load settings:', e);
      return this.getDefaults();
    }
  }

  static save(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }
}
