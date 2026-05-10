'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, FolderGit2, Settings, LogOut, Search, X } from 'lucide-react';

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

  const handleDelete = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex select-none">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col glass z-10 relative">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-xl font-bold gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
            Admin Panel
          </h2>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Workspace</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium transition-all">
            <FolderGit2 size={18} />
            Projects
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={18} />
            Settings
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/5 relative z-20">
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
      <main className="flex-1 relative overflow-y-auto">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto p-10">
          
          <header className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
            <div>
              <p className="text-amber-500 text-sm tracking-widest uppercase mb-2">Overview</p>
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Manage Projects</h1>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <Plus size={18} />
              New Project
            </button>
          </header>

          {/* Filters/Search */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1 glass rounded-xl border border-white/10 flex items-center px-4 py-3">
              <Search size={18} className="text-white/40 mr-3" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/30"
              />
            </div>
          </div>

          {/* Projects Table */}
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/40 bg-white/[0.02]">
                  <th className="p-5 font-normal">Project Name</th>
                  <th className="p-5 font-normal">Category</th>
                  <th className="p-5 font-normal">Year</th>
                  <th className="p-5 font-normal">Status</th>
                  <th className="p-5 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {projects.map(proj => (
                  <tr key={proj.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5 font-medium text-white/90">{proj.title}</td>
                    <td className="p-5 text-white/60">{proj.category}</td>
                    <td className="p-5 text-white/60">{proj.year}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs border ${
                        proj.status === 'Published' 
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' 
                          : 'border-white/20 text-white/60 bg-white/5'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="p-5 flex justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(proj.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-white/40">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Add New Project</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project Title</label>
                <input type="text" className="w-full glass border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors" placeholder="e.g. Minimalist Portfolio" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Category</label>
                <input type="text" className="w-full glass border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors" placeholder="e.g. Web Experience" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Year</label>
                  <input type="text" className="w-full glass border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors" placeholder="2024" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Status</label>
                  <select className="w-full glass border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 transition-colors appearance-none bg-black/50">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setProjects([...projects, { id: Date.now(), title: 'New Project', category: 'Category', year: '2024', status: 'Draft' }]);
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all text-sm font-medium shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
