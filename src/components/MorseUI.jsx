import { Activity, History as HistoryIcon, Radio, Music, Settings } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { PresetDropdown } from './PresetDropdown';
import { ControlPanel } from './ControlPanel';
import { QualityControls } from './QualityControls';
import { CharacterDisplay } from './CharacterDisplay';
import { CharacterGrid } from './CharacterGrid';
import { ScoreDisplay } from './ScoreDisplay';
import { History } from './History';
import { PerformanceGraph } from './PerformanceGraph';
import { AvailableChars } from './AvailableChars';
import { AudioControls } from './AudioControls';
import { LevelProgress } from './LevelProgress';
import { FloatingNotification } from './Notification';
import { MainButton } from './MainButton';
import { ModeToggle } from './ModeToggle';
import { SidePanel } from './SidePanel';
import { useState } from 'react';

const BetaBanner = () => (
  <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-500/90 via-yellow-400/90 to-yellow-500/90 text-black py-3 px-4 text-center font-bold z-50 shadow-lg backdrop-blur-sm">
    <div className="flex items-center justify-center gap-3">
      <span className="animate-bounce">🚧</span>
      <span>BETA VERSION - IN DEVELOPMENT</span>
      <span className="animate-bounce">🚧</span>
    </div>
  </div>
);

const MorseUI = ({
  isPlaying,
  onTogglePlay,
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  wpm,
  onWpmChange,
  availableChars,
  consecutiveCorrect,
  userInput,
  currentGroupSize,
  score,
  history,
  maxLevel,
  notification,
  onCharacterInput,
  performanceData,
  headCopyMode,
  onHeadCopyMode,
  showAnswer,
  onShowAnswer,
  currentGroup,
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange,
  presets,
  currentPreset,
  onPresetChange,
  advanceThreshold,
  onAdvanceThresholdChange,
  farnsworthSpacing,
  onFarnsworthChange
}) => {
  const [mainButtonElement, setMainButtonElement] = useState(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [progressiveSpeedMode, setProgressiveSpeedMode] = useState(false);

  const handleProgressiveSpeedToggle = () => {
    setProgressiveSpeedMode(!progressiveSpeedMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <BetaBanner />
      <FloatingNotification
        notification={notification}
        buttonElement={mainButtonElement}
      />

      <button
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        className="fixed right-4 sm:right-6 top-40 z-50 p-3 rounded-xl
          bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm
          border border-gray-600/50 shadow-lg hover:scale-105
          transition-all duration-300 hover:bg-gray-700"
      >
        <Settings size={24} />
      </button>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Morse Code Trainer
          </h1>
          <p className="text-xl font-medium text-gray-400">
            {currentPreset?.name || 'Loading...'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Core Training */}
          <div className="space-y-8">
            <MainButton
              isPlaying={isPlaying}
              onClick={onTogglePlay}
              onButtonRef={setMainButtonElement}
            />

            <AnimatedSection title="Practice Area" icon={Radio} defaultOpen={true}>
              <div className="space-y-6">
                <CharacterDisplay
                  headCopyMode={headCopyMode}
                  showAnswer={showAnswer}
                  userInput={userInput}
                  currentGroupSize={currentGroupSize}
                  currentGroup={currentGroup}
                  onShowAnswer={onShowAnswer}
                />

                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <CharacterGrid
                    availableChars={availableChars}
                    onCharacterInput={onCharacterInput}
                    currentPreset={currentPreset}
                  />
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-6">
              <ModeToggle
                label="Head Copy Mode"
                description="Hide the text while practicing"
                isActive={headCopyMode}
                onToggle={onHeadCopyMode}
              />
              <ModeToggle
                label="Progressive Speed"
                description="Speed increases with level"
                isActive={progressiveSpeedMode}
                onToggle={handleProgressiveSpeedToggle}
              />
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <AnimatedSection title="History" icon={HistoryIcon} defaultOpen={true}>
              <div className="space-y-6">
                <History history={history} />
              </div>
            </AnimatedSection>

            <AnimatedSection title="Performance" icon={Activity} defaultOpen={false}>
              <div className="space-y-6">
                <ScoreDisplay score={score} />
                <LevelProgress
                  consecutiveCorrect={consecutiveCorrect}
                  advanceThreshold={advanceThreshold}
                />
                {performanceData.length > 0 && (
                  <PerformanceGraph performanceData={performanceData} />
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Side Panel for Settings */}
      <SidePanel isVisible={isPanelVisible} onVisibilityChange={setIsPanelVisible}>
        <div className="space-y-8">
          <AnimatedSection title="Training Settings" icon={Settings} defaultOpen={true}>
            <div className="space-y-6">
              <PresetDropdown
                presets={presets}
                currentPreset={currentPreset}
                onPresetChange={onPresetChange}
              />
              <ControlPanel
                currentLevel={currentLevel}
                onLevelChange={onLevelChange}
                groupSize={groupSize}
                onGroupSizeChange={onGroupSizeChange}
                maxLevel={maxLevel}
                advanceThreshold={advanceThreshold}
                onAdvanceThresholdChange={onAdvanceThresholdChange}
                consecutiveCorrect={consecutiveCorrect}
              />
              <AvailableChars
                availableChars={availableChars}
                consecutiveCorrect={consecutiveCorrect}
                advanceThreshold={advanceThreshold}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection title="Audio Settings" icon={Music} defaultOpen={false}>
            <div className="space-y-6">
              <AudioControls
                frequency={frequency}
                onFrequencyChange={onFrequencyChange}
                wpm={wpm}
                onWpmChange={onWpmChange}
                farnsworthSpacing={farnsworthSpacing}
                onFarnsworthChange={onFarnsworthChange}
              />
              <QualityControls
                qsbAmount={qsbAmount}
                onQsbChange={onQsbChange}
                qrmAmount={qrmAmount}
                onQrmChange={onQrmChange}
              />
            </div>
          </AnimatedSection>
        </div>
      </SidePanel>
    </div>
  );
};

export default MorseUI;