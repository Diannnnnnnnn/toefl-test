"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserContextType {
  userName: string;
  userId: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string>('User');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!id || !token) {
        setUserName('User');
        setUserId(null);
        setLoading(false);
        router.push('/login');
        return;
      }

      setUserId(id);

      try {
        const response = await fetch(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            router.push('/login');
            return;
          }
          throw new Error(data.message || 'Failed to fetch user data');
        }

        setUserName(data.fullName || 'User');
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg font-medium">Memuat...</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userName, userId, loading: false }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}