import { useState, useCallback } from 'react';
import { ShieldCheck, KeyRound, AlertTriangle, Building2, User, Check, X as XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addActivity } from '../lib/activityLog';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { Toggle } from '../components/ui/Toggle';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { cn } from '../lib/utils';

const passwordRequirements = [
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
  { label: 'One symbol', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  { label: 'Minimum 8 characters', test: (p: string) => p.length >= 8 },
];

export function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', password: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  if (!user) return null;

  const allPasswordRulesMet = passwordRequirements.every(r => r.test(passwordData.password));
  const passwordsMatch = passwordData.password === passwordData.confirm && passwordData.confirm.length > 0;

  const handleToggle2FA = (enabled: boolean) => {
    updateProfile({ twoFactorEnabled: enabled });
    addActivity('settings_changed', `Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
    setToastMessage(`2FA ${enabled ? 'enabled' : 'disabled'} successfully`);
    setShowToast(true);
  };

  const handleAccountTypeSwitch = () => {
    const newType = user.accountType === 'personal' ? 'business' : 'personal';
    updateProfile({ accountType: newType });
    addActivity('settings_changed', `Switched to ${newType} account`);
    setToastMessage(`Switched to ${newType} account`);
    setShowToast(true);
  };

  const handlePasswordChange = () => {
    const errors: Record<string, string> = {};
    if (!passwordData.current) errors.current = 'Current password is required';
    if (!allPasswordRulesMet) errors.password = 'Password does not meet requirements';
    if (!passwordsMatch) errors.confirm = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    addActivity('password_changed', 'Password changed successfully');
    setPasswordData({ current: '', password: '', confirm: '' });
    setShowPasswordSection(false);
    setToastMessage('Password changed successfully');
    setShowToast(true);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    logout();
  };

  return (
    <div className="space-y-6">
      {/* Account Type */}
      <DashboardCard title="Account Type" icon={user.accountType === 'personal' ? User : Building2} delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-900 dark:text-white font-medium capitalize">
              {user.accountType} Account
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Switch between personal and business account types
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowAccountTypeModal(true)}>
            Switch to {user.accountType === 'personal' ? 'Business' : 'Personal'}
          </Button>
        </div>
      </DashboardCard>

      {/* Security */}
      <DashboardCard title="Security" icon={ShieldCheck} delay={0.1}>
        <div className="space-y-5">
          {/* 2FA Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Add an extra layer of security to your account
              </p>
            </div>
            <Toggle
              enabled={user.twoFactorEnabled}
              onChange={handleToggle2FA}
              label="Toggle 2FA"
            />
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Change Password */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">Change Password</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Update your password regularly for security
                </p>
              </div>
              {!showPasswordSection && (
                <Button variant="outline" onClick={() => setShowPasswordSection(true)}>
                  <KeyRound className="w-4 h-4 mr-2" />
                  Change
                </Button>
              )}
            </div>

            {showPasswordSection && (
              <div className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => {
                    setPasswordData(prev => ({ ...prev, current: e.target.value }));
                    setPasswordErrors(prev => { const { current: _, ...rest } = prev; return rest; });
                  }}
                  error={passwordErrors.current}
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.password}
                  onChange={(e) => {
                    setPasswordData(prev => ({ ...prev, password: e.target.value }));
                    setPasswordErrors(prev => { const { password: _, ...rest } = prev; return rest; });
                  }}
                  error={passwordErrors.password}
                />

                {/* Password Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  {passwordRequirements.map((req) => {
                    const met = req.test(passwordData.password);
                    return (
                      <div key={req.label} className="flex items-center gap-2">
                        {met ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <XIcon className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span className={cn(
                          'text-xs',
                          met ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                        )}>{req.label}</span>
                      </div>
                    );
                  })}
                </div>

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirm}
                  disabled={!allPasswordRulesMet}
                  onChange={(e) => {
                    setPasswordData(prev => ({ ...prev, confirm: e.target.value }));
                    setPasswordErrors(prev => { const { confirm: _, ...rest } = prev; return rest; });
                  }}
                  error={passwordErrors.confirm}
                />
                {passwordData.confirm.length > 0 && (
                  <p className={cn(
                    'text-xs flex items-center gap-1',
                    passwordsMatch ? 'text-green-600 dark:text-green-400' : 'text-red-500'
                  )}>
                    {passwordsMatch ? <Check className="w-3 h-3" /> : <XIcon className="w-3 h-3" />}
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="primary" onClick={handlePasswordChange} disabled={!allPasswordRulesMet || !passwordsMatch}>
                    Update Password
                  </Button>
                  <Button variant="ghost" onClick={() => {
                    setShowPasswordSection(false);
                    setPasswordData({ current: '', password: '', confirm: '' });
                    setPasswordErrors({});
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>

      {/* Danger Zone */}
      <DashboardCard delay={0.2} className="border-red-200 dark:border-red-900/50">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-900 dark:text-white font-medium">Delete Account</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Permanently delete your account and all data
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(true)}
            className="border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete Account
          </Button>
        </div>
      </DashboardCard>

      {/* Modals */}
      <Modal
        isOpen={showAccountTypeModal}
        onClose={() => setShowAccountTypeModal(false)}
        onConfirm={handleAccountTypeSwitch}
        title="Switch Account Type"
        message={`Are you sure you want to switch to a ${user.accountType === 'personal' ? 'business' : 'personal'} account?`}
        confirmLabel="Switch"
      />
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="This action cannot be undone. All your data will be permanently deleted."
        confirmLabel="Delete Forever"
        variant="danger"
      />

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onDismiss={useCallback(() => setShowToast(false), [])}
      />
    </div>
  );
}
