import React, { useState, useRef } from 'react';
import { Edit3, Check, X, Camera, Upload, Trash2, Building2, User, Award, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types/lab';

interface StudentIdCardProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: profile.name,
    rollNo: profile.rollNo,
    department: profile.department || 'Data Science',
    classSection: profile.classSection || 'Section 1',
    institution: profile.institution || 'Mohan Babu University',
    facultyMentor: profile.facultyMentor || 'Mr. S. Bosubabu',
    facultyDesignation: profile.facultyDesignation || 'Assistant Professor',
    avatarUrl: profile.avatarUrl || '/profile.jpg'
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      if (dataUri) {
        setFormData((prev) => ({ ...prev, avatarUrl: dataUri }));
        onUpdateProfile({
          ...profile,
          avatarUrl: dataUri
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: formData.name,
      rollNo: formData.rollNo,
      department: formData.department,
      classSection: formData.classSection,
      institution: formData.institution,
      facultyMentor: formData.facultyMentor,
      facultyDesignation: formData.facultyDesignation,
      avatarUrl: formData.avatarUrl
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* Hidden file input for direct photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Reference-Styled Student Profile & Faculty Card */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/70 text-white p-5 sm:p-6 shadow-xl w-full max-w-md transition-all hover:border-slate-600/80">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-300 font-sans">
              STUDENT PROFILE & FACULTY
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Upload your student photo directly"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/60 rounded-lg transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Student Details Row */}
        <div className="flex items-center gap-3.5 mb-3.5">
          {/* Avatar with Click-to-Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl ring-2 ring-slate-700 overflow-hidden bg-slate-800 shrink-0 shadow-md cursor-pointer"
            title="Click to upload your photo directly"
          >
            <img
              src={profile.avatarUrl || '/profile.jpg'}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[9px] font-semibold">
              <Camera className="w-4 h-4 mb-0.5" />
              <span>Upload</span>
            </div>
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug truncate">
              {profile.name}
            </h2>

            <div className="text-xs font-mono text-slate-300">
              Roll No: <span className="font-semibold text-white">{profile.rollNo}</span>
            </div>

            <div className="text-[11px] text-slate-400">
              {profile.department} • {profile.classSection || 'Section 1'}
            </div>

          </div>
        </div>

        {/* College Name Box */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 my-3 space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>COLLEGE NAME</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
            {profile.institution || 'Mohan Babu University'}
          </div>
        </div>

        {/* Faculty Grid (2 Columns) */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-2.5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>FACULTY NAME</span>
            </div>
            <div className="text-xs font-bold text-white truncate">
              {profile.facultyMentor || 'Mr. S. Bosubabu'}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-2.5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>DESIGNATION</span>
            </div>
            <div className="text-xs font-bold text-cyan-300 truncate">
              {profile.facultyDesignation || 'Assistant Professor'}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden text-slate-800">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Edit ID Card Details</h3>
                <p className="text-xs text-slate-300">Update student identity & faculty mentor info</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              {/* Photo Upload Section */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 text-white flex items-center justify-center font-bold text-lg shrink-0 ring-2 ring-slate-300">
                  <img src={formData.avatarUrl || '/profile.jpg'} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-bold text-slate-800 block">
                    Student Profile Photo
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Photo (24102A030055.jpg)</span>
                    </button>
                    {formData.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, avatarUrl: '' }))}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Uploads directly from your device without any AI changes.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Roll / Registration No.
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Section / Batch
                  </label>
                  <input
                    type="text"
                    value={formData.classSection}
                    onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Department & Specialization
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  College / Institution Name
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-900 tracking-wider block mb-2">
                  Faculty Mentor Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.facultyMentor}
                      onChange={(e) => setFormData({ ...formData, facultyMentor: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.facultyDesignation}
                      onChange={(e) => setFormData({ ...formData, facultyDesignation: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save ID Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
