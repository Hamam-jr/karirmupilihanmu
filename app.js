<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Karirmu, Pilihanmu: Eksplorasi Karir IT</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <h1 class="game-title">Karirmu, Pilihanmu</h1>
            <p class="game-subtitle">Game Naratif Interaktif untuk Mahasiswa Pendidikan Teknik Informatika</p>
            <div class="header-controls">
                <button class="control-btn" id="musicBtn" title="Toggle Music" aria-label="Toggle Music">
                    <span>🎵</span>
                </button>
                <button class="control-btn" id="restartBtn" title="Restart Game" aria-label="Restart Game">
                    <span>🔄</span>
                </button>
                <button class="control-btn" id="helpBtn" title="Help" aria-label="Help">
                    <span>❓</span>
                </button>
                <button class="control-btn" id="saveBtn" title="Save Game" aria-label="Save Game">
                    <span>💾</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Progress Bar -->
    <div class="progress-container" id="progressContainer" style="display: none;">
        <div class="progress-label">
            <span id="progressText">Scene 1 of 10</span>
        </div>
        <div class="progress-steps">
            <div class="progress-step active" data-step="1"></div>
            <div class="progress-step" data-step="2"></div>
            <div class="progress-step" data-step="3"></div>
            <div class="progress-step" data-step="4"></div>
            <div class="progress-step" data-step="5"></div>
            <div class="progress-step" data-step="6"></div>
            <div class="progress-step" data-step="7"></div>
            <div class="progress-step" data-step="8"></div>
            <div class="progress-step" data-step="9"></div>
            <div class="progress-step" data-step="10"></div>
        </div>
    </div>

    <!-- Main Game Container -->
    <main class="main-container">
        <!-- Scene Card -->
        <div class="scene-card glass-morph" id="sceneCard">
            <!-- Character Portrait -->
            <div class="character-portrait" id="characterPortrait" style="display: none;">
                <div class="portrait-frame">
                    <div class="portrait-image">👨‍🎓</div>
                </div>
                <div class="character-name" id="characterName">Kamu</div>
            </div>

            <!-- Scene Content -->
            <div class="scene-content">
                <div class="scene-header">
                    <h2 class="scene-title" id="sceneTitle">Memulai Perjalanan</h2>
                    <div class="scene-counter" id="sceneCounter" style="display: none;">Scene 1</div>
                </div>
                <div class="scene-text" id="sceneText">
                    <p>Kamu adalah mahasiswa semester akhir Pendidikan Teknik Informatika. Saatnya memutuskan jalan karirmu setelah lulus nanti. Ada beberapa jalur yang bisa kamu pilih.</p>
                </div>

                <!-- Scoreboard -->
                <div class="scoreboard" id="scoreboard" style="display: none;">
                    <div class="score-item" data-score="minat">
                        <span class="score-icon">🎯</span>
                        <span class="score-label">Minat</span>
                        <span class="score-value" id="scoreMinat">50</span>
                    </div>
                    <div class="score-item" data-score="keseimbangan">
                        <span class="score-icon">⚖️</span>
                        <span class="score-label">Balance</span>
                        <span class="score-value" id="scoreKeseimbangan">50</span>
                    </div>
                    <div class="score-item" data-score="penghasilan">
                        <span class="score-icon">💰</span>
                        <span class="score-label">Income</span>
                        <span class="score-value" id="scorePenghasilan">50</span>
                    </div>
                    <div class="score-item" data-score="nilai">
                        <span class="score-icon">💎</span>
                        <span class="score-label">Self Worth</span>
                        <span class="score-value" id="scoreNilai">50</span>
                    </div>
                    <div class="score-item" data-score="kepuasan">
                        <span class="score-icon">😊</span>
                        <span class="score-label">Satisfaction</span>
                        <span class="score-value" id="scoreKepuasan">50</span>
                    </div>
                </div>

                <!-- Random Event Overlay -->
                <div class="random-event" id="randomEvent" style="display: none;">
                    <div class="random-event-content">
                        <div class="random-event-icon">⚡</div>
                        <div class="random-event-text"></div>
                        <button class="random-event-dismiss">×</button>
                    </div>
                </div>

                <!-- Choices Container -->
                <div class="choices-container" id="choicesContainer">
                </div>
            </div>
        </div>

        <!-- End Screen -->
        <div class="end-screen glass-morph" id="endScreen" style="display: none;">
            <div class="end-content">
                <h2 class="end-title">Perjalanan Selesai! 🎉</h2>
                
                <div class="career-fit-result">
                    <div class="fit-circle">
                        <div class="fit-percentage" id="fitPercentage">85%</div>
                        <div class="fit-emoji" id="fitEmoji">😍</div>
                    </div>
                    <div class="fit-description">
                        <h3 id="fitLabel">Sangat Cocok!</h3>
                        <p id="fitExplanation">Pilihan-pilihanmu menunjukkan kecocokan yang tinggi dengan jalur karir ini.</p>
                    </div>
                </div>

                <div class="journey-summary">
                    <h3>Ringkasan Perjalanan</h3>
                    <div class="journey-path" id="journeyPath">
                        <!-- Journey nodes will be populated by JavaScript -->
                    </div>
                </div>

                <div class="final-scores">
                    <h3>Skor Akhir</h3>
                    <div class="score-bars" id="finalScores">
                        <!-- Score bars will be populated by JavaScript -->
                    </div>
                </div>

                <div class="end-actions">
                    <button class="btn btn-primary btn-large" id="playAgainBtn">
                        <span>🎮</span> Mainkan Lagi
                    </button>
                    <button class="btn btn-secondary" id="viewSummaryBtn">
                        <span>📊</span> Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    </main>

    <!-- Onboarding Overlay -->
    <div class="onboarding-overlay" id="onboardingOverlay">
        <div class="onboarding-content glass-morph">
            <div class="onboarding-slide" data-slide="0">
                <h2>Selamat Datang! 👋</h2>
                <p>Kamu akan menjelajahi 4 jalur karir IT yang berbeda. Setiap pilihan mempengaruhi perjalananmu!</p>
            </div>
            <div class="onboarding-slide" data-slide="1" style="display: none;">
                <h2>Sistem Skor 📊</h2>
                <p>Ada 5 dimensi yang akan berkembang: Minat, Keseimbangan, Penghasilan, Nilai Diri, dan Kepuasan.</p>
            </div>
            <div class="onboarding-slide" data-slide="2" style="display: none;">
                <h2>Random Events ⚡</h2>
                <p>Kadang-kadang kejadian acak akan muncul, menambah realisme pada perjalananmu.</p>
            </div>
            <div class="onboarding-slide" data-slide="3" style="display: none;">
                <h2>Career Fit 🎯</h2>
                <p>Di akhir, kamu akan melihat seberapa cocok pilihan-pilihanmu dengan jalur karirmu. Selamat bermain!</p>
            </div>
            
            <div class="onboarding-navigation">
                <button class="btn btn-secondary" id="skipOnboarding">Lewati</button>
                <div class="slide-indicators">
                    <span class="indicator active"></span>
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                    <span class="indicator"></span>
                </div>
                <div class="nav-buttons">
                    <button class="btn btn-outline" id="prevSlide" disabled>Sebelumnya</button>
                    <button class="btn btn-primary" id="nextSlide">Selanjutnya</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Help Dialog -->
    <div class="dialog-overlay" id="helpDialog" style="display: none;">
        <div class="dialog glass-morph">
            <div class="dialog-header">
                <h3>Panduan Bermain</h3>
                <button class="dialog-close" id="closeHelp">×</button>
            </div>
            <div class="dialog-content">
                <div class="help-section">
                    <h4>🎯 Cara Bermain</h4>
                    <ul>
                        <li>Pilih salah satu dari 4 jalur karir IT</li>
                        <li>Baca cerita dan pilih respons yang paling sesuai denganmu</li>
                        <li>Setiap pilihan mempengaruhi 5 dimensi skor</li>
                        <li>Hadapi kejadian acak yang menambah realisme</li>
                        <li>Selesaikan 6 scene untuk melihat career fit-mu</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h4>📊 Dimensi Skor</h4>
                    <ul>
                        <li><span>🎯</span> <strong>Minat:</strong> Passion dan motivasi internal</li>
                        <li><span>⚖️</span> <strong>Keseimbangan:</strong> Work-life balance</li>
                        <li><span>💰</span> <strong>Penghasilan:</strong> Stabilitas finansial</li>
                        <li><span>💎</span> <strong>Nilai Diri:</strong> Kepercayaan diri dan aktualisasi</li>
                        <li><span>😊</span> <strong>Kepuasan:</strong> Fulfillment dan kebahagiaan</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h4>⌨️ Keyboard Shortcuts</h4>
                    <ul>
                        <li><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd> - Pilih opsi</li>
                        <li><kbd>Enter</kbd> - Pilih opsi pertama</li>
                        <li><kbd>R</kbd> - Restart game</li>
                        <li><kbd>H</kbd> - Buka panduan ini</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Dialog -->
    <div class="dialog-overlay" id="summaryDialog" style="display: none;">
        <div class="dialog dialog-large glass-morph">
            <div class="dialog-header">
                <h3>Ringkasan Lengkap</h3>
                <button class="dialog-close" id="closeSummary">×</button>
            </div>
            <div class="dialog-content">
                <div class="summary-tabs">
                    <button class="tab-button active" data-tab="journey">🛤️ Perjalanan</button>
                    <button class="tab-button" data-tab="scores">📊 Skor</button>
                    <button class="tab-button" data-tab="decisions">🎯 Keputusan</button>
                </div>
                
                <div class="tab-content" id="journeyTab">
                    <h4>Jalur yang Dipilih</h4>
                    <div id="summaryJourneyContent"></div>
                </div>
                
                <!-- Load Game Overlay -->
                <div id="loadGameOverlay" class="dialog-overlay" style="display: none;"></div>
                <!-- About Dialog -->
                <div id="aboutDialog" class="dialog-overlay" style="display: none;"></div>
                <!-- Random Event Overlay -->
                <div id="randomEventOverlay" class="dialog-overlay" style="display: none;"></div>
                <!-- Results Container -->
                <div id="resultsContainer" style="display: none;"></div>
                <!-- Game Container -->
                <div id="gameContainer" style="display: none;"></div>
                <!-- Score Display -->
                <div id="scoreDisplay" style="display: none;"></div>
                <!-- Temp Message -->
                <div id="tempMessage" style="display: none;"></div>
                <!-- Onboarding -->
                <div id="onboarding" style="display: none;"></div>
                <!-- Hidden Buttons for JS listeners -->
                <button id="aboutBtn" style="display: none;"></button>
                <button id="saveGameBtn" style="display: none;"></button>
                <button id="loadGameBtn" style="display: none;"></button>
                <button id="newGameBtn" style="display: none;"></button>
                <button id="exportResultsBtn" style="display: none;"></button>
                <button id="exportSaveBtn" style="display: none;"></button>
                <button id="saveResultsBtn" style="display: none;"></button>
                <button id="continueBtn" style="display: none;"></button>
                <button id="startGame" style="display: none;"></button>
                <button id="toggleAnimations" style="display: none;"></button>
                <button id="toggleMusic" style="display: none;"></button>
                <button id="toggleTheme" style="display: none;"></button>
                <button id="skipOnboarding" style="display: none;"></button>
                <button id="prevSlide" style="display: none;"></button>
                <button id="nextSlide" style="display: none;"></button>
                
                <div class="tab-content" id="scoresTab" style="display: none;">
                    <h4>Evolusi Skor</h4>
                    <div id="summaryScoresContent"></div>
                </div>
                
                <div class="tab-content" id="decisionsTab" style="display: none;">
                    <h4>Riwayat Keputusan</h4>
                    <div id="summaryDecisionsContent"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen" style="display: none;">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Memuat game...</p>
        </div>
    </div>

    <script src="game_data22.js"></script>
    <script src="app.js"></script>
    <div id="failAlert" class="fail-alert" style="display:none;">
  <strong>🚫 Karirmu gagal di jalur ini!</strong> Evaluasi ulang pilihanmu. Gagal itu nyata dan bagian proses belajar.
</div>

</body>
</html>
