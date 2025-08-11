import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

// Sichere Benutzer-Credentials aus Umgebungsvariablen
const getUsers = () => {
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  if (isProduction) {
    // In Production nur Umgebungsvariablen verwenden (nicht client-exponiert)
    return [
      {
        id: '1',
        email: process.env.ADMIN_USERNAME || '',
        password: process.env.ADMIN_PASSWORD || '',
        name: 'Administrator',
        role: 'admin' as const,
        createdAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        email: process.env.CUSTOMER_USERNAME || '',
        password: process.env.CUSTOMER_PASSWORD || '',
        name: 'Kunde',
        role: 'customer' as const,
        createdAt: new Date('2024-01-15'),
      },
    ].filter((user) => user.email && user.password);
  }

  // In Development/Staging Fallback zu Demo-Credentials
  return [
    {
      id: '1',
      email: process.env.ADMIN_USERNAME || 'admin@callflows.de',
      password: process.env.ADMIN_PASSWORD || 'callflowsPasswort25!',
      name: 'Administrator',
      role: 'admin' as const,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      email: process.env.CUSTOMER_USERNAME || 'kunde@callflows.de',
      password: process.env.CUSTOMER_PASSWORD || 'callflowsPasswort25!',
      name: 'Test Kunde',
      role: 'customer' as const,
      createdAt: new Date('2024-01-15'),
    },
  ];
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

          if (isProduction) {
            // Serverseitige Prüfung über PHP-Endpoint (statisches Hosting)
            const response = await fetch('/api/login.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              credentials: 'include',
            });

            if (!response.ok) {
              set({ isLoading: false });
              return false;
            }

            const data: { success: boolean; role?: 'admin' | 'customer'; name?: string } = await response.json();

            if (!data.success || !data.role) {
              set({ isLoading: false });
              return false;
            }

            const authUser: User = {
              id: data.role === 'admin' ? '1' : '2',
              email,
              name: data.name || (data.role === 'admin' ? 'Administrator' : 'Kunde'),
              role: data.role,
              createdAt: new Date(),
            };

            set({ user: authUser, isAuthenticated: true, isLoading: false });
            return true;
          }

          // Development/Staging: lokale Vergleichslogik
          await new Promise(resolve => setTimeout(resolve, 500));
          const users = getUsers();
          const user = users.find(u => u.email === email && u.password === password);
          if (!user) {
            set({ isLoading: false });
            return false;
          }

          const authUser: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
          };
          set({ user: authUser, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          set({ isLoading: false });
          console.error('Login error:', error);
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      checkAuth: () => {
        const { user } = get();
        if (user) {
          set({ isAuthenticated: true });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
); 