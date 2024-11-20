import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { usePipelineStore, STATUSES, type OpportunityStatus } from '../store/pipeline';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityForm from '../components/OpportunityForm';

export default function Pipeline() {
  const { opportunities, addOpportunity, deleteOpportunity, moveOpportunity } =
    usePipelineStore();
  const [showForm, setShowForm] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const status = over.id as OpportunityStatus;
      moveOpportunity(active.id as string, status);
    }

    setActiveId(null);
  };

  const activeOpportunity = activeId
    ? opportunities.find((opp) => opp.id === activeId)
    : null;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pipeline</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gérez vos opportunités commerciales
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Opportunité
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4">Nouvelle Opportunité</h2>
            <OpportunityForm
              onSubmit={(data) => {
                addOpportunity(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="mt-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {STATUSES.map((status) => (
              <div
                key={status.id}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <h2 className="font-medium text-gray-900 mb-4">{status.label}</h2>
                <SortableContext
                  items={opportunities
                    .filter((opp) => opp.status === status.id)
                    .map((opp) => opp.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {opportunities
                      .filter((opp) => opp.status === status.id)
                      .map((opportunity) => (
                        <OpportunityCard
                          key={opportunity.id}
                          opportunity={opportunity}
                          onDelete={deleteOpportunity}
                        />
                      ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeOpportunity && (
              <OpportunityCard
                opportunity={activeOpportunity}
                onDelete={deleteOpportunity}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}