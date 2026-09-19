export interface ActivityEntry {
  id: string;
  type: 'account_created' | 'login' | 'profile_updated' | 'password_changed' | 'settings_changed' | 'theme_changed';
  description: string;
  timestamp: string; // ISO string
  device: string;
  browser: string;
}

const STORAGE_KEY = 'activity_log';

function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  if (/Mobile|Android/i.test(ua)) return 'Mobile';
  if (/Tablet|iPad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edg')) return 'Edge';
  return 'Unknown Browser';
}

export function addActivity(
  type: ActivityEntry['type'],
  description: string
): ActivityEntry {
  const entry: ActivityEntry = {
    id: crypto.randomUUID(),
    type,
    description,
    timestamp: new Date().toISOString(),
    device: getDeviceInfo(),
    browser: getBrowserInfo(),
  };
  const activities = getActivities();
  activities.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  return entry;
}

export function getActivities(): ActivityEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearActivities(): void {
  localStorage.removeItem(STORAGE_KEY);
}
