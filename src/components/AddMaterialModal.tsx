import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link, FileText, Video as VideoIcon, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AddMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useMaterials } from '../context/MaterialContext';

const AddMaterialModal = ({ isOpen, onClose }: AddMaterialModalProps) => {
    const { addMaterial, subjects } = useMaterials();
    const location = useLocation();

    const [materialType, setMaterialType] = useState<'pdf' | 'video' | 'link' | 'image'>('pdf');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Auto-select subject if we are on a subject detail page
    useEffect(() => {
        if (isOpen) {
            // Check if pathname matches /app/subjects/:id
            const match = location.pathname.match(/\/app\/subjects\/([^/]+)/);
            if (match && match[1]) {
                const urlSubjectId = match[1];
                // Verify the subject exists in our list before selecting
                if (subjects.some(s => s.id === urlSubjectId || s._id === urlSubjectId)) {
                    setSubject(urlSubjectId);
                }
            }
        }
    }, [isOpen, location.pathname, subjects]);

    const isValid = title.trim() !== '' && subject !== '';

    const handleSubmit = async () => {
        if (!isValid) return;

        let finalLink = linkUrl;

        if ((materialType === 'pdf' || materialType === 'image') && selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                // We use native fetch here instead of the 'api' custom axios instance
                // to completely avoid the sticky 'application/json' default header breaking the multipart boundary.
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                
                // The /upload route does NOT use the protect middleware, so we don't need the Authorization header.
                // Omitting it avoids strict CORS preflight (OPTIONS) checks which might be failing.
                const fetchResponse = await fetch(`${apiUrl}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!fetchResponse.ok) {
                    const text = await fetchResponse.text();
                    throw new Error(`Status ${fetchResponse.status}: ${text}`);
                }

                const responseData = await fetchResponse.text();
                const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, '') : 'http://localhost:5000';
                finalLink = `${baseUrl}/uploads${responseData}`;
            } catch (error: any) {
                console.error('File upload failed:', error);
                alert(`File upload failed. Details: ${error.message}`);
                return;
            }
        } else if ((materialType === 'pdf' || materialType === 'image') && !selectedFile) {
            // Fallback if no file selected but 'pdf'/'image' type
            finalLink = materialType === 'pdf' ? '/sample.pdf' : '/sample.jpg';
        }


        addMaterial({
            title,
            type: materialType,
            subject,
            link: finalLink,
            date: new Date().toISOString().split('T')[0],
            size: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : undefined,
            duration: materialType === 'video' ? '15 min' : undefined,
            domain: materialType === 'link' ? new URL(linkUrl || 'https://example.com').hostname : undefined
        });

        // Reset and close
        setTitle('');
        setSubject('');
        setLinkUrl('');
        setSelectedFileName(null);
        setSelectedFile(null);
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
                            <h2 className="text-xl font-bold">Add New Material</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 dark:hover:bg-blue-500/10 rounded-full text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Material Type Selection */}
                            <div className="grid grid-cols-4 gap-3">
                                <button
                                    onClick={() => setMaterialType('pdf')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${materialType === 'pdf' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-white/5 hover:bg-white/5 dark:hover:bg-blue-500/5 dark:hover:border-blue-500/30 text-gray-400'}`}
                                >
                                    <FileText className="w-6 h-6" />
                                    <span className="text-sm font-medium">PDF</span>
                                </button>
                                <button
                                    onClick={() => setMaterialType('image')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${materialType === 'image' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-surface border-white/5 hover:bg-white/5 dark:hover:bg-purple-500/5 dark:hover:border-purple-500/30 text-gray-400'}`}
                                >
                                    <Upload className="w-6 h-6" />
                                    <span className="text-sm font-medium">Image</span>
                                </button>
                                <button
                                    onClick={() => setMaterialType('video')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${materialType === 'video' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-surface border-white/5 hover:bg-white/5 dark:hover:bg-blue-500/5 dark:hover:border-blue-500/30 text-gray-400'}`}
                                >
                                    <VideoIcon className="w-6 h-6" />
                                    <span className="text-sm font-medium">Video</span>
                                </button>
                                <button
                                    onClick={() => setMaterialType('link')}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${materialType === 'link' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-surface border-white/5 hover:bg-white/5 dark:hover:bg-emerald-500/5 dark:hover:border-emerald-500/30 text-gray-400'}`}
                                >
                                    <Link className="w-6 h-6" />
                                    <span className="text-sm font-medium">GPT Link</span>
                                </button>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Chapter 1 Notes"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300">Subject</label>
                                    <div className="relative">
                                        <select
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            disabled={subjects.length === 0}
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="" disabled>
                                                {subjects.length === 0 ? "No subjects created yet" : "Select a subject"}
                                            </option>
                                            {subjects.map(sub => (
                                                <option key={sub.id} value={sub.id}>{sub.title}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                    </div>
                                    {subjects.length === 0 && (
                                        <p className="text-xs text-red-400">
                                            You need to create a subject first in the "Subjects" tab.
                                        </p>
                                    )}
                                </div>

                                {(materialType === 'pdf' || materialType === 'image') ? (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-300">Upload File</label>
                                        <div
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                                    const file = e.dataTransfer.files[0];
                                                    setTitle(prev => prev || file.name.replace(/\.[^/.]+$/, ""));
                                                    setSelectedFileName(file.name);
                                                    setSelectedFile(file);
                                                }
                                            }}
                                            onClick={() => document.getElementById('file-upload')?.click()}
                                            className={`border-2 border-dashed ${selectedFileName ? 'border-primary bg-primary/5' : 'border-white/10 bg-background/50'} rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors cursor-pointer relative`}
                                        >
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                accept={materialType === 'pdf' ? ".pdf" : "image/*"}
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const file = e.target.files[0];
                                                        setTitle(prev => prev || file.name.replace(/\.[^/.]+$/, ""));
                                                        setSelectedFileName(file.name);
                                                        setSelectedFile(file);
                                                    }
                                                }}
                                            />
                                            {selectedFileName && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFileName(null);
                                                        setSelectedFile(null);
                                                    }}
                                                    className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
                                                >
                                                    <X className="w-4 h-4 text-gray-400" />
                                                </button>
                                            )}
                                            <div className={`p-3 rounded-full mb-3 ${selectedFileName ? 'bg-primary/20' : 'bg-white/5'}`}>
                                                {selectedFileName ?
                                                    (materialType === 'pdf' ? <FileText className="w-6 h-6 text-primary" /> : <Upload className="w-6 h-6 text-primary" />)
                                                    : <Upload className="w-6 h-6 text-gray-400" />
                                                }
                                            </div>
                                            <p className="text-sm font-medium">{selectedFileName || "Click to upload or drag and drop"}</p>
                                            <p className="text-xs text-text-secondary mt-1">
                                                {selectedFileName ? "Ready to add" : (materialType === 'pdf' ? "PDF up to 10MB" : "PNG, JPG, GIF up to 10MB")}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-300">{materialType === 'video' ? 'Video URL' : 'Link URL'}</label>
                                        <input
                                            type="url"
                                            value={linkUrl}
                                            onChange={(e) => setLinkUrl(e.target.value)}
                                            placeholder="https://"
                                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 dark:hover:bg-blue-500/10 transition-colors font-medium">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isValid}
                                    className={`
                                        flex-1 py-3 rounded-xl font-medium shadow-lg transition-all
                                        ${isValid
                                            ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20 cursor-pointer'
                                            : 'bg-white/5 text-gray-500 shadow-none cursor-not-allowed'
                                        }
                                    `}
                                >
                                    Add Material
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddMaterialModal;
