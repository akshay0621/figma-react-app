import { useNavigate } from 'react-router-dom';
import { User, Phone, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getActivities } from '../lib/activityLog';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { StatCard } from '../components/dashboard/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

export function OverviewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const activities = getActivities().slice(0, 5);

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <DashboardCard className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-700 dark:from-blue-700 dark:to-blue-900 dark:border-blue-800" delay={0}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar src={user.avatar} firstName={user.firstName} lastName={user.lastName} size="lg" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              Welcome, {user.firstName}! 👋
            </h2>
            <p className="text-blue-100 mt-1">
              Your {user.accountType} account is all set up and ready to go.
            </p>
          </div>
        </div>
      </DashboardCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={User}
          label="Account Type"
          value={user.accountType === 'personal' ? 'Personal' : 'Business'}
          color="blue"
          delay={0.1}
        />
        <StatCard
          icon={Phone}
          label="Phone Number"
          value={`${user.countryCode} ${user.phone}`}
          color="green"
          delay={0.15}
        />
        <StatCard
          icon={Calendar}
          label="Member Since"
          value={memberSince}
          color="purple"
          delay={0.2}
        />
        <StatCard
          icon={ShieldCheck}
          label="Security"
          value={user.twoFactorEnabled ? '2FA Enabled' : 'Standard'}
          color="amber"
          delay={0.25}
        />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" delay={0.3}>
          <div className="space-y-2">
            {[
              { label: 'Edit Profile', path: '/dashboard/profile' },
              { label: 'Change Password', path: '/dashboard/settings' },
              { label: 'Account Settings', path: '/dashboard/settings' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <span>{action.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </button>
            ))}
          </div>
        </DashboardCard>

        {/* Recent Activity */}
        <DashboardCard title="Recent Activity" delay={0.35}>
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
              No recent activity
            </p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/activity')}
            className="w-full mt-4 text-blue-600 dark:text-blue-400"
          >
            View All Activity
          </Button>
        </DashboardCard>
      </div>
    </div>
  );
}
