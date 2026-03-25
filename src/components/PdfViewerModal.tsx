import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PdfViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
}

const PdfViewerModal = ({ isOpen, onClose, pdfUrl, title }: PdfViewerModalProps) => {
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
                        className="fixed inset-0 m-auto w-[90vw] h-[90vh] bg-surface border border-white/10 rounded-2xl shadow-2xl z-[70] flex flex-col overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-background">
                            <h2 className="text-xl font-bold truncate pr-4">{title}</h2>
                            <button 
                                onClick={onClose} 
                                className="p-2 hover:bg-white/5 dark:hover:bg-blue-500/10 rounded-full text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                            {/* We use an iframe or object to display the PDF. Object is generally better for PDFs as it provides natural browser controls */}
                            <object
                                data={pdfUrl}
                                type="application/pdf"
                                className="w-full h-full"
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-surface">
                                    <p className="text-text-secondary mb-4">
                                        Your browser does not support embedded PDF files.
                                    </p>
                                    <a 
                                        href={pdfUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl transition-colors"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            </object>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PdfViewerModal;
