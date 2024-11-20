import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { Opportunity } from '../store/pipeline';
import { cn } from '../lib/utils';

type OpportunityCardProps = {
  opportunity: Opportunity;
  onDelete: (id: string) => void;
};

const priorityClasses = {
  basse: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  moyenne: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  haute: 'bg-red-50 text-red-700 ring-red-600/20',
};

export default function OpportunityCard({
  opportunity,
  onDelete,
}: OpportunityCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-900">{opportunity.titre}</h3>
        <button
          onClick={() => onDelete(opportunity.id)}
          className="text-gray-400 hover:text-gray-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <p className="mt-1 text-sm text-gray-500">{opportunity.entreprise}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">
          {new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          }).format(opportunity.montant)}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
            priorityClasses[opportunity.priorite]
          )}
        >
          {opportunity.priorite.charAt(0).toUpperCase() + opportunity.priorite.slice(1)}
        </span>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Échéance: {format(new Date(opportunity.dateLimite), 'dd MMM yyyy', { locale: fr })}
      </div>
    </div>
  );
}