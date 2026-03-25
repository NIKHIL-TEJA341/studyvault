import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Calculator, Beaker, Code, Globe, Music } from 'lucide-react';
import { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';

interface AddSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddSubjectModal = ({ isOpen, onClose }: AddSubjectModalProps) => {
    const { addSubject } = useMaterials();
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('BookOpen');
    const [selectedColor, setSelectedColor] = useState('bg-blue-500');

    const icons = [
        { name: 'BookOpen', icon: BookOpen, label: 'General' },
        { name: 'Calculator', icon: Calculator, label: 'Math' },
        { name: 'Beaker', icon: Beaker, label: 'Science' },
        { name: 'Code', icon: Code, label: 'Coding' },
        { name: 'Globe', icon: Globe, label: 'Language' },
        { name: 'Music', icon: Music, label: 'Arts' },
    ];

    const colors = [
        { bg: 'bg-blue-500', text: 'text-blue-500' },
        { bg: 'bg-purple-500', text: 'text-purple-500' },
        { bg: 'bg-emerald-500', text: 'text-emerald-500' },
        { bg: 'bg-orange-500', text: 'text-orange-500' },
        { bg: 'bg-pink-500', text: 'text-pink-500' },
        { bg: 'bg-cyan-500', text: 'text-cyan-500' },
    ];

    const handleSubmit = async () => {
        if (!title || !code) return;

        const colorObj = colors.find(c => c.bg === selectedColor) || colors[0];

        await addSubject({
            title,
            code,
            iconName: selectedIcon,
            color: selectedColor,
            textColor: colorObj.text
        });

        // Reset and close
        setTitle('');
        setCode('');
        setSelectedIcon('BookOpen');
        setSelectedColor('bg-blue-500');
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
                        className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-surface border border-white/10 rounded-2xl shadow-2xl z-[70] overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold">Add New Subject</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Subject Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Biology"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Subject Code</label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="e.g., BIO101"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Icon</label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {icons.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => setSelectedIcon(item.name)}
                                                className={`p-3 rounded-xl border flex items-center justify-center transition-all ${selectedIcon === item.name ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-white/5 hover:bg-white/5 text-gray-400'}`}
                                                title={item.label}
                                            >
                                                <item.icon className="w-6 h-6" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Color</label>
                                    <div className="flex gap-3">
                                        {colors.map((c) => (
                                            <button
                                                key={c.bg}
                                                onClick={() => setSelectedColor(c.bg)}
                                                className={`w-8 h-8 rounded-full ${c.bg} transition-all ${selectedColor === c.bg ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all"
                                >
                                    Create Subject
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddSubjectModal;
