// Enhanced IT Career Exploration Game - Main Application
// Version 6.0 - Modern UI/UX with 2025 Design Trends

class CareerExplorationGame {
  constructor() {
    // Game state - using in-memory storage (no localStorage in sandbox)
    this.gameState = {
      currentScene: 'start',
      currentPath: null,
      sceneNumber: 0,
      scores: { ...gameData.initialScores },
      choices: [],
      randomEvents: [],
      gameStarted: false,
      onboardingCompleted: false
    };

    // UI settings
    this.settings = {
      animationsEnabled: true,
      musicEnabled: false,
      onboardingDone: false
    };

    // Current state trackers
    this.currentSlide = 0;
    this.isTransitioning = false;
    this.randomEventTimeout = null;

    // Initialize the game
    this.init();
  }

  init() {
    console.log('🎮 Initializing Career Exploration Game v6.0');
    
    // Check if onboarding was completed before
    // Since we can't use localStorage, show onboarding every time
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.initializeTheme();
    
    // Show onboarding for first-time users
    if (!this.settings.onboardingDone) {
      this.showOnboarding();
    } else {
      this.hideOnboarding();
    }

    // Initialize first scene
    this.renderScene();
  }

  setupEventListeners() {
    // Header controls
    document.getElementById('musicBtn').addEventListener('click', () => this.toggleMusic());
    document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
    document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
    document.getElementById('saveBtn').addEventListener('click', () => this.saveGame());

    // Onboarding
    document.getElementById('skipOnboarding').addEventListener('click', () => this.skipOnboarding());
    document.getElementById('nextSlide').addEventListener('click', () => this.nextSlide());
    document.getElementById('prevSlide').addEventListener('click', () => this.prevSlide());

    // Dialogs
    document.getElementById('closeHelp').addEventListener('click', () => this.hideHelp());
    document.getElementById('closeSummary').addEventListener('click', () => this.hideSummary());

    // End screen buttons
    document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());
    document.getElementById('viewSummaryBtn').addEventListener('click', () => this.showSummary());

    // Summary tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Random event dismiss
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('random-event-dismiss')) {
        this.hideRandomEvent();
      }
    });

    // Dialog overlay clicks
    document.querySelectorAll('.dialog-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
        }
      });
    });

    // Onboarding overlay clicks
    document.getElementById('onboardingOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.skipOnboarding();
      }
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Don't handle keys if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const choices = document.querySelectorAll('.choice-card:not([style*="display: none"])');
      
      switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
          const choiceIndex = parseInt(e.key) - 1;
          if (choices[choiceIndex]) {
            this.selectChoice(choiceIndex);
          }
          break;
        case 'Enter':
          if (choices.length > 0) {
            this.selectChoice(0); // Select first choice
          }
          break;
        case 'r':
        case 'R':
          if (e.ctrlKey || e.metaKey) return; // Don't interfere with refresh
          this.restartGame();
          break;
        case 'h':
        case 'H':
          this.showHelp();
          break;
        case 'Escape':
          // Close any open dialogs
          document.querySelectorAll('.dialog-overlay').forEach(overlay => {
            if (overlay.style.display !== 'none') {
              overlay.style.display = 'none';
            }
          });
          break;
      }
    });
  }

  initializeTheme() {
    // Apply current career path theme if any
    if (this.gameState.currentPath) {
      this.applyCareerTheme(this.gameState.currentPath);
    }
  }

  checkForHardFail(scores, pathId) {
    // Fail threshold: 35 (professional balance between challenge and fairness)
    // Starting point: 50 for all dimensions
    // Allows player up to 15 points drop on any dimension before failing
    const FAIL_THRESHOLD = 20;
    
    if (
      scores.penghasilan < FAIL_THRESHOLD ||
      scores.keseimbangan < FAIL_THRESHOLD ||
      scores.kepuasan < FAIL_THRESHOLD ||
      scores.nilai < FAIL_THRESHOLD ||
      scores.minat < FAIL_THRESHOLD
    ) {
      // Format: guru_fail, wira_fail, s2_fail, ind_fail (lowercase with underscore)
      this.gameState.currentScene = `${pathId}_fail`;
      this.renderScene();
      return true;
    }
    return false;
  }

  applyCareerTheme(pathId) {
    const path = gameData.careerPaths[pathId];
    if (!path) return;

    const root = document.documentElement;
    root.style.setProperty('--current-career-primary', path.colorPrimary);
    root.style.setProperty('--current-career-accent', path.colorAccent);
    
    // Update header gradient
    const header = document.querySelector('.header');
    header.style.background = `linear-gradient(135deg, ${path.colorPrimary}15 0%, ${path.colorAccent}10 100%)`;
    
    // Update progress steps color
    document.documentElement.style.setProperty('--progress-color', path.colorPrimary);
    
    // Update character name
    const characterNameEl = document.getElementById('characterName');
    if (characterNameEl) {
      characterNameEl.textContent = path.characterName;
    }
  }

  // ONBOARDING SYSTEM
  showOnboarding() {
    document.getElementById('onboardingOverlay').style.display = 'flex';
    this.currentSlide = 0;
    this.updateOnboardingSlide();
  }

  hideOnboarding() {
    document.getElementById('onboardingOverlay').style.display = 'none';
    this.settings.onboardingDone = true;
  }

  skipOnboarding() {
    this.hideOnboarding();
  }

  nextSlide() {
    const totalSlides = document.querySelectorAll('.onboarding-slide').length;
    if (this.currentSlide < totalSlides - 1) {
      this.currentSlide++;
      this.updateOnboardingSlide();
    } else {
      this.hideOnboarding();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateOnboardingSlide();
    }
  }

  updateOnboardingSlide() {
    const slides = document.querySelectorAll('.onboarding-slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');

    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide
    slides[this.currentSlide].style.display = 'block';
    indicators[this.currentSlide].classList.add('active');

    // Update navigation buttons
    prevBtn.disabled = this.currentSlide === 0;
    nextBtn.textContent = this.currentSlide === slides.length - 1 ? 'Mulai' : 'Selanjutnya';
  }

  // SCENE MANAGEMENT
  renderScene() {
    const sceneId = this.gameState.currentScene;
    const scene = gameData.scenes[sceneId];
    
    if (!scene) {
      console.error('Scene not found:', sceneId);
      return;
    }

    // Handle end scene (both 'END' and 'end' formats)
    if (sceneId === 'END' || sceneId === 'end') {
      this.showEndScreen();
      return;
    }

    // Update progress for path scenes
    if (sceneId !== 'start' && sceneId !== 'END' && sceneId !== 'end') {
      this.updateProgress();
    }

    // Show scene elements
    document.getElementById('sceneCard').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';

    // Update scene content
    document.getElementById('sceneTitle').textContent = scene.title;
    document.getElementById('sceneText').innerHTML = `<p>${scene.text}</p>`;

    // Check if current scene is a fail scene and show/hide fail alert
    // Fail scenes: guru_fail, wira_fail, s2_fail, ind_fail (lowercase format)
    if (this.gameState.currentScene.endsWith('_fail') || this.gameState.currentScene.startsWith('FAIL_')) {
      document.getElementById('failAlert').style.display = 'block';
    } else {
      document.getElementById('failAlert').style.display = 'none';
    }

    // Show/hide character portrait based on scene
    const portraitEl = document.getElementById('characterPortrait');
    if (sceneId === 'start') {
      portraitEl.style.display = 'none';
      document.getElementById('scoreboard').style.display = 'none';
      document.getElementById('progressContainer').style.display = 'none';
    } else {
      portraitEl.style.display = 'flex';
      document.getElementById('scoreboard').style.display = 'flex';
      document.getElementById('progressContainer').style.display = 'block';
    }

    // Render choices
    this.renderChoices(scene.choices);

    // Update scoreboard
    this.updateScoreboard();

    // Check for random events
    this.checkRandomEvent();

    // Add scene transition animation
    this.animateSceneTransition();
  }

  renderChoices(choices) {
    const container = document.getElementById('choicesContainer');
    container.innerHTML = '';
    container.setAttribute('data-count', choices.length);

    choices.forEach((choice, index) => {
      const choiceEl = this.createChoiceElement(choice, index);
      container.appendChild(choiceEl);
    });
  }

  createChoiceElement(choice, index) {
    const div = document.createElement('div');
    div.className = 'choice-card';
    div.setAttribute('data-choice-index', index);
    div.setAttribute('tabindex', '0');
    
    // Add career path specific class for start scene
    if (this.gameState.currentScene === 'start') {
      div.classList.add('career-path');
      const pathId = choice.nextScene.split('_')[0];
      div.setAttribute('data-path', pathId);
    }

    // Extract icon from choice text or use default
    const iconMatch = choice.text.match(/^([\u{1F000}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
    const icon = iconMatch ? iconMatch[1] : '🎯';
    const textWithoutIcon = choice.text.replace(/^([\u{1F000}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*/u, '');

    div.innerHTML = `
      <div class="choice-icon">${icon}</div>
      <div class="choice-content">
        <h3>${textWithoutIcon}</h3>
        ${choice.subtext ? `<small>${choice.subtext}</small>` : ''}
        ${this.getChoiceEffectsText(choice.effects)}
      </div>
    `;

    // Add click handler
    div.addEventListener('click', () => this.selectChoice(index));

    // Add keyboard focus handler
    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.selectChoice(index);
      }
    });

    return div;
  }

  getChoiceEffectsText(effects) {
    if (!effects || Object.keys(effects).length === 0) return '';
    
    const effectTexts = [];
    Object.entries(effects).forEach(([dimension, value]) => {
      if (value !== 0) {
        const sign = value > 0 ? '+' : '';
        // Try scoreDimensions first (for game_data.js), then scores (for game_data22.js)
        const dimensionData = gameData.scoreDimensions?.[dimension] || gameData.scores?.[dimension];
        if (dimensionData) {
          const icon = dimensionData.icon || '📊';
          effectTexts.push(`${icon} ${sign}${value}`);
        }
      }
    });
    
    if (effectTexts.length > 0) {
      return `<div class="choice-effects">Efek: ${effectTexts.join(', ')}</div>`;
    }
    return '';
  }

  selectChoice(choiceIndex) {
    if (this.isTransitioning) return;

    const scene = gameData.scenes[this.gameState.currentScene];
    const choice = scene.choices[choiceIndex];
    
    if (!choice) return;

    this.isTransitioning = true;

    // Record choice
    this.gameState.choices.push({
      scene: this.gameState.currentScene,
      choiceIndex: choiceIndex,
      choiceText: choice.text,
      effects: choice.effects
    });

    // Apply choice effects to scores
    if (choice.effects) {
      Object.entries(choice.effects).forEach(([dimension, value]) => {
        this.gameState.scores[dimension] = Math.max(0, Math.min(100, 
          this.gameState.scores[dimension] + value
        ));
      });

      // Check for hard fail condition after updating scores
      const pathId = this.gameState.currentPath;
      if (this.checkForHardFail(this.gameState.scores, pathId)) {
        this.isTransitioning = false;
        return;
      }
    }

    // Set career path if starting
    if (this.gameState.currentScene === 'start') {
      this.gameState.currentPath = choice.nextScene.split('_')[0];
      this.gameState.gameStarted = true;
      this.gameState.sceneNumber = 1;
      this.applyCareerTheme(this.gameState.currentPath);
    } else if (this.gameState.currentScene.includes('_')) {
      this.gameState.sceneNumber++;
    }

    // Add button click animation
    const choiceElements = document.querySelectorAll('.choice-card');
    if (choiceElements[choiceIndex]) {
      choiceElements[choiceIndex].style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (choiceElements[choiceIndex]) {
          choiceElements[choiceIndex].style.transform = '';
        }
      }, 150);
    }

    // Animate score changes
    this.animateScoreChanges(choice.effects);

    // Move to next scene after animation
    setTimeout(() => {
      // If nextScene is null (end choice), show end screen directly
      if (choice.nextScene === null) {
        this.showEndScreen();
      } else {
        this.gameState.currentScene = choice.nextScene;
        this.renderScene();
      }
      this.isTransitioning = false;
    }, 600);
  }

  // SCORING SYSTEM
  updateScoreboard() {
    Object.entries(this.gameState.scores).forEach(([dimension, value]) => {
      const element = document.getElementById(`score${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`);
      if (element) {
        element.textContent = Math.round(value);
        
        // Update score level styling
        const scoreItem = element.closest('.score-item');
        if (scoreItem) {
          scoreItem.removeAttribute('data-level');
          if (value >= 70) {
            scoreItem.setAttribute('data-level', 'high');
          } else if (value >= 40) {
            scoreItem.setAttribute('data-level', 'medium');
          } else {
            scoreItem.setAttribute('data-level', 'low');
          }
        }
      }
    });
  }

  animateScoreChanges(effects) {
    if (!effects) return;

    Object.entries(effects).forEach(([dimension, value]) => {
      if (value !== 0) {
        const element = document.getElementById(`score${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`);
        if (element) {
          element.classList.add('updating');
          setTimeout(() => {
            element.classList.remove('updating');
          }, 500);
        }
      }
    });
  }

  // PROGRESS SYSTEM
  updateProgress() {
    if (!this.gameState.currentPath) return;

    const progressText = document.getElementById('progressText');
    const steps = document.querySelectorAll('.progress-step');
    
    progressText.textContent = `Scene ${this.gameState.sceneNumber} of 10`;
    
    steps.forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index < this.gameState.sceneNumber - 1) {
        step.classList.add('completed');
      } else if (index === this.gameState.sceneNumber - 1) {
        step.classList.add('active');
      }
    });
  }

  // RANDOM EVENTS SYSTEM
  checkRandomEvent() {
    // Skip random events on start scene or if one is already showing
    if (this.gameState.currentScene === 'start' || 
        document.getElementById('randomEvent').style.display !== 'none') {
      return;
    }

    // Check each random event for trigger
    gameData.randomEvents.forEach(event => {
      if (Math.random() < event.probability) {
        // Check if event applies to current path
        if (event.applicablePaths.includes('all') || 
            event.applicablePaths.includes(this.gameState.currentPath)) {
          this.showRandomEvent(event);
        }
      }
    });
  }

  showRandomEvent(event) {
    const randomEventEl = document.getElementById('randomEvent');
    const textEl = randomEventEl.querySelector('.random-event-text');
    
    textEl.textContent = event.text;
    randomEventEl.style.display = 'block';
    
    // Apply event effects
    if (event.effects) {
      Object.entries(event.effects).forEach(([dimension, value]) => {
        this.gameState.scores[dimension] = Math.max(0, Math.min(100, 
          this.gameState.scores[dimension] + value
        ));
      });
      this.animateScoreChanges(event.effects);
      this.updateScoreboard();
    }
    
    // Record random event
    this.gameState.randomEvents.push({
      scene: this.gameState.currentScene,
      event: event,
      timestamp: Date.now()
    });
    
    // Auto-dismiss after 4 seconds
    if (this.randomEventTimeout) {
      clearTimeout(this.randomEventTimeout);
    }
    this.randomEventTimeout = setTimeout(() => {
      this.hideRandomEvent();
    }, 4000);
  }

  hideRandomEvent() {
    document.getElementById('randomEvent').style.display = 'none';
    if (this.randomEventTimeout) {
      clearTimeout(this.randomEventTimeout);
      this.randomEventTimeout = null;
    }
  }

  // ANIMATION SYSTEM
  animateSceneTransition() {
    if (!this.settings.animationsEnabled) return;

    const sceneCard = document.getElementById('sceneCard');
    sceneCard.classList.add('transitioning');
    
    setTimeout(() => {
      sceneCard.classList.remove('transitioning');
    }, 100);
  }

  // END SCREEN
  showEndScreen() {
    document.getElementById('sceneCard').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('progressContainer').style.display = 'none';
    
    this.calculateAndDisplayCareerFit();
    this.renderJourneySummary();
    this.renderFinalScores();
  }

  calculateAndDisplayCareerFit() {
    if (!this.gameState.currentPath) return;

    // Calculate average score across all dimensions
    const scores = this.gameState.scores;
    let totalScore = 0;
    let dimensionCount = 0;
    
    Object.entries(scores).forEach(([dimension, value]) => {
      totalScore += value;
      dimensionCount++;
    });
    
    const fitPercentage = Math.round(totalScore / dimensionCount);

    // Find appropriate fit level
    let fitLevel = null;
    if (gameData.fitLevels.excellent && typeof gameData.fitLevels.excellent === 'object') {
      // New format: fitLevels as object with excellent, good, moderate, low
      if (fitPercentage >= gameData.fitLevels.excellent.threshold) {
        fitLevel = { ...gameData.fitLevels.excellent, emoji: '😍' };
      } else if (fitPercentage >= gameData.fitLevels.good.threshold) {
        fitLevel = { ...gameData.fitLevels.good, emoji: '😊' };
      } else if (fitPercentage >= gameData.fitLevels.moderate.threshold) {
        fitLevel = { ...gameData.fitLevels.moderate, emoji: '🤔' };
      } else {
        fitLevel = { ...gameData.fitLevels.low, emoji: '😟' };
      }
    } else if (Array.isArray(gameData.fitLevels)) {
      // Old format: fitLevels as array
      fitLevel = gameData.fitLevels.find(level => 
        fitPercentage >= level.min && fitPercentage <= level.max
      );
    }

    if (!fitLevel) {
      fitLevel = { label: 'Hasil', emoji: '🎯', message: 'Perjalanan karirmu selesai!' };
    }

    // Update fit display
    document.getElementById('fitPercentage').textContent = `${fitPercentage}%`;
    document.getElementById('fitEmoji').textContent = fitLevel.emoji || '🎯';
    document.getElementById('fitLabel').textContent = fitLevel.label || 'Hasil';
    document.getElementById('fitExplanation').textContent = fitLevel.message || fitLevel.description || 'Terima kasih telah bermain!';
    
    // Update CSS custom property for circle animation
    document.documentElement.style.setProperty('--fit-percentage', fitPercentage);
  }

  renderJourneySummary() {
    const journeyPath = document.getElementById('journeyPath');
    journeyPath.innerHTML = '';
    
    // Create journey nodes based on choices
    this.gameState.choices.forEach((choice, index) => {
      if (choice.scene !== 'start') {
        const node = document.createElement('div');
        node.className = 'journey-node';
        node.textContent = index;
        node.title = choice.choiceText;
        journeyPath.appendChild(node);
      }
    });
  }

  renderFinalScores() {
    const finalScores = document.getElementById('finalScores');
    finalScores.innerHTML = '';
    
    Object.entries(this.gameState.scores).forEach(([dimension, value]) => {
      // Try scoreDimensions first (for game_data.js), then scores (for game_data22.js)
      const dimensionData = gameData.scoreDimensions?.[dimension] || gameData.scores?.[dimension];
      if (!dimensionData) return;
      
      const scoreBar = document.createElement('div');
      scoreBar.className = 'score-bar';
      const icon = dimensionData.icon || '📊';
      const label = dimensionData.label || dimension;
      scoreBar.innerHTML = `
        <div class="score-bar-label">
          <span class="score-icon">${icon}</span>
          <span>${label}</span>
        </div>
        <div class="score-bar-track">
          <div class="score-bar-fill" style="width: ${value}%"></div>
        </div>
        <div class="score-bar-value">${Math.round(value)}</div>
      `;
      
      finalScores.appendChild(scoreBar);
      
      // Animate bar fill
      setTimeout(() => {
        const fill = scoreBar.querySelector('.score-bar-fill');
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = `${value}%`;
        }, 100);
      }, 100);
    });
  }

  // DIALOG MANAGEMENT
  showHelp() {
    document.getElementById('helpDialog').style.display = 'flex';
  }

  hideHelp() {
    document.getElementById('helpDialog').style.display = 'none';
  }

  showSummary() {
    document.getElementById('summaryDialog').style.display = 'flex';
    this.renderSummaryContent();
  }

  hideSummary() {
    document.getElementById('summaryDialog').style.display = 'none';
  }

  switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(`${tabId}Tab`).style.display = 'block';
  }

  renderSummaryContent() {
    // Journey tab content
    const journeyContent = document.getElementById('summaryJourneyContent');
    if (this.gameState.currentPath) {
      const pathData = gameData.careerPaths[this.gameState.currentPath];
      journeyContent.innerHTML = `
        <div class="journey-summary-card">
          <h4>${pathData.icon} ${pathData.label}</h4>
          <p>${pathData.description}</p>
          <p><strong>Total Scenes Completed:</strong> ${this.gameState.choices.length}</p>
        </div>
      `;
    }
    
    // Scores tab content - reuse final scores rendering
    const scoresContent = document.getElementById('summaryScoresContent');
    scoresContent.innerHTML = '<div class="score-bars" id="summaryScoreBars"></div>';
    
    // Decisions tab content
    const decisionsContent = document.getElementById('summaryDecisionsContent');
    let decisionsHTML = '<div class="decisions-list">';
    this.gameState.choices.forEach((choice, index) => {
      decisionsHTML += `
        <div class="decision-item">
          <h5>Scene ${index + 1}: ${choice.scene}</h5>
          <p>${choice.choiceText}</p>
        </div>
      `;
    });
    decisionsHTML += '</div>';
    decisionsContent.innerHTML = decisionsHTML;
  }

  // GAME CONTROLS
  restartGame() {
    // Reset game state
    this.gameState = {
      currentScene: 'start',
      currentPath: null,
      sceneNumber: 0,
      scores: { ...gameData.initialScores },
      choices: [],
      randomEvents: [],
      gameStarted: false,
      onboardingCompleted: this.settings.onboardingDone
    };
    
    // Reset UI
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('randomEvent').style.display = 'none';
    
    // Clear any active timeouts
    if (this.randomEventTimeout) {
      clearTimeout(this.randomEventTimeout);
      this.randomEventTimeout = null;
    }
    
    // Reset theme
    const header = document.querySelector('.header');
    header.style.background = '';
    
    // Render start scene
    this.renderScene();
    
    console.log('🔄 Game restarted');
  }

  toggleMusic() {
    this.settings.musicEnabled = !this.settings.musicEnabled;
    const musicBtn = document.getElementById('musicBtn');
    musicBtn.style.opacity = this.settings.musicEnabled ? '1' : '0.5';
    
    // In a real implementation, this would control background music
    console.log('🎵 Music toggled:', this.settings.musicEnabled ? 'ON' : 'OFF');
  }

  saveGame() {
    // Since localStorage is not available in sandbox, we'll just show a message
    this.showTempMessage('💾 Game state saved! (In-memory only)');
    console.log('💾 Game saved (in-memory):', this.gameState);
  }

  showTempMessage(message) {
    // Create temporary message overlay
    const messageEl = document.createElement('div');
    messageEl.className = 'temp-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: var(--space-16) var(--space-24);
      color: var(--color-text);
      z-index: 2000;
      animation: fadeInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 300);
    }, 2000);
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add fade out animation keyframes to document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: translate(-50%, -50%) translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Initialize the game
  window.game = new CareerExplorationGame();
});

// Expose game for debugging
window.gameData = gameData;
