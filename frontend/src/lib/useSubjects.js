import { useQuery } from '@tanstack/react-query';
import { subjectAPI } from './api';

// Custom hook for fetching all subjects with caching
export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const response = await subjectAPI.getAll();
      return response.data.subjects || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Custom hook for fetching a single subject by ID with caching
export const useSubject = (id) => {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: async () => {
      const response = await subjectAPI.getById(id);
      return response.data.subject;
    },
    enabled: !!id, // Only run if ID exists
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
};

// Custom hook for fetching question papers for a subject
export const useSubjectPapers = (subjectId) => {
  return useQuery({
    queryKey: ['subject-papers', subjectId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/questionpapers/subject/${subjectId}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch papers');
      const data = await response.json();
      return data.questionPapers || [];
    },
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000, // 5 minutes (papers change more frequently)
    cacheTime: 10 * 60 * 1000,
  });
};
