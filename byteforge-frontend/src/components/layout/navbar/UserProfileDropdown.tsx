import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
  url: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "timestamp">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage or API
    const loadNotifications = async () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(
            parsedNotifications.filter((n: Notification) => !n.read).length
          );
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    };

    loadNotifications();
  }, []);

  const addNotification = (
    notification: Omit<Notification, "id" | "read" | "timestamp">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      timestamp: new Date(),
    };

    setNotifications((prev) => [...prev, newNotification]);
    setUnreadCount((prev) => prev + 1);
    localStorage.setItem(
      "notifications",
      JSON.stringify([...notifications, newNotification])
    );
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadCount((prev) => prev - 1);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const allRead = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(allRead);
    setUnreadCount(0);
    localStorage.setItem("notifications", JSON.stringify(allRead));
  };

  const removeNotification = (id: string) => {
    const filteredNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(filteredNotifications);
    setUnreadCount((prev) => prev - 1);
    localStorage.setItem(
      "notifications",
      JSON.stringify(filteredNotifications)
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
}
