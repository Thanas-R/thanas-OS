import { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2 } from 'lucide-react';
import { useMacOS } from '@/contexts/MacOSContext';

const TurtleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20" className="text-foreground">
    <path d="M32 10c-8 0-14 5-14 12 0 0-8 3-8 14s7 16 22 16 22-5 22-16-8-14-8-14c0-7-6-12-14-12z" fill="currentColor"/>
    <ellipse cx="32" cy="26" rx="16" ry="12" fill="currentColor" opacity="0.7"/>
    <circle cx="26" cy="24" r="2" fill="white"/>
    <circle cx="38" cy="24" r="2" fill="white"/>
    <path d="M28 30c0 2 2 3 4 3s4-1 4-3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const { focusedWindowId, apps, windows } = useMacOS();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const focusedWindow = windows.find(w => w.id === focusedWindowId);
  const focusedApp = focusedWindow ? apps.find(a => a.id === focusedWindow.appId) : null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 backdrop-blur-macos-heavy flex items-center justify-between px-4 z-50 text-sm"
      style={{
        background: 'hsl(var(--macos-menubar-bg))',
        borderBottom: '1px solid hsl(var(--macos-glass-border))',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <TurtleIcon />
        <span className="font-semibold">{focusedApp?.name || 'Thanas R'}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Battery className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <span className="font-medium">{formatTime(time)}</span>
      </div>
    </div>
  );
};
