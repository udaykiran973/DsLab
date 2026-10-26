import React, { useState, useEffect } from 'react';
import { 
  INITIAL_EXPERIMENTS, 
  INITIAL_MODULES, 
  INITIAL_TOOLS, 
  INITIAL_STUDENT_PROFILE 
} from './data/labData';
import { Experiment, StudentProfile } from './types/lab';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './components/DashboardView';
import { ExperimentsCatalogue } from './components/ExperimentsCatalogue';
import { ExperimentDetailView } from './components/ExperimentDetailView';
import { ModulesView } from './components/ModulesView';
import { ToolsView } from './components/ToolsView';

import { DEFAULT_LAB_VIDEO } from './data/experimentsData';

const STORAGE_KEY_EXPERIMENTS = 'ds_lab_experiments_v13';
const STORAGE_KEY_PROFILE = 'ds_lab_profile_v13';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [selectedModuleNumber, setSelectedModuleNumber] = useState<number | 'all'>('all');
  const [moduleNavTrigger, setModuleNavTrigger] = useState<number>(0);

  // Initialize from LocalStorage or defaults with video verification
  const [experiments, setExperiments] = useState<Experiment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXPERIMENTS);
      if (saved) {
        const parsed: Experiment[] = JSON.parse(saved);
        return parsed.map((p) => {
          const fallback = INITIAL_EXPERIMENTS.find((d) => d.id === p.id);
          const isBadUrl = !p.videoUrl || p.videoUrl.includes('commondatastorage.googleapis.com');
          return {
            ...p,
            videoUrl: isBadUrl ? (fallback?.videoUrl || DEFAULT_LAB_VIDEO) : p.videoUrl,
            videoThumbnail: p.videoThumbnail || fallback?.videoThumbnail,
            githubUrl: p.githubUrl || fallback?.githubUrl || `https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds${p.expNumber}`
          };
        });
      }
    } catch (e) {
      console.warn('Could not load saved experiments:', e);
    }
    return INITIAL_EXPERIMENTS;
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name?.includes('Pushpavathi') || parsed.rollNo === '22DS1087') {
          return INITIAL_STUDENT_PROFILE;
        }
        return { 
          ...INITIAL_STUDENT_PROFILE, 
          ...parsed,
          name: 'K. Uday Kiran',
          rollNo: '24102A030055',
          institution: 'Mohan Babu University',
          avatarUrl: parsed.avatarUrl && !parsed.avatarUrl.includes('unsplash.com') && !parsed.avatarUrl.includes('student_photo')
            ? parsed.avatarUrl 
            : '/profile.jpg',
          facultyMentor: parsed.facultyMentor || 'Mr. S. Bosubabu',
          facultyDesignation: 'Assistant Professor'
        };
      }
    } catch (e) {
      console.warn('Could not load saved profile:', e);
    }
    return INITIAL_STUDENT_PROFILE;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXPERIMENTS, JSON.stringify(experiments));
    } catch (e) {
      console.warn('Failed to save experiments to localStorage:', e);
    }
  }, [experiments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  // Handlers
  const handleSelectExperiment = (exp: Experiment) => {
    setSelectedExperiment(exp);
  };

  const handleBackToCatalogue = () => {
    setSelectedExperiment(null);
    setCurrentTab('catalogue');
  };

  const handleUpdateExperiment = (updatedExp: Experiment) => {
    setExperiments((prev) =>
      prev.map((e) => (e.id === updatedExp.id ? updatedExp : e))
    );
    if (selectedExperiment?.id === updatedExp.id) {
      setSelectedExperiment(updatedExp);
    }
  };

  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
  };

  const handleResetAllData = () => {
    if (confirm('Reset all lab experiments, sub-experiments, and profile to curriculum defaults?')) {
      setExperiments(INITIAL_EXPERIMENTS);
      setProfile(INITIAL_STUDENT_PROFILE);
      localStorage.removeItem(STORAGE_KEY_EXPERIMENTS);
      localStorage.removeItem(STORAGE_KEY_PROFILE);
      setSelectedExperiment(null);
    }
  };

  const handleNavSelect = (tab: NavTab) => {
    setCurrentTab(tab);
    if (tab !== 'catalogue') {
      setSelectedExperiment(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar with Expandable Search and Uniform-sized Page Icon Buttons */}
      <TopNavbar
        currentTab={currentTab}
        onSelectTab={handleNavSelect}
        onToggleMenu={() => setIsSidebarOpen((prev) => !prev)}
        profile={profile}
        experiments={experiments}
        onSelectExperiment={handleSelectExperiment}
        onSelectModule={(modNum) => {
          setSelectedModuleNumber(modNum);
          setModuleNavTrigger((prev) => prev + 1);
          setCurrentTab('modules');
          setSelectedExperiment(null);
        }}
      />

      {/* Slide-in Overlay Drawer (Opens only on button click, closed remaining all the time for full page fit) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onSelectTab={handleNavSelect}
        profile={profile}
      />

      {/* Main Content Area: Fits 100% full width cleanly */}
      <div className="flex-1 w-full flex flex-col min-h-screen">
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
          {selectedExperiment ? (
            <ExperimentDetailView
              experiment={selectedExperiment}
              onBack={handleBackToCatalogue}
              onUpdateExperiment={handleUpdateExperiment}
            />
          ) : (
            <>
              {currentTab === 'home' && (
                <DashboardView
                  profile={profile}
                  experiments={experiments}
                  modules={INITIAL_MODULES}
                  onNavigate={handleNavSelect}
                  onSelectModule={(modNum) => {
                    setSelectedModuleNumber(modNum);
                    setModuleNavTrigger((prev) => prev + 1);
                    setCurrentTab('modules');
                  }}
                  onSelectExperiment={handleSelectExperiment}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {currentTab === 'catalogue' && (
                <ExperimentsCatalogue
                  experiments={experiments}
                  onSelectExperiment={handleSelectExperiment}
                  onUpdateExperiment={handleUpdateExperiment}
                />
              )}

              {currentTab === 'modules' && (
                <ModulesView
                  modules={INITIAL_MODULES}
                  selectedModuleNumber={selectedModuleNumber}
                  moduleNavTrigger={moduleNavTrigger}
                  onNavigateToCatalogue={() => setCurrentTab('catalogue')}
                  onSelectExperiment={(expId) => {
                    const found = experiments.find((e) => e.id === expId);
                    if (found) {
                      setSelectedExperiment(found);
                    } else {
                      setCurrentTab('catalogue');
                    }
                  }}
                />
              )}

              {currentTab === 'tools' && (
                <ToolsView
                  tools={INITIAL_TOOLS}
                  onSelectExperimentTool={() => {
                    setCurrentTab('catalogue');
                  }}
                />
              )}
            </>
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Data Science Laboratory</span>
              <span>·</span>
              <span>Department of Computer Science & Engineering</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Academic Year 2025–2026</span>
              <span>·</span>
              <button
                onClick={handleResetAllData}
                className="text-slate-400 hover:text-slate-600 underline transition-colors cursor-pointer"
              >
                Reset to Syllabus Defaults
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
