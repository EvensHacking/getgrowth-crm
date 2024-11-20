import React from 'react';
import { Bell, Download, User } from 'lucide-react';
import { useSettingsStore } from '../store/settings';

export default function Settings() {
  const { notifications, export: exportSettings, preferences, 
          updateNotifications, updateExport, updatePreferences } = useSettingsStore();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
      <p className="mt-2 text-sm text-gray-700">
        Gérez vos préférences et configurations
      </p>

      <div className="mt-8 space-y-8">
        {/* Notifications */}
        <section className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                    Notifications par email
                  </label>
                  <p className="text-sm text-gray-500">
                    Recevez des mises à jour importantes par email
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={(e) => updateNotifications({ emailNotifications: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="opportunityReminders" className="font-medium text-gray-700">
                    Rappels d'opportunités
                  </label>
                  <p className="text-sm text-gray-500">
                    Soyez notifié des échéances importantes
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="opportunityReminders"
                  checked={notifications.opportunityReminders}
                  onChange={(e) => updateNotifications({ opportunityReminders: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="reminderDays" className="font-medium text-gray-700">
                    Jours avant rappel
                  </label>
                  <p className="text-sm text-gray-500">
                    Nombre de jours avant l'échéance
                  </p>
                </div>
                <select
                  id="reminderDays"
                  value={notifications.reminderDays}
                  onChange={(e) => updateNotifications({ reminderDays: Number(e.target.value) })}
                  className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={1}>1 jour</option>
                  <option value={3}>3 jours</option>
                  <option value={7}>7 jours</option>
                  <option value={14}>14 jours</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Export Settings */}
        <section className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <Download className="h-6 w-6 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Export de données</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="includeNotes" className="font-medium text-gray-700">
                    Inclure les notes
                  </label>
                  <p className="text-sm text-gray-500">
                    Ajouter les notes dans l'export
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="includeNotes"
                  checked={exportSettings.includeNotes}
                  onChange={(e) => updateExport({ includeNotes: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dateRange" className="font-medium text-gray-700">
                    Période d'export
                  </label>
                  <p className="text-sm text-gray-500">
                    Sélectionnez la période pour l'export
                  </p>
                </div>
                <select
                  id="dateRange"
                  value={exportSettings.dateRange}
                  onChange={(e) => updateExport({ dateRange: e.target.value as any })}
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="all">Tout</option>
                  <option value="30days">30 derniers jours</option>
                  <option value="90days">90 derniers jours</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* User Preferences */}
        <section className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Préférences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="language" className="font-medium text-gray-700">
                    Langue
                  </label>
                  <p className="text-sm text-gray-500">
                    Langue de l'interface
                  </p>
                </div>
                <select
                  id="language"
                  value={preferences.language}
                  onChange={(e) => updatePreferences({ language: e.target.value as any })}
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="currency" className="font-medium text-gray-700">
                    Devise
                  </label>
                  <p className="text-sm text-gray-500">
                    Devise par défaut
                  </p>
                </div>
                <select
                  id="currency"
                  value={preferences.currency}
                  onChange={(e) => updatePreferences({ currency: e.target.value as any })}
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dateFormat" className="font-medium text-gray-700">
                    Format de date
                  </label>
                  <p className="text-sm text-gray-500">
                    Format d'affichage des dates
                  </p>
                </div>
                <select
                  id="dateFormat"
                  value={preferences.dateFormat}
                  onChange={(e) => updatePreferences({ dateFormat: e.target.value as any })}
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="dd/MM/yyyy">31/12/2024</option>
                  <option value="MM/dd/yyyy">12/31/2024</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="theme" className="font-medium text-gray-700">
                    Thème
                  </label>
                  <p className="text-sm text-gray-500">
                    Apparence de l'application
                  </p>
                </div>
                <select
                  id="theme"
                  value={preferences.theme}
                  onChange={(e) => updatePreferences({ theme: e.target.value as any })}
                  className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}