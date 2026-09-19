import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  LogIn,
  Pencil,
  KeyRound,
  Settings,
  Palette,
  Trash2,
  Monitor,
  Globe,
  Inbox,
} from 'lucide-react';
import { getActivities, clearActivities, type ActivityEntry } from '../lib/activityLog';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { cn } from '../lib/utils';

const activityConfig: Record<ActivityEntry['type'], { icon: typeof UserPlus; color: string; bgColor: string }> = {
  account_created: { icon: UserPlus, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  login: { icon: LogIn, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  profile_updated: { icon: Pencil, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  password_changed: { icon: KeyRound, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  settings_changed: { icon: Settings, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  theme_changed: { icon: Palette, color: 'text-pink-600 dark:text-pink-400', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
};

export function ActivityLogPage() {
  const [activities, setActivities] = useState(getActivities);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClear = () => {
    clearActivities();
    setActivities([]);
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      {activities.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowClearModal(true)}
            className="border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {/* Activity List */}
      {activities.length === 0 ? (
        <DashboardCard delay={0}>
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Activity Yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your activity log will appear here as you use the app.
            </p>
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard delay={0}>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className={cn('p-2 rounded-xl shrink-0', config.bgColor)}>
                    <Icon className={cn('w-4 h-4', config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {new Date(activity.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5" />
                      {activity.device}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      {activity.browser}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DashboardCard>
      )}

      {/* Modals */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClear}
        title="Clear Activity Log"
        message="Are you sure you want to clear your entire activity log? This action cannot be undone."
        confirmLabel="Clear All"
        variant="danger"
      />

      <Toast
        message="Activity log cleared"
        type="success"
        isVisible={showToast}
        onDismiss={useCallback(() => setShowToast(false), [])}
      />
    </div>
  );
}
