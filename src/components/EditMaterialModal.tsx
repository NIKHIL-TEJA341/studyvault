import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTitle: string;
    onSave: (newTitle: string) => Promise<void>;
}

const EditMaterialModal = ({ isOpen, onClose, currentTitle, onSave }: EditMaterialModalProps) => {
    const [title, setTitle] = useState(currentTitle);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle]);

    const handleSubmit = async () => {
        if (!title || title.trim() === '') return;

        setIsSaving(true);
        await onSave(title);
        setIsSaving(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit bg-surface border border-white/10 rounded-2xl shadow-2xl z-[70] overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Edit2 className="w-5 h-5 text-primary" />
                                Rename Material
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSaving}
                                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditMaterialModal;
