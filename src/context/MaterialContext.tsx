import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { useUser } from './UserContext';

export interface Subject {
    _id: string; // Changed from id to _id for MongoDB
    id?: string; // Keep for compatibility if needed, but rely on _id
    title: string;
    code: string;
    iconName: string;
    color: string;
    textColor: string;
}

export interface Material {
    _id: string; // Changed from id to _id
    id?: number | string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'image';
    subject: string; // This will now be the MongoDB _id of the subject, or we populate it
    date: string;
    size?: string;
    duration?: string;
    domain?: string;
    link: string;
}

interface MaterialContextType {
    materials: Material[];
    subjects: Subject[];
    isLoading: boolean;
    addMaterial: (material: any) => Promise<void>;
    addSubject: (subject: any) => Promise<void>;
    deleteMaterial: (id: string) => Promise<void>;
    deleteSubject: (id: string) => Promise<void>;
    updateMaterial: (id: string, updates: Partial<Material>) => Promise<void>;
    updateSubject: (id: string, updates: Partial<Subject>) => Promise<void>;
    getMaterialsBySubject: (subjectId: string) => Material[];
    getSubject: (subjectId: string) => Subject | undefined;
}

const MaterialContext = createContext<MaterialContextType | undefined>(undefined);

export const useMaterials = () => {
    const context = useContext(MaterialContext);
    if (!context) {
        throw new Error('useMaterials must be used within a MaterialProvider');
    }
    return context;
};

export const MaterialProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const [materials, setMaterials] = useState<Material[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data when user logs in
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const [subjectsRes, materialsRes] = await Promise.all([
                        api.get('/subjects'),
                        api.get('/materials')
                    ]);
                    // Map _id to id for frontend compatibility if needed, 
                    // or just update components to use _id. 
                    // For now, let's keep _id and map it to id where strict typing demands it, 
                    // but preferably specific components should start using _id.

                    const formattedSubjects = subjectsRes.data.map((s: any) => ({ ...s, id: s._id }));
                    const formattedMaterials = materialsRes.data.map((m: any) => ({ ...m, id: m._id }));

                    setSubjects(formattedSubjects);
                    setMaterials(formattedMaterials);
                } catch (error) {
                    console.error("Failed to fetch data", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        } else {
            setSubjects([]);
            setMaterials([]);
        }
    }, [user]);

    const addMaterial = async (newMaterial: any) => {
        try {
            const { data } = await api.post('/materials', newMaterial);
            const material = { ...data, id: data._id };
            setMaterials(prev => [material, ...prev]);
        } catch (error) {
            console.error("Error adding material", error);
            throw error;
        }
    };

    const addSubject = async (newSubject: any) => {
        try {
            const { data } = await api.post('/subjects', newSubject);
            const subject = { ...data, id: data._id };
            setSubjects(prev => [...prev, subject]);
        } catch (error) {
            console.error("Error adding subject", error);
            throw error;
        }
    };

    const deleteMaterial = async (id: string) => {
        try {
            await api.delete(`/materials/${id}`);
            setMaterials(prev => prev.filter(m => m.id !== id && m._id !== id));
        } catch (error) {
            console.error("Error deleting material", error);
        }
    };

    const deleteSubject = async (id: string) => {
        try {
            await api.delete(`/subjects/${id}`);
            setSubjects(prev => prev.filter(s => s.id !== id && s._id !== id));
            // Also remove materials locally
            setMaterials(prev => prev.filter(m => m.subject !== id));
        } catch (error) {
            console.error("Error deleting subject", error);
        }
    };

    const updateSubject = async (id: string, updates: Partial<Subject>) => {
        try {
            const { data } = await api.put(`/subjects/${id}`, updates);
            const updated = { ...data, id: data._id };
            setSubjects(prev => prev.map(s => (s.id === id || s._id === id) ? updated : s));
        } catch (error) {
            console.error("Error updating subject", error);
        }
    };

    const updateMaterial = async (id: string, updates: Partial<Material>) => {
        try {
            const { data } = await api.put(`/materials/${id}`, updates);
            const updated = { ...data, id: data._id };
            setMaterials(prev => prev.map(m => (m.id === id || m._id === id) ? updated : m));
        } catch (error) {
            console.error("Error updating material", error);
        }
    };

    const getMaterialsBySubject = (subjectId: string) => {
        return materials.filter(m => m.subject === subjectId);
    };

    const getSubject = (subjectId: string) => {
        return subjects.find(s => s.id === subjectId || s._id === subjectId);
    };

    return (
        <MaterialContext.Provider value={{
            materials,
            subjects,
            isLoading,
            addMaterial,
            addSubject,
            deleteMaterial,
            deleteSubject,
            updateSubject,
            updateMaterial,
            getMaterialsBySubject,
            getSubject
        }}>
            {children}
        </MaterialContext.Provider>
    );
};
