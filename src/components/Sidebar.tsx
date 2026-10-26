import React from 'react';
import { 
  FlaskConical, 
  Home, 
  BookOpen, 
  Wrench, 
  X
} from 'lucide-react';
import { StudentProfile } from '../types/lab';

export type NavTab = 'home' | 'catalogue' | 'modules' | 'tools';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  onSelectTab, 
  profile,
  isOpen,
  onClose 
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'catalogue', label: 'Experiments', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'modules', label: 'Modules', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Backdrop: Clicking closes the drawer */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer" 
        aria-label="Close menu backdrop"
      />

      {/* Slide Drawer Content */}
      <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideRight select-none">
        <div>
          {/* Drawer Top Header with Branding and Close Button */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-600 transition-colors shrink-0">
                <FlaskConical className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-sm text-slate-900 tracking-tight block truncate group-hover:text-blue-600 transition-colors">
                  Data Science
                </span>
                <span className="text-[11px] text-slate-500 font-medium block truncate">
                  Subject Digital Library
                </span>
              </div>
            </div>

            {/* Explicit Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Sidebar"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links (No Platform Menu text) */}
          <div className="p-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs border-l-4 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'} transition-colors`}>
                        {item.icon}
                      </span>
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Student Profile Info Card */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ring-1 ring-slate-300">
                <img 
                  src={profile.avatarUrl || '/profile.jpg'} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                  {profile.name}
                </span>
                <span className="text-[10px] text-blue-700 font-mono font-medium block truncate leading-tight">
                  {profile.rollNo}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="truncate">{profile.classSection || 'Section 1'}</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
