import { motion } from 'framer-motion';
import { BookOpen, Calculator, Beaker, Code, Globe, Music, Trash2, Edit2, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMaterials } from '../context/MaterialContext';
import { useState } from 'react';
import AddSubjectModal from '../components/AddSubjectModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EditMaterialModal from '../components/EditMaterialModal';

const Subjects = () => {
    const { subjects, deleteSubject, updateSubject, getMaterialsBySubject } = useMaterials();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string, title: string }>({ isOpen: false, id: '', title: '' });
    const [editModal, setEditModal] = useState<{ isOpen: boolean, id: string, title: string }>({ isOpen: false, id: '', title: '' });

    const getIcon = (iconName: string) => {
        const icons: Record<string, any> = { Calculator, Beaker, Code, BookOpen, Globe, Music };
        return icons[iconName] || BookOpen;
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Your Subjects</h1>
                    <p className="text-text-secondary mt-1">Manage learning materials by subject.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Subject</span>
                </button>
            </div>

            {subjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => {
                        const MaterialIcon = getIcon(subject.iconName);
                        // Handle potential undefined subject.id if using _id consistently
                        const subjectId = subject.id || subject._id;
                        const materialCount = getMaterialsBySubject(subjectId).length;
                        // Mock progress logic based on count for demo
                        const progress = Math.min(materialCount * 10, 100);

                        return (
                            <motion.div
                                key={subjectId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/app/subjects/${subjectId}`}
                                    className={`
                                        block bg-surface border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group shadow-sm dark:shadow-none
                                        transition-all hover:-translate-y-1 hover:shadow-xl hover:border-${subject.textColor.split('-')[1]}-500/50 dark:hover:border-blue-500/30
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 ${subject.color} bg-opacity-20 rounded-2xl flex items-center justify-center p-3`}>
                                            <MaterialIcon className={`w-full h-full ${subject.textColor}`} />
                                        </div>
                                        <div className="flex gap-1 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setEditModal({ isOpen: true, id: subjectId, title: subject.title });
                                                }}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Edit Subject"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setDeleteModal({ isOpen: true, id: subjectId, title: subject.title });
                                                }}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete Subject"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{subject.title}</h3>
                                        <p className="text-text-secondary text-sm">{subject.code} • {materialCount} Materials</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium text-text-secondary">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${subject.color} transition-all duration-1000 ease-out`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <span>View Materials</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl p-16 text-center shadow-sm dark:shadow-none">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">No Subjects Yet</h2>
                    <p className="text-text-secondary max-w-md mx-auto mb-8">
                        Create subjects to organize your study materials like PDFs, videos, and links.
                    </p>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Your First Subject</span>
                    </button>
                </div>
            )}

            <AddSubjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

            <EditMaterialModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal(prev => ({ ...prev, isOpen: false }))}
                currentTitle={editModal.title}
                onSave={async (newTitle) => {
                    await updateSubject(editModal.id, { title: newTitle });
                }}
            />

            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                title="Delete Subject"
                message={`Are you sure you want to delete "${deleteModal.title}" and all its contents? This cannot be undone.`}
                onConfirm={async () => {
                    await deleteSubject(deleteModal.id);
                }}
            />
        </div>
    );
};

export default Subjects;
