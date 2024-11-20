import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Opportunity } from '../store/pipeline';

type OpportunityFormProps = {
  onSubmit: (data: Omit<Opportunity, 'id' | 'dateCreation'>) => void;
  initialData?: Partial<Opportunity>;
  onCancel: () => void;
};

export default function OpportunityForm({
  onSubmit,
  initialData,
  onCancel,
}: OpportunityFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      titre: formData.get('titre') as string,
      montant: Number(formData.get('montant')),
      status: (formData.get('status') as Opportunity['status']) || 'nouveau',
      dateLimite: formData.get('dateLimite') as string,
      entreprise: formData.get('entreprise') as string,
      priorite: (formData.get('priorite') as Opportunity['priorite']) || 'moyenne',
      description: formData.get('description') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
            Titre de l'opportunité
          </label>
          <input
            type="text"
            name="titre"
            id="titre"
            required
            defaultValue={initialData?.titre}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="montant" className="block text-sm font-medium text-gray-700">
            Montant (€)
          </label>
          <input
            type="number"
            name="montant"
            id="montant"
            required
            min="0"
            step="1000"
            defaultValue={initialData?.montant}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="dateLimite" className="block text-sm font-medium text-gray-700">
            Date limite de décision
          </label>
          <input
            type="date"
            name="dateLimite"
            id="dateLimite"
            required
            defaultValue={initialData?.dateLimite || format(new Date(), 'yyyy-MM-dd')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700">
            Entreprise
          </label>
          <input
            type="text"
            name="entreprise"
            id="entreprise"
            required
            defaultValue={initialData?.entreprise}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="priorite" className="block text-sm font-medium text-gray-700">
            Priorité
          </label>
          <select
            name="priorite"
            id="priorite"
            defaultValue={initialData?.priorite || 'moyenne'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            defaultValue={initialData?.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}