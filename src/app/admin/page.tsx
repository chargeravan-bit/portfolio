'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Plus, Edit2, Trash2, FolderGit2, Settings, LogOut, Search, X } from 'lucide-react';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

// Mock projects matching our portfolio
const initialProjects = [
  { id: 1, title: 'Cinematic Portfolio', category: 'Web Experience', year: '2024', status: 'Published' },
  { id: 2, title: 'AI SaaS Dashboard', category: 'Full-Stack App', year: '2024', status: 'Published' },
  { id: 3, title: 'E-Commerce 3D Store', category: '3D Product Showcase', year: '2023', status: 'Published' },
  { id: 4, title: 'Social Media App', category: 'Mobile App', year: '2023', status: 'Draft' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [editingProject, setEditingProject] = useState<any>(null);
  const [currentTheme, setCurrentTheme] = useState('golden');

  const themes = [
    { id: 'golden', name: 'Golden Luxury', desc: 'Premium amber and gold gradients.', colors: 'bg-amber-500' },
    { id: 'midnight', name: 'Midnight Slate', desc: 'Deep blues and charcoal tones.', colors: 'bg-slate-700' },
    { id: 'neon', name: 'Cyber Neon', desc: 'Vibrant cyan and purple accents.', colors: 'bg-cyan-500' },
    { id: 'minimal', name: 'Clean Minimal', desc: 'Simple grayscale with high contrast.', colors: 'bg-white' },
  ];

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleEdit = (proj: any) => {
    setEditingProject(proj);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const year = formData.get('year') as string;
    const status = formData.get('status') as string;

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, title, category, year, status } : p));
    } else {
      setProjects([...projects, { id: Date.now(), title, category, year, status }]);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row select-none">
      <CustomCursor />
      
      {/* Sidebar - Responsive */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col glass z-10 relative">
        <div className="p-6 lg:p-8 border-b border-white/5 flex justify-between items-center lg:block">
          <div>
            <h2 className="text-xl font-bold gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
              Admin Panel
            </h2>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Workspace</p>
          </div>
          <button className="lg:hidden text-white/60 p-2">
            <Settings size={20} />
          </button>
        </div>
        
        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
              activeTab === 'projects' 
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <FolderGit2 size={18} />
            <span className="text-sm lg:text-base">Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <Settings size={18} />
            <span className="text-sm lg:text-base">Settings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/5 relative z-20 hidden lg:block">
          <button 
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium"
          >
            <LogOut size={16} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto min-h-screen">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 border-b border-white/5 pb-6 gap-4">
            <div>
              <p className="text-amber-500 text-sm tracking-widest uppercase mb-2">Overview</p>
              <h1 className="text-2xl lg:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {activeTab === 'projects' ? 'Manage Projects' : 'Workspace Settings'}
              </h1>
            </div>
            
            {activeTab === 'projects' && (
              <button 
                onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] w-full sm:w-auto justify-center"
              >
                <Plus size={18} />
                New Project
              </button>
            )}
          </header>

          {activeTab === 'projects' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Filters/Search */}
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1 glass rounded-xl border border-white/10 flex items-center px-4 py-3 focus-within:border-amber-500/30 transition-all">
                  <Search size={18} className="text-white/40 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/30"
                  />
                </div>
              </div>

              {/* Projects List - Responsive Table/Cards */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30 bg-white/[0.02]">
                        <th className="p-5 font-bold">Project Name</th>
                        <th className="p-5 font-bold hidden md:table-cell">Category</th>
                        <th className="p-5 font-bold hidden sm:table-cell">Year</th>
                        <th className="p-5 font-bold">Status</th>
                        <th className="p-5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {projects.map(proj => (
                        <tr key={proj.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="p-5">
                            <div className="font-medium text-white/90">{proj.title}</div>
                            <div className="md:hidden text-xs text-white/40 mt-1">{proj.category}</div>
                          </td>
                          <td className="p-5 text-white/60 hidden md:table-cell">{proj.category}</td>
                          <td className="p-5 text-white/60 hidden sm:table-cell">{proj.year}</td>
                          <td className="p-5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                              proj.status === 'Published' 
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
                                : 'border-white/20 text-white/40 bg-white/5'
                            }`}>
                              {proj.status}
                            </span>
                          </td>
                          <td className="p-5 flex justify-end gap-2 sm:gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(proj)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/5"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(proj.id)}
                              className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors border border-red-500/10"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {projects.length === 0 && (
                  <div className="p-16 text-center">
                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderGit2 size={24} className="text-white/20" />
                    </div>
                    <p className="text-white/40 font-medium">No projects found.</p>
                    <button className="text-amber-500 text-sm mt-2 hover:underline">Add your first project</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass rounded-2xl p-6 lg:p-8 border border-white/5 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full" />
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Display Name</label>
                      <input type="text" defaultValue="Mohan Rathod" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Email Address</label>
                      <input type="email" defaultValue="mohanlaxmanrathod@outlook.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors text-sm" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full" />
                    Website Appearance
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {themes.map(theme => (
                      <button 
                        key={theme.id}
                        onClick={() => setCurrentTheme(theme.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
                          currentTheme === theme.id 
                            ? 'border-amber-500/50 bg-amber-500/5 ring-1 ring-amber-500/20' 
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.colors} opacity-50 flex items-center justify-center shadow-inner`}>
                            <div className="w-4 h-4 bg-black/20 rounded-full blur-[1px]" />
                          </div>
                          <div>
                            <div className={`font-medium text-sm ${currentTheme === theme.id ? 'text-amber-400' : 'text-white/80'}`}>{theme.name}</div>
                            <div className="text-[10px] text-white/40 mt-0.5 line-clamp-1">{theme.desc}</div>
                          </div>
                        </div>
                        {currentTheme === theme.id && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] text-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/5 bg-red-500/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest">Danger Zone</h4>
                  <p className="text-xs text-white/40 mt-1">Permanently delete all data and reset portfolio.</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all uppercase tracking-tighter">
                  Reset System
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form 
            onSubmit={handleSave}
            className="glass-strong border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Project details</p>
              </div>
              <button 
                type="button"
                onClick={() => { setIsModalOpen(false); setEditingProject(null); }}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Project Title</label>
                <input 
                  name="title"
                  type="text" 
                  required
                  defaultValue={editingProject?.title || ''}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors text-sm" 
                  placeholder="e.g. Minimalist Portfolio" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Category</label>
                <input 
                  name="category"
                  type="text" 
                  required
                  defaultValue={editingProject?.category || ''}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors text-sm" 
                  placeholder="e.g. Web Experience" 
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Year</label>
                  <input 
                    name="year"
                    type="text" 
                    required
                    defaultValue={editingProject?.year || '2024'}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors text-sm" 
                    placeholder="2024" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Status</label>
                  <div className="relative">
                    <select 
                      name="status"
                      defaultValue={editingProject?.status || 'Published'}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors appearance-none text-sm"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <Search size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 bg-white/[0.02]">
              <button 
                type="button"
                onClick={() => { setIsModalOpen(false); setEditingProject(null); }}
                className="order-2 sm:order-1 px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="order-1 sm:order-2 px-8 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                {editingProject ? 'Update Changes' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}
