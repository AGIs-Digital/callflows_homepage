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

// Demo-Benutzer für Entwicklung
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@callflows.de',
    password: 'callflows2025',
    name: 'Admin',
    role: 'admin' as const,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'kunde@example.com',
    password: 'kunde123',
    name: 'Test Kunde',
    role: 'customer' as const,
    createdAt: new Date('2024-01-15')
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Simuliere API-Aufruf
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = DEMO_USERS.find(u => u.email === email && u.password === password);
          
          if (user) {
            const authUser: User = {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              createdAt: user.createdAt
            };
            
            set({ 
              user: authUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
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