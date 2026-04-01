// Main application — screen routing, quiz logic, UI rendering
const App = {
  container: null,
  currentTopic: null,
  currentLevel: null,
  currentQuestion: 0,
  correctCount: 0,
  wrongCount: 0,
  streak: 0,
  maxStreak: 0,
  answered: false,
  startTime: null,

  init() {
    this.container = document.getElementById('quiz');
    Particles.init('particles-canvas');
    Confetti.init('confetti-canvas');

    // Check if player name exists
    const name = Storage.getPlayerName();
    if (name) {
      this.showTopics();
    } else {
      this.showStart();
    }
  },

  // ===== ESCAPE HTML =====
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // ===== START SCREEN =====
  showStart() {
    const savedName = Storage.getPlayerName() || '';
    this.container.innerHTML = `
      <div class="screen start-screen">
        <span class="logo">🧠</span>
        <h1>JS Quiz Master</h1>
        <p>
          Інтерактивний квіз з JavaScript!<br>
          5 тем, 3 рівні складності, 150 питань.
        </p>
        <div class="player-input">
          <input type="text" id="playerName" placeholder="Як тебе звати?" value="${this.escapeHTML(savedName)}" maxlength="20">
        </div>
        <button class="start-btn" onclick="App.startGame()">Почати!</button>
      </div>
    `;

    // Focus and enter key
    const input = document.getElementById('playerName');
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') App.startGame();
    });
  },

  startGame() {
    const input = document.getElementById('playerName');
    const name = input.value.trim() || 'Учень';
    Storage.setPlayerName(name);
    this.showTopics();
  },

  // ===== TOPICS SCREEN =====
  showTopics() {
    const playerName = Storage.getPlayerName();

    let topicsHTML = '';
    for (const key of Object.keys(TOPICS)) {
      const topic = TOPICS[key];
      const completion = Storage.getTopicCompletion(topic.id);
      const bestScores = [];
      for (let i = 0; i < 3; i++) {
        bestScores.push(Storage.getBestScore(topic.id, i));
      }
      const bestStr = bestScores.some(s => s > 0)
        ? `Найкращий: ${Math.max(...bestScores)}%`
        : 'Ще не пройдено';

      topicsHTML += `
        <div class="topic-card" onclick="App.selectTopic('${topic.id}')" style="--topic-color: ${topic.color}">
          <span class="topic-icon">${topic.icon}</span>
          <div class="topic-name">${this.escapeHTML(topic.name)}</div>
          <div class="topic-progress">
            <div class="topic-progress-fill" style="width: ${completion}%"></div>
          </div>
          <div class="topic-best">${bestStr}</div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="screen">
        <div class="nav-bar">
          <div class="player-name">👤 <strong>${this.escapeHTML(playerName)}</strong></div>
          <div class="nav-links">
            <button class="nav-link" onclick="App.showStats()">📊 Статистика</button>
          </div>
        </div>
        <h1>Обери тему</h1>
        <div class="topics-grid">${topicsHTML}</div>
      </div>
    `;

    Particles.setColor('#00d4ff');
  },

  // ===== LEVEL SELECTION =====
  selectTopic(topicId) {
    this.currentTopic = TOPICS[topicId];
    if (!this.currentTopic) return;

    Particles.setColor(this.currentTopic.color);

    let levelsHTML = '';
    this.currentTopic.levels.forEach((level, i) => {
      const unlocked = Storage.isLevelUnlocked(topicId, i);
      const best = Storage.getBestScore(topicId, i);
      const lockedClass = unlocked ? '' : 'locked';

      const scoreHTML = unlocked
        ? (best > 0
            ? `<div class="level-score"><span class="score-value">${best}%</span><br>рекорд</div>`
            : `<div class="level-score" style="color: #555;">—</div>`)
        : `<div class="lock-icon">🔒</div>`;

      const onclick = unlocked ? `onclick="App.startQuiz(${i})"` : '';

      levelsHTML += `
        <div class="level-card ${lockedClass}" ${onclick}>
          <div class="level-info">
            <div class="level-number">${i + 1}</div>
            <div>
              <div class="level-name">${this.escapeHTML(level.name)}</div>
              <div class="level-desc">${this.escapeHTML(level.desc)}</div>
            </div>
          </div>
          ${scoreHTML}
        </div>
      `;
    });

    const unlockHint = !Storage.isLevelUnlocked(topicId, 1)
      ? '<p style="text-align:center; color:#666; font-size:13px; margin-top:16px;">🔒 Набери ≥ 70% щоб розблокувати наступний рівень</p>'
      : '';

    this.container.innerHTML = `
      <div class="screen">
        <button class="back-btn" onclick="App.showTopics()">← Назад</button>
        <h2>${this.currentTopic.icon} ${this.escapeHTML(this.currentTopic.name)}</h2>
        <div class="levels-list">${levelsHTML}</div>
        ${unlockHint}
      </div>
    `;
  },

  // ===== QUIZ =====
  startQuiz(level) {
    this.currentLevel = level;
    this.currentQuestion = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.startTime = Date.now();
    this.showQuestion();
  },

  showQuestion() {
    this.answered = false;
    const questions = this.currentTopic.levels[this.currentLevel].questions;
    const q = questions[this.currentQuestion];
    const total = questions.length;
    const progress = (this.currentQuestion / total) * 100;

    let codeHTML = '';
    if (q.code) {
      codeHTML = `<div class="code-block">${this.escapeHTML(q.code)}</div>`;
    }

    let optionsHTML = q.options.map((opt, i) => {
      return `<button class="option-btn" onclick="App.selectAnswer(${i}, this)">${this.escapeHTML(opt)}</button>`;
    }).join('');

    const streakClass = this.streak >= 3 ? 'active' : '';
    const streakText = this.streak >= 3 ? `${this.streak}x` : (this.streak > 0 ? `${this.streak}x` : '');

    // Add golden glow for high streak
    if (this.streak >= 3) {
      this.container.classList.add('streak-glow');
    } else {
      this.container.classList.remove('streak-glow');
    }

    this.container.innerHTML = `
      <div class="screen question-enter">
        <div class="quiz-header">
          <div class="question-counter">Питання ${this.currentQuestion + 1} / ${total}</div>
          <div class="streak-display ${streakClass}">
            <span class="streak-fire">${this.streak >= 3 ? '🔥' : (this.streak > 0 ? '✨' : '')}</span>
            <span>${streakText}</span>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="question-text">${this.escapeHTML(q.question)}</div>
        ${codeHTML}
        <div class="options">${optionsHTML}</div>
        <div class="feedback" id="feedback"></div>
        <button class="next-btn" id="nextBtn" onclick="App.nextQuestion()">
          ${this.currentQuestion < total - 1 ? 'Далі →' : 'Результат'}
        </button>
      </div>
    `;
  },

  selectAnswer(index, btnEl) {
    if (this.answered) return;
    this.answered = true;

    const questions = this.currentTopic.levels[this.currentLevel].questions;
    const q = questions[this.currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');

    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));

    // Highlight correct
    buttons[q.correct].classList.add('correct');

    if (index === q.correct) {
      this.correctCount++;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;

      feedback.textContent = this.getCorrectMessage();
      feedback.className = 'feedback correct';

      // Confetti burst from the button position
      const rect = btnEl.getBoundingClientRect();
      Confetti.burst(rect.left + rect.width / 2, rect.top, 25);

      // Vibrate on mobile
      if (navigator.vibrate) navigator.vibrate(50);

      // Update streak display
      const streakDisplay = document.querySelector('.streak-display');
      if (this.streak >= 3) {
        streakDisplay.className = 'streak-display active';
        this.container.classList.add('streak-glow');
      }
    } else {
      this.wrongCount++;
      this.streak = 0;
      this.container.classList.remove('streak-glow');

      btnEl.classList.add('wrong');
      feedback.textContent = 'Неправильно. Правильна відповідь виділена зеленим.';
      feedback.className = 'feedback wrong';

      // Red flash
      this.container.classList.add('red-flash');
      setTimeout(() => this.container.classList.remove('red-flash'), 600);
    }

    nextBtn.classList.add('visible');
    nextBtn.style.display = 'block';
  },

  getCorrectMessage() {
    if (this.streak >= 5) return '🔥 Неймовірно! ' + this.streak + ' поспіль!';
    if (this.streak >= 3) return '✨ Чудова серія! ' + this.streak + 'x streak!';
    const messages = ['Правильно!', 'Молодець!', 'Вірно!', 'Так тримати!', 'Супер!'];
    return messages[Math.floor(Math.random() * messages.length)];
  },

  nextQuestion() {
    this.currentQuestion++;
    const questions = this.currentTopic.levels[this.currentLevel].questions;
    if (this.currentQuestion < questions.length) {
      this.showQuestion();
    } else {
      this.showResults();
    }
  },

  // ===== RESULTS SCREEN =====
  showResults() {
    this.container.classList.remove('streak-glow');
    const total = this.currentTopic.levels[this.currentLevel].questions.length;
    const percentage = Math.round((this.correctCount / total) * 100);
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);

    // Save result
    Storage.addResult({
      topicId: this.currentTopic.id,
      topicName: this.currentTopic.name,
      level: this.currentLevel,
      levelName: this.currentTopic.levels[this.currentLevel].name,
      correct: this.correctCount,
      wrong: this.wrongCount,
      total,
      percentage,
      timeSpent,
      maxStreak: this.maxStreak
    });

    // Stars (1-5)
    const starCount = percentage === 100 ? 5 : percentage >= 80 ? 4 : percentage >= 60 ? 3 : percentage >= 40 ? 2 : percentage > 0 ? 1 : 0;
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      const filled = i < starCount ? '⭐' : '☆';
      starsHTML += `<span class="star">${filled}</span>`;
    }

    // Message
    let message = '';
    if (percentage === 100) message = 'Ідеально! Ти справжній експерт!';
    else if (percentage >= 80) message = 'Чудовий результат!';
    else if (percentage >= 70) message = 'Добре! Наступний рівень розблоковано!';
    else if (percentage >= 60) message = 'Непогано! Ще трохи — і розблокуєш наступний рівень.';
    else if (percentage >= 40) message = 'Варто ще попрактикуватись.';
    else message = 'Не здавайся! Спробуй ще раз!';

    // Time formatting
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeStr = minutes > 0 ? `${minutes}хв ${seconds}с` : `${seconds}с`;

    // SVG circular progress
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (percentage / 100) * circumference;

    this.container.innerHTML = `
      <div class="screen results">
        <h2>${this.currentTopic.icon} Результати</h2>
        <div class="results-stars">${starsHTML}</div>

        <div class="circular-progress">
          <svg width="160" height="160">
            <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.08)" stroke-width="10" fill="none"/>
            <circle class="progress-ring" cx="80" cy="80" r="70"
              stroke="${this.currentTopic.color}" stroke-width="10" fill="none"
              stroke-linecap="round"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${offset}"/>
          </svg>
          <div class="progress-text" id="percentText">0%</div>
        </div>

        <div class="score-message">${message}</div>

        <div class="results-stats">
          <div class="stat-box">
            <div class="stat-number green" id="correctNum">0</div>
            <div class="stat-label">Правильних</div>
          </div>
          <div class="stat-box">
            <div class="stat-number red" id="wrongNum">0</div>
            <div class="stat-label">Неправильних</div>
          </div>
          <div class="stat-box">
            <div class="stat-number blue">${timeStr}</div>
            <div class="stat-label">Час</div>
          </div>
        </div>

        ${this.maxStreak >= 3 ? `<p style="color: #ffd700; font-size: 14px;">🔥 Найкраща серія: ${this.maxStreak}x</p>` : ''}

        <div class="results-actions">
          <button class="btn-primary" onclick="App.startQuiz(${this.currentLevel})">Пройти ще раз</button>
          <button class="btn-secondary" onclick="App.selectTopic('${this.currentTopic.id}')">До рівнів</button>
          <button class="btn-secondary" onclick="App.showTopics()">До тем</button>
        </div>
      </div>
    `;

    // Animated count-up
    this.animateCountUp('correctNum', this.correctCount, 600);
    this.animateCountUp('wrongNum', this.wrongCount, 600);
    this.animateCountUp('percentText', percentage, 800, '%');

    // Celebration effects
    if (percentage === 100) {
      setTimeout(() => Confetti.fireworks(), 500);
    } else if (percentage >= 70) {
      setTimeout(() => Confetti.celebrate(), 500);
    }
  },

  // Animated number count-up
  animateCountUp(elementId, target, duration, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el || target === 0) {
      if (el) el.textContent = '0' + suffix;
      return;
    }

    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  },

  // ===== STATS SCREEN =====
  showStats() {
    const stats = Storage.getStats();
    const history = Storage.getHistory().slice(0, 20);

    let historyHTML = '';
    if (history.length === 0) {
      historyHTML = '<p style="text-align:center; color:#666; padding: 20px;">Ще немає результатів</p>';
    } else {
      historyHTML = history.map(r => {
        const date = new Date(r.date);
        const dateStr = date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
        return `
          <div class="history-item">
            <div>
              <div class="history-topic">${this.escapeHTML(r.topicName || r.topic)} · ${this.escapeHTML(r.levelName || 'Рівень ' + (r.level + 1))}</div>
              <div class="history-date">${dateStr}</div>
            </div>
            <div class="history-score">${r.percentage}%</div>
          </div>
        `;
      }).join('');
    }

    this.container.innerHTML = `
      <div class="screen">
        <button class="back-btn" onclick="App.showTopics()">← Назад</button>
        <h2>📊 Статистика</h2>

        <div class="stats-grid">
          <div class="stats-card">
            <div class="stats-value">${stats.totalQuizzes}</div>
            <div class="stats-label">Квізів пройдено</div>
          </div>
          <div class="stats-card">
            <div class="stats-value">${stats.avgScore}%</div>
            <div class="stats-label">Середній бал</div>
          </div>
          <div class="stats-card">
            <div class="stats-value">${stats.totalCorrect}</div>
            <div class="stats-label">Правильних</div>
          </div>
          <div class="stats-card">
            <div class="stats-value">${stats.bestStreak}x</div>
            <div class="stats-label">Найкращий streak</div>
          </div>
        </div>

        <h2 style="font-size: 18px; margin-top: 30px;">Остання активність</h2>
        <div class="history-list">${historyHTML}</div>

        <div style="text-align: center;">
          <button class="clear-btn" onclick="App.confirmClear()">🗑️ Очистити всі дані</button>
        </div>
      </div>
    `;
  },

  confirmClear() {
    if (confirm('Ти впевнений? Всі результати та прогрес буде видалено!')) {
      Storage.clearAll();
      this.showStart();
    }
  }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
