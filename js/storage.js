// LocalStorage module for saving quiz results and progress
const Storage = {
  KEYS: {
    RESULTS: 'quizResults',
    PROGRESS: 'userProgress',
    SETTINGS: 'quizSettings'
  },

  // Save data to localStorage
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  },

  // Load data from localStorage
  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('localStorage load failed:', e);
      return null;
    }
  },

  // Get player name
  getPlayerName() {
    const settings = this.load(this.KEYS.SETTINGS) || {};
    return settings.playerName || '';
  },

  // Set player name
  setPlayerName(name) {
    const settings = this.load(this.KEYS.SETTINGS) || {};
    settings.playerName = name;
    this.save(this.KEYS.SETTINGS, settings);
  },

  // Get progress for all topics
  getProgress() {
    return this.load(this.KEYS.PROGRESS) || {};
  },

  // Get best score for a topic/level
  getBestScore(topicId, level) {
    const progress = this.getProgress();
    if (progress[topicId] && progress[topicId].bestScore) {
      return progress[topicId].bestScore[level] || 0;
    }
    return 0;
  },

  // Check if a level is unlocked (level 0 always unlocked, others need >= 70% on previous)
  isLevelUnlocked(topicId, level) {
    if (level === 0) return true;
    const prevScore = this.getBestScore(topicId, level - 1);
    return prevScore >= 70;
  },

  // Save a quiz result
  addResult(result) {
    // Save to history
    const results = this.load(this.KEYS.RESULTS) || [];
    results.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      topic: result.topicId,
      topicName: result.topicName,
      level: result.level,
      levelName: result.levelName,
      correct: result.correct,
      wrong: result.wrong,
      total: result.total,
      percentage: result.percentage,
      timeSpent: result.timeSpent,
      streak: result.maxStreak,
      date: new Date().toISOString()
    });

    // Keep only last 100 results
    if (results.length > 100) results.length = 100;
    this.save(this.KEYS.RESULTS, results);

    // Update progress
    const progress = this.getProgress();
    if (!progress[result.topicId]) {
      progress[result.topicId] = { bestScore: [0, 0, 0] };
    }
    const currentBest = progress[result.topicId].bestScore[result.level] || 0;
    if (result.percentage > currentBest) {
      progress[result.topicId].bestScore[result.level] = result.percentage;
    }
    this.save(this.KEYS.PROGRESS, progress);
  },

  // Get quiz history
  getHistory() {
    return this.load(this.KEYS.RESULTS) || [];
  },

  // Get overall stats
  getStats() {
    const results = this.getHistory();
    if (results.length === 0) {
      return { totalQuizzes: 0, avgScore: 0, totalCorrect: 0, totalWrong: 0, bestStreak: 0 };
    }

    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalWrong = results.reduce((sum, r) => sum + r.wrong, 0);
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length);
    const bestStreak = Math.max(...results.map(r => r.streak || 0));

    return {
      totalQuizzes: results.length,
      avgScore,
      totalCorrect,
      totalWrong,
      bestStreak
    };
  },

  // Get topic completion percentage (how many levels completed with >= 70%)
  getTopicCompletion(topicId) {
    const progress = this.getProgress();
    if (!progress[topicId]) return 0;
    const scores = progress[topicId].bestScore || [0, 0, 0];
    const completed = scores.filter(s => s >= 70).length;
    return Math.round((completed / 3) * 100);
  },

  // Clear all data
  clearAll() {
    localStorage.removeItem(this.KEYS.RESULTS);
    localStorage.removeItem(this.KEYS.PROGRESS);
    localStorage.removeItem(this.KEYS.SETTINGS);
  }
};
