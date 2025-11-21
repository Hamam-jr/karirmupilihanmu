// ============================================================================
// Enhanced IT Career Exploration Game - Main Application
// Version 7.0 - WITH WORKING SAVE/LOAD SYSTEM
// ============================================================================

class CareerExplorationGame {
  constructor() {
    // Game state - NOW WITH PROPER LOCALSTORAGE SUPPORT
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
    console.log('🎮 Initializing Career Exploration Game v7.0');
    
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.initializeTheme();
    
    // Check for saved game FIRST before showing onboarding
    if (this.hasSavedGame()) {
      this.showLoadGamePrompt();
    } else {
      // Show onboarding for first-time users
      if (!this.settings.onboardingDone) {
        this.showOnboarding();
      } else {
        this.hideOnboarding();
      }
      
      // Initialize first scene
      this.renderScene();
    }
  }

  // ============================================================================
  // SAVE/LOAD GAME SYSTEM - FULLY WORKING VERSION
  // ============================================================================

  saveGame() {
    try {
      // Prepare game state for saving
      const saveData = {
        version: "7.0",
        timestamp: new Date().toISOString(),
        gameState: {
          currentScene: this.gameState.currentScene,
          currentPath: this.gameState.currentPath,
          sceneNumber: this.gameState.sceneNumber,
          scores: { ...this.gameState.scores },
          choices: [...this.gameState.choices],
          randomEvents: [...this.gameState.randomEvents],
          gameStarted: this.gameState.gameStarted,
          onboardingCompleted: this.gameState.onboardingCompleted
        },
        settings: { ...this.settings }
      };

      // Save to localStorage
      localStorage.setItem('careerGameSave', JSON.stringify(saveData));
      
      // Show success message
      this.showTempMessage("✅ Progress tersimpan!");
      console.log("✅ Game saved successfully:", saveData);
      
      return true;
    } catch (error) {
      console.error("❌ Save failed:", error);
      this.showTempMessage("❌ Gagal menyimpan! Coba lagi.");
      return false;
    }
  }

  loadGame() {
    try {
      // Check if save exists
      const savedData = localStorage.getItem('careerGameSave');
      
      if (!savedData) {
        this.showTempMessage("⚠️ Tidak ada progress tersimpan.");
        return false;
      }

      // Parse saved data
      const saveData = JSON.parse(savedData);
      
      // Validate save data
      if (!saveData.gameState || !saveData.gameState.currentScene) {
        throw new Error("Invalid save data");
      }

      // Restore game state
      this.gameState = {
        currentScene: saveData.gameState.currentScene,
        currentPath: saveData.gameState.currentPath,
        sceneNumber: saveData.gameState.sceneNumber,
        scores: { ...saveData.gameState.scores },
        choices: [...saveData.gameState.choices],
        randomEvents: [...saveData.gameState.randomEvents],
        gameStarted: saveData.gameState.gameStarted,
        onboardingCompleted: saveData.gameState.onboardingCompleted || false
      };

      // Restore settings if available
      if (saveData.settings) {
        this.settings = { ...saveData.settings };
      }

      // Apply theme for current path
      if (this.gameState.currentPath) {
        this.applyCareerTheme(this.gameState.currentPath);
      }

      // Render current scene
      this.renderScene();
      
      // Show success message
      const date = new Date(saveData.timestamp);
      const dateStr = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      this.showTempMessage(`✅ Progress dimuat! (${dateStr})`);
      console.log("✅ Game loaded successfully:", saveData);
      
      return true;
    } catch (error) {
      console.error("❌ Load failed:", error);
      this.showTempMessage("❌ Gagal memuat progress! File rusak.");
      return false;
    }
  }

  autoSave() {
    // Auto-save silently without showing message
    try {
      const saveData = {
        version: "7.0",
        timestamp: new Date().toISOString(),
        gameState: { ...this.gameState },
        settings: { ...this.settings }
      };
      
      localStorage.setItem('careerGameAutoSave', JSON.stringify(saveData));
      console.log("💾 Auto-saved at scene:", this.gameState.currentScene);
      return true;
    } catch (error) {
      console.error("Auto-save failed:", error);
      return false;
    }
  }

  hasSavedGame() {
    try {
      const savedData = localStorage.getItem('careerGameSave');
      return savedData !== null && savedData !== '';
    } catch (error) {
      console.error("Error checking saved game:", error);
      return false;
    }
  }

  deleteSave() {
    try {
      localStorage.removeItem('careerGameSave');
      localStorage.removeItem('careerGameAutoSave');
      this.showTempMessage("🗑️ Progress dihapus.");
      console.log("Save data deleted");
      return true;
    } catch (error) {
      console.error("Delete save failed:", error);
      return false;
    }
  }

  showLoadGamePrompt() {
    try {
      const savedData = JSON.parse(localStorage.getItem('careerGameSave'));
      
      if (!savedData) return;

      const date = new Date(savedData.timestamp);
      const dateStr = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Create load game prompt overlay
      const overlayHTML = `
        <div id="loadGameOverlay" class="dialog-overlay" style="display: flex; z-index: 10000;">
          <div class="dialog-content" style="max-width: 500px;">
            <div class="dialog-header">
              <h2>🔄 Progress Tersimpan Ditemukan</h2>
            </div>
            <div class="dialog-body">
              <div style="background: var(--glass-bg); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                  <div style="font-size: 3rem;">${this.getPathIcon(savedData.gameState.currentPath)}</div>
                  <div>
                    <div style="font-weight: 600; font-size: 1.1rem;">
                      ${this.getPathLabel(savedData.gameState.currentPath)}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                      Scene ${savedData.gameState.sceneNumber} dari ~10
                    </div>
                  </div>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.85rem;">
                  📅 Terakhir dimainkan: ${dateStr}
                </div>
              </div>
              <div style="display: flex; gap: 1rem;">
                <button id="loadGameBtn" class="btn-primary" style="flex: 1;">
                  📂 Lanjutkan Progress
                </button>
                <button id="newGameBtn" class="btn-secondary" style="flex: 1;">
                  🎮 Mulai Baru
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Inject overlay to body
      document.body.insertAdjacentHTML('beforeend', overlayHTML);

      // Add event listeners
      document.getElementById('loadGameBtn').addEventListener('click', () => {
        this.loadGame();
        document.getElementById('loadGameOverlay').remove();
        this.hideOnboarding(); // Skip onboarding when loading
      });

      document.getElementById('newGameBtn').addEventListener('click', () => {
        const confirmed = confirm('⚠️ Yakin mulai permainan baru?\n\nProgress yang tersimpan akan DIHAPUS PERMANEN.');
        if (confirmed) {
          this.deleteSave();
          document.getElementById('loadGameOverlay').remove();
          
          // Show onboarding for new game
          if (!this.settings.onboardingDone) {
            this.showOnboarding();
          }
          
          // Reset and render start scene
          this.renderScene();
        }
      });

      // Close on overlay click
      document.getElementById('loadGameOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'loadGameOverlay') {
          document.getElementById('loadGameOverlay').remove();
          this.renderScene();
        }
      });

    } catch (error) {
      console.error("Error showing load prompt:", error);
      // If error, just start normally
      this.renderScene();
    }
  }

  getPathIcon(pathId) {
    const icons = {
      'guru': '👨‍🏫',
      'wira': '🚀',
      's2': '🎓',
      'ind': '💼'
    };
    return icons[pathId] || '🎮';
  }

  getPathLabel(pathId) {
    const labels = {
      'guru': 'Guru ASN',
      'wira': 'Wirausaha IT',
      's2': 'S2/Akademisi',
      'ind': 'Industri'
    };
    return labels[pathId] || 'Belum Memilih Jalur';
  }

  exportSave() {
    try {
      const saveData = localStorage.getItem('careerGameSave');
      if (!saveData) {
        this.showTempMessage("⚠️ Tidak ada progress untuk diexport.");
        return;
      }

      // Create blob and download
      const blob = new Blob([saveData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `career_game_save_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showTempMessage("📥 Save file berhasil didownload!");
    } catch (error) {
      console.error("Export failed:", error);
      this.showTempMessage("❌ Gagal export save file.");
    }
  }

  importSave(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        
        // Validate
        if (!saveData.gameState || !saveData.version) {
          throw new Error("Invalid save file");
        }

        // Save to localStorage
        localStorage.setItem('careerGameSave', e.target.result);
        
        // Load the game
        this.loadGame();
        this.showTempMessage("✅ Save file berhasil diimport!");
      } catch (error) {
        console.error("Import failed:", error);
        this.showTempMessage("❌ File save tidak valid!");
      }
    };
    reader.readAsText(file);
  }
  // ============================================================================
  // CORE GAME FUNCTIONS
  // ============================================================================

  renderScene() {
    const sceneId = this.gameState.currentScene;
    const scene = gameData.scenes[sceneId];

    if (!scene) {
      console.error('Scene not found:', sceneId);
      return;
    }

    // Update scene number counter
    if (sceneId !== 'start' && sceneId !== 'end' && !sceneId.includes('fail')) {
      this.gameState.sceneNumber++;
    }

    // Get elements
    const container = document.getElementById('gameContainer');
    const sceneTitle = document.getElementById('sceneTitle');
    const sceneText = document.getElementById('sceneText');
    const choicesContainer = document.getElementById('choicesContainer');
    const sceneCounter = document.getElementById('sceneCounter');

    // Update scene counter
    if (sceneCounter) {
      if (this.gameState.currentPath && sceneId !== 'start' && sceneId !== 'end') {
        sceneCounter.textContent = `Scene ${this.gameState.sceneNumber}`;
        sceneCounter.style.display = 'block';
      } else {
        sceneCounter.style.display = 'none';
      }
    }

    // Set title and text with fade animation
    if (sceneTitle && sceneText) {
      sceneTitle.style.opacity = '0';
      sceneText.style.opacity = '0';

      setTimeout(() => {
        sceneTitle.textContent = scene.title;
        sceneText.textContent = scene.text;
        sceneTitle.style.opacity = '1';
        sceneText.style.opacity = '1';
      }, 100);
    }

    // Clear and render choices
    if (choicesContainer) {
      choicesContainer.innerHTML = '';
      
      scene.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-button';
        choiceBtn.innerHTML = `
          <div class="choice-main">${choice.text}</div>
          ${choice.subtext ? `<div class="choice-subtext">${choice.subtext}</div>` : ''}
        `;
        
        choiceBtn.addEventListener('click', () => this.selectChoice(index));
        
        // Stagger animation
        choiceBtn.style.opacity = '0';
        choiceBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
          choiceBtn.style.transition = 'all 0.3s ease';
          choiceBtn.style.opacity = '1';
          choiceBtn.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
        
        choicesContainer.appendChild(choiceBtn);
      });
    }

    // Show game container
    if (container) {
      container.style.display = 'block';
    }

    // Update scores display
    this.updateScoreDisplay();

    // Auto-save after rendering scene (except start)
    if (this.gameState.gameStarted && sceneId !== 'start') {
      setTimeout(() => {
        this.autoSave();
      }, 500);
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectChoice(choiceIndex) {
    const sceneId = this.gameState.currentScene;
    const scene = gameData.scenes[sceneId];
    
    if (!scene || !scene.choices[choiceIndex]) {
      console.error('Invalid choice');
      return;
    }

    const choice = scene.choices[choiceIndex];

    // Mark game as started
    if (!this.gameState.gameStarted) {
      this.gameState.gameStarted = true;
    }

    // Record choice
    this.gameState.choices.push({
      scene: sceneId,
      choiceIndex: choiceIndex,
      choiceText: choice.text,
      timestamp: new Date().toISOString()
    });

    // Apply score effects
    if (choice.effects) {
      Object.entries(choice.effects).forEach(([dimension, value]) => {
        if (this.gameState.scores[dimension] !== undefined) {
          this.gameState.scores[dimension] += value;
          
          // Clamp scores between 0 and 100
          this.gameState.scores[dimension] = Math.max(0, Math.min(100, this.gameState.scores[dimension]));
        }
      });
    }

    // Set career path if starting from start scene
    if (sceneId === 'start') {
      const pathMap = {
        'guru_1': 'guru',
        'wira_1': 'wira',
        's2_1': 's2',
        'ind_1': 'ind'
      };
      
      const nextSceneId = choice.nextScene;
      if (pathMap[nextSceneId]) {
        this.gameState.currentPath = pathMap[nextSceneId];
        this.applyCareerTheme(this.gameState.currentPath);
      }
    }

    // Show score changes animation
    this.showScoreChanges(choice.effects);

    // Check for random event (30% chance)
    const shouldTriggerEvent = Math.random() < 0.3;
    if (shouldTriggerEvent && this.gameState.currentPath) {
      const randomEvent = gameData.getRandomEvent(this.gameState.currentPath);
      
      if (randomEvent) {
        this.showRandomEvent(randomEvent, () => {
          // After random event, move to next scene
          this.moveToNextScene(choice.nextScene);
        });
        return;
      }
    }

    // Check for fail condition (if any score below 30)
    const failScore = Object.entries(this.gameState.scores).find(([_, value]) => value < 30);
    
    if (failScore && this.gameState.currentPath) {
      const failSceneId = `${this.gameState.currentPath}_fail`;
      if (gameData.scenes[failSceneId]) {
        setTimeout(() => {
          this.gameState.currentScene = failSceneId;
          this.renderScene();
        }, 1000);
        return;
      }
    }

    // Move to next scene normally
    setTimeout(() => {
      this.moveToNextScene(choice.nextScene);
    }, 800);
  }

  moveToNextScene(nextSceneId) {
    if (!nextSceneId) {
      // End of game
      this.showResults();
      return;
    }

    this.gameState.currentScene = nextSceneId;
    this.renderScene();

    // Auto-save after moving to next scene
    setTimeout(() => {
      this.autoSave();
    }, 1000);
  }

  showResults() {
    const avgScore = gameData.calculateAverageScore(this.gameState.scores);
    const fitLevel = gameData.getFitLevel(avgScore);
    const recommendation = gameData.generateRecommendation(
      this.gameState.scores, 
      this.gameState.currentPath
    );

    // Get elements
    const container = document.getElementById('gameContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!resultsContainer) {
      console.error('Results container not found');
      return;
    }

    // Hide game container
    if (container) {
      container.style.display = 'none';
    }

    // Build results HTML
    resultsContainer.innerHTML = `
      <div class="results-content" style="animation: fadeIn 0.5s ease;">
        <div class="results-header">
          <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">🎉 Perjalanan Selesai!</h1>
          <p style="color: var(--text-secondary); font-size: 1.1rem;">
            Berikut adalah analisis kesesuaian karir berdasarkan pilihan-pilihanmu
          </p>
        </div>

        <!-- Career Path Result -->
        <div class="result-card" style="background: linear-gradient(135deg, ${this.getPathColor(this.gameState.currentPath)}33, ${this.getPathColor(this.gameState.currentPath)}11); border: 2px solid ${this.getPathColor(this.gameState.currentPath)};">
          <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div style="font-size: 4rem;">${this.getPathIcon(this.gameState.currentPath)}</div>
            <div style="flex: 1;">
              <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${recommendation.careerPath}</h2>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="fit-badge" style="background: ${fitLevel.color}; color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 600;">
                  ${recommendation.fitLevel}
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; color: ${fitLevel.color};">
                  ${avgScore}%
                </div>
              </div>
            </div>
          </div>
          <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-primary);">
            ${recommendation.advice}
          </p>
        </div>

        <!-- Detailed Scores -->
        <div class="result-card">
          <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">📊 Skor Detail per Dimensi</h3>
          <div class="scores-grid">
            ${Object.entries(this.gameState.scores).map(([dimension, score]) => {
              const dimensionData = gameData.scores[dimension];
              const percentage = score;
              const color = this.getScoreColor(score);
              
              return `
                <div class="score-item">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600;">${dimensionData.icon} ${dimensionData.label}</span>
                    <span style="font-weight: 700; color: ${color};">${score}%</span>
                  </div>
                  <div class="score-bar">
                    <div class="score-bar-fill" style="width: ${percentage}%; background: ${color};"></div>
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">
                    ${dimensionData.description}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Strengths and Improvements -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          ${recommendation.strengths.length > 0 ? `
            <div class="result-card" style="background: linear-gradient(135deg, #22c55e22, #22c55e11); border: 1px solid #22c55e44;">
              <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: #22c55e;">✅ Kekuatan Kamu</h3>
              <ul style="list-style: none; padding: 0;">
                ${recommendation.strengths.map(s => `
                  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--glass-border);">
                    <strong>${s.dimension}</strong>: ${s.score}%
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${recommendation.improvements.length > 0 ? `
            <div class="result-card" style="background: linear-gradient(135deg, #f59e0b22, #f59e0b11); border: 1px solid #f59e0b44;">
              <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: #f59e0b;">⚠️ Area untuk Dikembangkan</h3>
              <ul style="list-style: none; padding: 0;">
                ${recommendation.improvements.map(i => `
                  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--glass-border);">
                    <strong>${i.dimension}</strong>: ${i.score}%
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- Journey Stats -->
        <div class="result-card">
          <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">📈 Statistik Perjalanan</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
            <div style="text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-primary);">${this.gameState.sceneNumber}</div>
              <div style="color: var(--text-secondary); margin-top: 0.5rem;">Total Scene</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-primary);">${this.gameState.choices.length}</div>
              <div style="color: var(--text-secondary); margin-top: 0.5rem;">Keputusan Dibuat</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-primary);">${this.gameState.randomEvents.length}</div>
              <div style="color: var(--text-secondary); margin-top: 0.5rem;">Random Events</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem;">
          <button id="playAgainBtn" class="btn-primary">
            🔄 Main Lagi
          </button>
          <button id="exportResultsBtn" class="btn-secondary">
            📥 Export Hasil
          </button>
          <button id="saveResultsBtn" class="btn-secondary">
            💾 Simpan Progress
          </button>
        </div>
      </div>
    `;

    // Show results container
    resultsContainer.style.display = 'block';

    // Add event listeners
    document.getElementById('playAgainBtn')?.addEventListener('click', () => {
      if (confirm('Mulai permainan baru? Progress saat ini akan disimpan ke riwayat.')) {
        this.restartGame();
      }
    });

    document.getElementById('exportResultsBtn')?.addEventListener('click', () => {
      this.exportResults(recommendation);
    });

    document.getElementById('saveResultsBtn')?.addEventListener('click', () => {
      this.saveGame();
    });

    // Auto-save final results
    setTimeout(() => {
      this.saveGame();
    }, 1000);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getScoreColor(score) {
    if (score >= 80) return '#22c55e';
    if (score >= 65) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  getPathColor(pathId) {
    const colors = {
      'guru': '#22c55e',
      'wira': '#f97316',
      's2': '#3b82f6',
      'ind': '#8b5cf6'
    };
    return colors[pathId] || '#6b7280';
  }

  exportResults(recommendation) {
    const resultsData = {
      version: "7.0",
      timestamp: new Date().toISOString(),
      careerPath: recommendation.careerPath,
      averageScore: recommendation.averageScore,
      fitLevel: recommendation.fitLevel,
      scores: this.gameState.scores,
      choices: this.gameState.choices,
      stats: {
        totalScenes: this.gameState.sceneNumber,
        totalChoices: this.gameState.choices.length,
        randomEvents: this.gameState.randomEvents.length
      },
      advice: recommendation.advice
    };

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_results_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showTempMessage("📥 Hasil berhasil diexport!");
  }

  restartGame() {
    // Delete current save
    this.deleteSave();
    
    // Reset game state
    this.gameState = {
      currentScene: 'start',
      currentPath: null,
      sceneNumber: 0,
      scores: { ...gameData.initialScores },
      choices: [],
      randomEvents: [],
      gameStarted: false,
      onboardingCompleted: true
    };

    // Hide results
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }

    // Reset theme
    document.documentElement.style.setProperty('--accent-primary', '#6366f1');
    document.documentElement.style.setProperty('--accent-secondary', '#818cf8');

    // Render start scene
    this.renderScene();
    
    this.showTempMessage("🎮 Game direset! Mulai perjalanan baru.");
  }
  // ============================================================================
  // UI HELPER FUNCTIONS
  // ============================================================================

  updateScoreDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (!scoreDisplay) return;

    scoreDisplay.innerHTML = Object.entries(this.gameState.scores)
      .map(([dimension, value]) => {
        const dimensionData = gameData.scores[dimension];
        const color = this.getScoreColor(value);
        
        return `
          <div class="score-item-mini">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-size: 0.85rem; color: var(--text-secondary);">
                ${dimensionData.icon} ${dimensionData.label}
              </span>
              <span style="font-weight: 700; color: ${color}; font-size: 0.9rem;">
                ${value}
              </span>
            </div>
            <div class="score-bar-mini">
              <div class="score-bar-fill-mini" style="width: ${value}%; background: ${color};"></div>
            </div>
          </div>
        `;
      }).join('');
  }

  showScoreChanges(effects) {
    if (!effects || Object.keys(effects).length === 0) return;

    const changesHTML = Object.entries(effects)
      .filter(([_, value]) => value !== 0)
      .map(([dimension, value]) => {
        const dimensionData = gameData.scores[dimension];
        const sign = value > 0 ? '+' : '';
        const color = value > 0 ? '#22c55e' : '#ef4444';
        
        return `
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: ${value > 0 ? '#22c55e22' : '#ef444422'}; border-radius: 0.5rem;">
            <span>${dimensionData.icon}</span>
            <span style="flex: 1;">${dimensionData.label}</span>
            <span style="font-weight: 700; color: ${color};">${sign}${value}</span>
          </div>
        `;
      }).join('');

    const popup = document.createElement('div');
    popup.className = 'score-changes-popup';
    popup.innerHTML = `
      <div style="background: var(--glass-bg); backdrop-filter: blur(20px); padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--glass-border); max-width: 300px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        <div style="font-weight: 600; margin-bottom: 1rem; font-size: 1.1rem;">📊 Perubahan Skor</div>
        ${changesHTML}
      </div>
    `;
    
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = '0';
      popup.style.transform = 'translateY(-20px)';
      setTimeout(() => popup.remove(), 300);
    }, 2500);
  }

  showRandomEvent(event, callback) {
    this.gameState.randomEvents.push({
      id: event.id,
      title: event.title,
      timestamp: new Date().toISOString()
    });

    const eventHTML = `
      <div id="randomEventOverlay" class="dialog-overlay" style="display: flex;">
        <div class="dialog-content" style="max-width: 500px;">
          <div class="dialog-header" style="background: ${event.type === 'positive' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : event.type === 'negative' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};">
            <h2 style="color: white;">⚡ Event Acak!</h2>
          </div>
          <div class="dialog-body">
            <div style="text-align: center; font-size: 3rem; margin: 1rem 0;">
              ${event.type === 'positive' ? '🎉' : event.type === 'negative' ? '⚠️' : '📢'}
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 1rem; text-align: center;">
              ${event.title}
            </h3>
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.5rem;">
              ${event.text}
            </p>
            
            ${Object.keys(event.effects).length > 0 ? `
              <div style="background: var(--glass-bg); padding: 1rem; border-radius: 0.75rem; margin-bottom: 1rem;">
                <div style="font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">Dampak:</div>
                ${Object.entries(event.effects).map(([dimension, value]) => {
                  const dimensionData = gameData.scores[dimension];
                  const sign = value > 0 ? '+' : '';
                  const color = value > 0 ? '#22c55e' : '#ef4444';
                  return `
                    <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
                      <span>${dimensionData.icon} ${dimensionData.label}</span>
                      <span style="font-weight: 700; color: ${color};">${sign}${value}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
            
            <button id="continueBtn" class="btn-primary" style="width: 100%;">
              ✅ Lanjutkan
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', eventHTML);

    // Apply effects
    if (event.effects) {
      Object.entries(event.effects).forEach(([dimension, value]) => {
        if (this.gameState.scores[dimension] !== undefined) {
          this.gameState.scores[dimension] += value;
          this.gameState.scores[dimension] = Math.max(0, Math.min(100, this.gameState.scores[dimension]));
        }
      });
      this.updateScoreDisplay();
    }

    document.getElementById('continueBtn').addEventListener('click', () => {
      document.getElementById('randomEventOverlay').remove();
      if (callback) callback();
    });
  }

  showTempMessage(message) {
    const existing = document.getElementById('tempMessage');
    if (existing) existing.remove();

    const messageDiv = document.createElement('div');
    messageDiv.id = 'tempMessage';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      color: var(--text-primary);
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid var(--glass-border);
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: 500;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  applyCareerTheme(pathId) {
    const themes = {
      guru: {
        primary: '#22c55e',
        secondary: '#86efac'
      },
      wira: {
        primary: '#f97316',
        secondary: '#fdba74'
      },
      s2: {
        primary: '#3b82f6',
        secondary: '#93c5fd'
      },
      ind: {
        primary: '#8b5cf6',
        secondary: '#c4b5fd'
      }
    };

    const theme = themes[pathId];
    if (theme) {
      document.documentElement.style.setProperty('--accent-primary', theme.primary);
      document.documentElement.style.setProperty('--accent-secondary', theme.secondary);
    }
  }

  // ============================================================================
  // ONBOARDING SYSTEM
  // ============================================================================

  showOnboarding() {
    const onboarding = document.getElementById('onboarding');
    if (!onboarding) return;

    onboarding.style.display = 'flex';
    this.currentSlide = 0;
    this.renderOnboardingSlide();
  }

  hideOnboarding() {
    const onboarding = document.getElementById('onboarding');
    if (onboarding) {
      onboarding.style.display = 'none';
      this.settings.onboardingDone = true;
    }
  }

  renderOnboardingSlide() {
    const slides = [
      {
        icon: '🎮',
        title: 'Selamat Datang!',
        text: 'Game ini akan membantumu mengeksplorasi berbagai jalur karir di bidang IT. Setiap pilihan yang kamu buat akan mempengaruhi hasil akhirmu.'
      },
      {
        icon: '🎯',
        title: 'Cara Bermain',
        text: 'Kamu akan menghadapi berbagai situasi dan dilema. Pilih opsi yang paling sesuai dengan kepribadian dan aspirasi karirmu. Tidak ada jawaban benar atau salah!'
      },
      {
        icon: '📊',
        title: 'Sistem Penilaian',
        text: 'Setiap pilihan mempengaruhi 5 dimensi: Minat, Keseimbangan, Penghasilan, Nilai Diri, dan Kepuasan. Skor akhir menentukan kesesuaian jalur karir untukmu.'
      },
      {
        icon: '💾',
        title: 'Progress Otomatis Tersimpan',
        text: 'Jangan khawatir! Progress kamu akan otomatis tersimpan. Kamu bisa melanjutkan kapan saja tanpa kehilangan kemajuan.'
      }
    ];

    const slide = slides[this.currentSlide];
    const slideContainer = document.querySelector('.onboarding-slide');
    
    if (slideContainer) {
      slideContainer.innerHTML = `
        <div class="onboarding-icon">${slide.icon}</div>
        <h2>${slide.title}</h2>
        <p>${slide.text}</p>
      `;
    }

    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    // Update buttons
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const startBtn = document.getElementById('startGame');

    if (prevBtn) prevBtn.style.display = this.currentSlide === 0 ? 'none' : 'block';
    if (nextBtn) nextBtn.style.display = this.currentSlide === slides.length - 1 ? 'none' : 'block';
    if (startBtn) startBtn.style.display = this.currentSlide === slides.length - 1 ? 'block' : 'none';
  }

  nextSlide() {
    if (this.isTransitioning) return;
    
    const maxSlides = 4;
    if (this.currentSlide < maxSlides - 1) {
      this.isTransitioning = true;
      this.currentSlide++;
      this.renderOnboardingSlide();
      setTimeout(() => this.isTransitioning = false, 300);
    }
  }

  prevSlide() {
    if (this.isTransitioning) return;
    
    if (this.currentSlide > 0) {
      this.isTransitioning = true;
      this.currentSlide--;
      this.renderOnboardingSlide();
      setTimeout(() => this.isTransitioning = false, 300);
    }
  }

  // ============================================================================
  // EVENT LISTENERS SETUP
  // ============================================================================

  setupEventListeners() {
    // Onboarding controls
    document.getElementById('prevSlide')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('nextSlide')?.addEventListener('click', () => this.nextSlide());
    document.getElementById('startGame')?.addEventListener('click', () => this.hideOnboarding());
    document.getElementById('skipOnboarding')?.addEventListener('click', () => this.hideOnboarding());

    // Settings controls
    document.getElementById('toggleMusic')?.addEventListener('click', () => this.toggleMusic());
    document.getElementById('toggleAnimations')?.addEventListener('click', () => this.toggleAnimations());
    document.getElementById('toggleTheme')?.addEventListener('click', () => this.toggleTheme());
    
    // Save/Load controls
    document.getElementById('saveGameBtn')?.addEventListener('click', () => this.saveGame());
    document.getElementById('loadGameBtn')?.addEventListener('click', () => this.loadGame());
    document.getElementById('exportSaveBtn')?.addEventListener('click', () => this.exportSave());
    
    // About dialog
    document.getElementById('aboutBtn')?.addEventListener('click', () => this.showAboutDialog());
    document.getElementById('helpBtn')?.addEventListener('click', () => this.showHelpDialog());

    // Close dialogs on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('dialog-overlay')) {
        e.target.style.display = 'none';
      }
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Onboarding navigation
      if (document.getElementById('onboarding')?.style.display !== 'none') {
        if (e.key === 'ArrowRight') this.nextSlide();
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'Enter' && this.currentSlide === 3) this.hideOnboarding();
      }

      // Choice selection (1-4 keys)
      if (e.key >= '1' && e.key <= '4') {
        const choiceIndex = parseInt(e.key) - 1;
        const choices = document.querySelectorAll('.choice-button');
        if (choices[choiceIndex]) {
          choices[choiceIndex].click();
        }
      }

      // Save game (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveGame();
      }
    });
  }

  initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'dark');
  }

  toggleMusic() {
    this.settings.musicEnabled = !this.settings.musicEnabled;
    const btn = document.getElementById('toggleMusic');
    if (btn) {
      btn.textContent = this.settings.musicEnabled ? '🔊' : '🔇';
    }
    this.showTempMessage(this.settings.musicEnabled ? '🔊 Musik aktif' : '🔇 Musik mati');
  }

  toggleAnimations() {
    this.settings.animationsEnabled = !this.settings.animationsEnabled;
    const btn = document.getElementById('toggleAnimations');
    if (btn) {
      btn.innerHTML = this.settings.animationsEnabled ? '✨' : '🚫';
    }
    this.showTempMessage(this.settings.animationsEnabled ? '✨ Animasi aktif' : '🚫 Animasi mati');
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    this.showTempMessage(newTheme === 'dark' ? '🌙 Mode gelap' : '☀️ Mode terang');
  }

  showAboutDialog() {
    const dialog = document.getElementById('aboutDialog');
    if (dialog) dialog.style.display = 'flex';
  }

  showHelpDialog() {
    const helpHTML = `
      <div id="helpDialog" class="dialog-overlay" style="display: flex;">
        <div class="dialog-content">
          <div class="dialog-header">
            <h2>❓ Bantuan</h2>
            <button class="close-btn" onclick="document.getElementById('helpDialog').remove()">✕</button>
          </div>
          <div class="dialog-body">
            <h3>Cara Bermain:</h3>
            <ul style="line-height: 1.8;">
              <li>Pilih salah satu dari 4 jalur karir yang tersedia</li>
              <li>Baca setiap situasi dengan seksama</li>
              <li>Pilih opsi yang paling sesuai dengan nilai dan aspirasi kamu</li>
              <li>Perhatikan perubahan skor di setiap dimensi</li>
              <li>Selesaikan perjalanan untuk melihat hasil analisis</li>
            </ul>
            
            <h3 style="margin-top: 1.5rem;">Shortcut Keyboard:</h3>
            <ul style="line-height: 1.8;">
              <li><kbd>1-4</kbd>: Pilih opsi 1-4</li>
              <li><kbd>Ctrl/Cmd + S</kbd>: Simpan game</li>
              <li><kbd>→ ←</kbd>: Navigasi onboarding</li>
            </ul>

            <h3 style="margin-top: 1.5rem;">Tips:</h3>
            <ul style="line-height: 1.8;">
              <li>Tidak ada jawaban benar atau salah</li>
              <li>Progress otomatis tersimpan setiap scene</li>
              <li>Kamu bisa export hasil untuk dokumentasi</li>
              <li>Coba jalur berbeda untuk eksplorasi lengkap</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', helpHTML);
  }
}

// ============================================================================
// INITIALIZE GAME ON PAGE LOAD
// ============================================================================

// Wait for DOM and gameData to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

function initGame() {
  if (typeof gameData === 'undefined') {
    console.error('gameData not loaded! Make sure game_data.js is included before app.js');
    return;
  }
  
  console.log('🚀 Starting Career Exploration Game...');
  window.game = new CareerExplorationGame();
}

// ============================================================================
// UTILITY: Add CSS animations if not present
// ============================================================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .score-changes-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: all 0.3s ease;
  }

  kbd {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 0.25rem;
    padding: 0.125rem 0.375rem;
    font-family: monospace;
    font-size: 0.875rem;
  }
`;
document.head.appendChild(style);

// ============================================================================
// END OF FILE - app.js v7.0 with Working Save/Load System
// ============================================================================
