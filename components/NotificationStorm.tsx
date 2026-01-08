import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Notification {
  id: number;
  app: string;
  message: string;
  time: string;
  x: number; // percentage
  y: number; // percentage
  delay: number;
}

const NotificationStorm: React.FC<{ active: boolean }> = ({ active }) => {
  const [items, setItems] = useState<Notification[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const NOTIFICATIONS_DATA = [
      { app: "Messages", message: t('chaos.notifications.mom'), time: "now" },
      { app: "Slack", message: t('chaos.notifications.slack'), time: "2m ago" },
      { app: "Instagram", message: t('chaos.notifications.insta'), time: "5m ago" },
      { app: "Mail", message: t('chaos.notifications.mail'), time: "12m ago" },
      { app: "News", message: t('chaos.notifications.news'), time: "15m ago" },
      { app: "TikTok", message: t('chaos.notifications.tiktok'), time: "now" },
      { app: "Calendar", message: t('chaos.notifications.calendar'), time: "now" },
      { app: "Twitter", message: t('chaos.notifications.twitter'), time: "1h ago" },
      { app: "Health", message: t('chaos.notifications.health'), time: "now" },
      { app: "Bank", message: t('chaos.notifications.bank'), time: "3m ago" },
      { app: "Slack", message: t('chaos.notifications.boss'), time: "now" },
      { app: "Snapchat", message: t('chaos.notifications.snap'), time: "22m ago" },
      { app: "Messages", message: t('chaos.notifications.verify'), time: "now" },
      { app: "Linkedin", message: t('chaos.notifications.linkedin'), time: "4h ago" },
    ];

    // Generate static positions on mount or when active changes, 
    // but re-generating on each language change is fine here.
    const newItems = NOTIFICATIONS_DATA.map((n, i) => ({
      ...n,
      id: i,
      // Randomize positions but keep center relatively clear for text
      x: i % 2 === 0 ? Math.random() * 30 : 60 + Math.random() * 30, 
      y: Math.random() * 90,
      delay: Math.random() * 2 // Random delay for animation start
    }));
    setItems(newItems);
  }, [active, t]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl w-64 transform transition-all duration-500 animate-float"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
            opacity: 0,
            animation: `fadeInOut 4s infinite ${item.delay}s`
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{item.app}</span>
            <span className="text-[9px] text-white/50">{item.time}</span>
          </div>
          <p className="text-sm font-medium text-white leading-snug">{item.message}</p>
        </div>
      ))}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          10% { opacity: 1; transform: scale(1) translateY(0); }
          80% { opacity: 1; transform: scale(1) translateY(-10px); }
          100% { opacity: 0; transform: scale(0.9) translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default NotificationStorm;