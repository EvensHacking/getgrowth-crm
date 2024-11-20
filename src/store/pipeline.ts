import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OpportunityStatus = 'nouveau' | 'negociation' | 'gagne' | 'perdu';

export type Opportunity = {
  id: string;
  titre: string;
  montant: number;
  status: OpportunityStatus;
  dateLimite: string;
  entreprise: string;
  priorite: 'basse' | 'moyenne' | 'haute';
  description?: string;
  dateCreation: string;
};

type PipelineStore = {
  opportunities: Opportunity[];
  addOpportunity: (opportunity: Omit<Opportunity, 'id' | 'dateCreation'>) => void;
  updateOpportunity: (id: string, opportunity: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  moveOpportunity: (id: string, status: OpportunityStatus) => void;
};

export const STATUSES: { id: OpportunityStatus; label: string }[] = [
  { id: 'nouveau', label: 'Nouveau prospect' },
  { id: 'negociation', label: 'En négociation' },
  { id: 'gagne', label: 'Fermé gagné' },
  { id: 'perdu', label: 'Fermé perdu' },
];

export const usePipelineStore = create<PipelineStore>()(
  persist(
    (set) => ({
      opportunities: [],
      addOpportunity: (opportunity) =>
        set((state) => ({
          opportunities: [
            ...state.opportunities,
            {
              ...opportunity,
              id: crypto.randomUUID(),
              dateCreation: new Date().toISOString(),
            },
          ],
        })),
      updateOpportunity: (id, updatedOpportunity) =>
        set((state) => ({
          opportunities: state.opportunities.map((opportunity) =>
            opportunity.id === id
              ? { ...opportunity, ...updatedOpportunity }
              : opportunity
          ),
        })),
      deleteOpportunity: (id) =>
        set((state) => ({
          opportunities: state.opportunities.filter(
            (opportunity) => opportunity.id !== id
          ),
        })),
      moveOpportunity: (id, status) =>
        set((state) => ({
          opportunities: state.opportunities.map((opportunity) =>
            opportunity.id === id ? { ...opportunity, status } : opportunity
          ),
        })),
    }),
    {
      name: 'pipeline-storage',
    }
  )
);