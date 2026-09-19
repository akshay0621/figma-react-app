import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addActivity } from '../lib/activityLog';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  if (!user) return null;

  const handleEdit = () => {
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (editData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters';
    if (editData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
    if (editData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Phone number must be at least 10 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateProfile(editData);
    addActivity('profile_updated', `Updated profile: ${editData.firstName} ${editData.lastName}`);
    setIsEditing(false);
    setShowToast(true);
  };

  const handleAvatarChange = (base64: string) => {
    updateProfile({ avatar: base64 });
    addActivity('profile_updated', 'Updated profile picture');
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <DashboardCard delay={0}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar
            src={user.avatar}
            firstName={user.firstName}
            lastName={user.lastName}
            size="xl"
            editable
            onImageChange={handleAvatarChange}
          />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 capitalize mt-1">
              {user.accountType} Account
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={handleEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </DashboardCard>

      {/* Profile Details */}
      <DashboardCard title="Personal Information" delay={0.1}>
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={editData.firstName}
                onChange={(e) => {
                  setEditData(prev => ({ ...prev, firstName: e.target.value }));
                  setErrors(prev => { const { firstName: _, ...rest } = prev; return rest; });
                }}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                value={editData.lastName}
                onChange={(e) => {
                  setEditData(prev => ({ ...prev, lastName: e.target.value }));
                  setErrors(prev => { const { lastName: _, ...rest } = prev; return rest; });
                }}
                error={errors.lastName}
              />
            </div>
            <Input
              label="Phone Number"
              value={editData.phone}
              onChange={(e) => {
                setEditData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }));
                setErrors(prev => { const { phone: _, ...rest } = prev; return rest; });
              }}
              error={errors.phone}
            />
            <div className="flex gap-3 pt-2">
              <Button variant="primary" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="ghost" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {[
              { label: 'First Name', value: user.firstName },
              { label: 'Last Name', value: user.lastName },
              { label: 'Phone Number', value: `${user.countryCode} ${user.phone}` },
              { label: 'Account Type', value: user.accountType === 'personal' ? 'Personal' : 'Business' },
            ].map((field) => (
              <div key={field.label} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40">{field.label}</span>
                <span className="text-sm text-gray-900 dark:text-white font-medium mt-1 sm:mt-0">{field.value}</span>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>

      <Toast
        message="Profile updated successfully!"
        type="success"
        isVisible={showToast}
        onDismiss={useCallback(() => setShowToast(false), [])}
      />
    </div>
  );
}
