'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Subject, 
  Task, 
  CalendarEvent, 
  Note, 
  AppNotification, 
  AppMode, 
  TaskStatus 
} from '../types';
import { 
  initialProfile, 
  initialSubjects, 
  initialTasks, 
  initialCalendarEvents, 
  initialNotes, 
  initialNotifications 
} from '../data/mockData';

interface NutriStoreContextType {
  // Estado general
  profile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Materias
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Tareas
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleChecklistItem: (taskId: string, itemId: string) => void;
  changeTaskStatus: (taskId: string, newStatus: TaskStatus) => void;

  // Calendario
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Apuntes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleFavoriteNote: (id: string) => void;

  // Notificaciones
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Reset demo
  resetToDefaultData: () => void;
}

const NutriStoreContext = createContext<NutriStoreContextType | undefined>(undefined);

export const NutriStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [appMode, setAppModeState] = useState<AppMode>('student');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  // Carga inicial desde localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('nutripanel_theme') as 'light' | 'dark';
      if (storedTheme) {
        setTheme(storedTheme);
        if (storedTheme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }

      const storedMode = localStorage.getItem('nutripanel_mode') as AppMode;
      if (storedMode) setAppModeState(storedMode);

      const storedTasks = localStorage.getItem('nutripanel_tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));

      const storedSubjects = localStorage.getItem('nutripanel_subjects');
      if (storedSubjects) setSubjects(JSON.parse(storedSubjects));

      const storedNotes = localStorage.getItem('nutripanel_notes');
      if (storedNotes) setNotes(JSON.parse(storedNotes));

      const storedEvents = localStorage.getItem('nutripanel_events');
      if (storedEvents) setEvents(JSON.parse(storedEvents));
    } catch (e) {
      console.warn('Error leyendo localStorage:', e);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nutripanel_tasks', JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('nutripanel_subjects', JSON.stringify(subjects));
    } catch {}
  }, [subjects]);

  useEffect(() => {
    try {
      localStorage.setItem('nutripanel_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('nutripanel_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('nutripanel_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setAppMode = (mode: AppMode) => {
    setAppModeState(mode);
    setProfile(prev => ({ ...prev, currentMode: mode }));
    localStorage.setItem('nutripanel_mode', mode);
  };

  // Acciones Materias
  const addSubject = (newSub: Omit<Subject, 'id'>) => {
    const created: Subject = {
      ...newSub,
      id: `sub-${Date.now()}`
    };
    setSubjects(prev => [created, ...prev]);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  // Acciones Tareas
  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const created: Task = {
      ...newTask,
      id: `tsk-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [created, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleChecklistItem = (taskId: string, itemId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updatedChecklist = t.checklist.map(ci => 
        ci.id === itemId ? { ...ci, completed: !ci.completed } : ci
      );
      return { ...t, checklist: updatedChecklist };
    }));
  };

  const changeTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  // Acciones Calendario
  const addEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const created: CalendarEvent = {
      ...newEvent,
      id: `ev-${Date.now()}`
    };
    setEvents(prev => [...prev, created]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Acciones Apuntes
  const addNote = (newNote: Omit<Note, 'id' | 'updatedAt'>) => {
    const created: Note = {
      ...newNote,
      id: `not-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    setNotes(prev => [created, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleFavoriteNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n));
  };

  // Notificaciones
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefaultData = () => {
    setProfile(initialProfile);
    setSubjects(initialSubjects);
    setTasks(initialTasks);
    setEvents(initialCalendarEvents);
    setNotes(initialNotes);
    setNotifications(initialNotifications);
    setAppModeState('student');
    localStorage.clear();
  };

  return (
    <NutriStoreContext.Provider value={{
      profile,
      activeTab,
      setActiveTab,
      appMode,
      setAppMode,
      theme,
      toggleTheme,
      isSearchOpen,
      setIsSearchOpen,
      subjects,
      addSubject,
      updateSubject,
      deleteSubject,
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleChecklistItem,
      changeTaskStatus,
      events,
      addEvent,
      deleteEvent,
      notes,
      addNote,
      updateNote,
      deleteNote,
      toggleFavoriteNote,
      notifications,
      markNotificationRead,
      clearAllNotifications,
      resetToDefaultData
    }}>
      {children}
    </NutriStoreContext.Provider>
  );
};

export const useNutriStore = () => {
  const context = useContext(NutriStoreContext);
  if (!context) {
    throw new Error('useNutriStore debe usarse dentro de un NutriStoreProvider');
  }
  return context;
};
