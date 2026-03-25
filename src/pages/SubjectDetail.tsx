import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calculator, Beaker, Search, Filter, FileText, PlayCircle, Download, ExternalLink, Code, Globe, Music, Trash2, Edit2, Bot, Play, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { useMaterials } from '../context/MaterialContext';
import EditMaterialModal from '../components/EditMaterialModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import PdfViewerModal from '../components/PdfViewerModal';

const SubjectDetail = () => {
    const { id } = useParams();
    const { getMaterialsBySubject, getSubject, deleteMaterial, updateMaterial } = useMaterials();
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [editModal, setEditModal] = useState<{ isOpen: boolean, id: string, title: string }>({ isOpen: false, id: '', title: '' });
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string, title: string }>({ isOpen: false, id: '', title: '' });
    const [pdfModal, setPdfModal] = useState<{ isOpen: boolean, url: string, title: string }>({ isOpen: false, url: '', title: '' });

    const subject = getSubject(id || '');

    // Fallback if subject not found
    const subjectData = subject ? {
        ...subject,
        icon: (() => {
            const icons: Record<string, any> = { Calculator, Beaker, Code, BookOpen, Globe, Music };
            return icons[subject.iconName] || BookOpen;
        })()
    } : {
        title: 'Subject Not Found',
        code: 'N/A',
        color: 'bg-gray-500',
        textColor: 'text-gray-500',
        icon: BookOpen
    };

    const materials = getMaterialsBySubject(id || '');

    const filteredMaterials = materials.filter(m => {
        const matchesTab = activeTab === 'all' || m.type === activeTab;
        const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const tabs = [
        { id: 'all', label: 'All Materials' },
        { id: 'pdf', label: 'PDFs' },
        { id: 'image', label: 'Images' },
        { id: 'video', label: 'Video Links' },
        { id: 'link', label: 'GPT Links' },
    ];

    const getMaterialIcon = (type: string) => {
        switch (type) {
            case 'pdf': return FileText;
            case 'video': return PlayCircle;
            case 'link': return Bot;
            case 'image': return ImageIcon;
            default: return FileText;
        }
    };

    const getMaterialColor = (type: string) => {
        switch (type) {
            case 'pdf': return 'text-red-400';
            case 'video': return 'text-blue-400';
            case 'link': return 'text-emerald-400';
            case 'image': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/app/subjects" className="p-2 hover:bg-gray-100 dark:hover:bg-blue-500/10 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-text-secondary" />
                </Link>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${subjectData.color} bg-opacity-20`}>
                        <subjectData.icon className={`w-6 h-6 ${subjectData.textColor}`} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{subjectData.title}</h1>
                        <p className="text-xs text-text-secondary font-medium tracking-wider">{subjectData.code}</p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border
                                ${activeTab === tab.id
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                    : 'bg-surface border-white/5 text-text-secondary hover:bg-white/5 dark:hover:bg-blue-500/10 dark:hover:text-blue-400'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search materials..."
                            className="w-full bg-surface border border-gray-200 dark:border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    <button className="p-2 bg-surface border border-gray-200 dark:border-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-500/10 text-text-secondary dark:hover:text-blue-400 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Materials List */}
            <div className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden min-h-[400px] shadow-sm dark:shadow-none">
                {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material, index) => {
                        const Icon = getMaterialIcon(material.type);
                        const iconColor = getMaterialColor(material.type);
                        const displayId = (material.id || material._id).toString();

                        return (
                            <motion.div
                                key={displayId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] group transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-gray-200 dark:border-white/5">
                                    <Icon className={`w-5 h-5 ${iconColor}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium truncate group-hover:text-primary transition-colors">{material.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                                        <span className="capitalize">{material.type}</span>
                                        <span>•</span>
                                        <span>{material.date}</span>
                                        <span>•</span>
                                        <span>{material.size || material.duration || material.domain}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (material.type === 'pdf') {
                                                setPdfModal({ isOpen: true, url: material.link, title: material.title });
                                            } else {
                                                window.open(material.link, '_blank');
                                            }
                                        }}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-blue-400 transition-colors"
                                        title={material.type === 'link' ? "Open Link" : "Download/View"}
                                    >
                                        {material.type === 'link' ? <ExternalLink className="w-4 h-4" /> :
                                            material.type === 'video' ? <Play className="w-4 h-4" /> :
                                                material.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditModal({ isOpen: true, id: displayId, title: material.title });
                                        }}
                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        title="Rename"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteModal({ isOpen: true, id: displayId, title: material.title });
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-text-secondary">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 opacity-50" />
                        </div>
                        <p>No materials found for this filter.</p>
                    </div>
                )}
            </div>

            <EditMaterialModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal(prev => ({ ...prev, isOpen: false }))}
                currentTitle={editModal.title}
                onSave={async (newTitle) => {
                    await updateMaterial(editModal.id, { title: newTitle });
                }}
            />

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                title="Delete Material"
                message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
                onConfirm={async () => {
                    await deleteMaterial(deleteModal.id);
                }}
            />

            <PdfViewerModal
                isOpen={pdfModal.isOpen}
                onClose={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                pdfUrl={pdfModal.url}
                title={pdfModal.title}
            />
        </div>
    );
};

export default SubjectDetail;
