import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Contact = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  notes: string;
  dateCreation: string;
};

type ContactsStore = {
  contacts: Contact[];
  searchQuery: string;
  addContact: (contact: Omit<Contact, 'id' | 'dateCreation'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  setSearchQuery: (query: string) => void;
};

export const useContactsStore = create<ContactsStore>()(
  persist(
    (set) => ({
      contacts: [],
      searchQuery: '',
      addContact: (contact) =>
        set((state) => ({
          contacts: [
            ...state.contacts,
            {
              ...contact,
              id: crypto.randomUUID(),
              dateCreation: new Date().toISOString(),
            },
          ],
        })),
      updateContact: (id, updatedContact) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id ? { ...contact, ...updatedContact } : contact
          ),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'contacts-storage',
    }
  )
);