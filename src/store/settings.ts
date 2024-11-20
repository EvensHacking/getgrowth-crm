import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationSettings = {
  emailNotifications: boolean;
  opportunityReminders: boolean;
  reminderDays: number;
  dailyDigest: boolean;
};

export type ExportSettings = {
  includeNotes: boolean;
  dateRange: 'all' | '30days' | '90days' | 'year';
};

export type UserPreferences = {
  language: 'fr' | 'en';
  currency: 'EUR' | 'USD';
  dateFormat: 'dd/MM/yyyy' | 'MM/dd/yyyy';
  theme: 'light' | 'dark' | 'system';
};

type SettingsStore = {
  notifications: NotificationSettings;
  export: ExportSettings;
  preferences: UserPreferences;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updateExport: (settings: Partial<ExportSettings>) => void;
  updatePreferences: (settings: Partial<UserPreferences>) => void;
};

const defaultSettings: SettingsStore = {
  notifications: {
    emailNotifications: true,
    opportunityReminders: true,
    reminderDays: 3,
    dailyDigest: false,
  },
  export: {
    includeNotes: true,
    dateRange: 'all',
  },
  preferences: {
    language: 'fr',
    currency: 'EUR',
    dateFormat: 'dd/MM/yyyy',
    theme: 'light',
  },
  updateNotifications: () => {},
  updateExport: () => {},
  updatePreferences: () => {},
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateNotifications: (newSettings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...newSettings },
        })),
      updateExport: (newSettings) =>
        set((state) => ({
          export: { ...state.export, ...newSettings },
        })),
      updatePreferences: (newSettings) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newSettings },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);