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

      console.log('UserContext - userId:', id); // Debug
      console.log('UserContext - token:', token); // Debug

      if (!id || !token) {
        console.warn('User ID or token not found in localStorage');
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

        console.log('UserContext - API response status:', response.status); // Debug

        // Read the response body only once
        const data = await response.json();
        console.log('UserContext - API response data:', data); // Debug

        if (!response.ok) {
          if (response.status === 401) {
            console.warn('Unauthorized: Invalid token');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            router.push('/login');
            return;
          }
          throw new Error(data.message || 'Failed to fetch user data');
        }

        setUserName(data.fullName || 'User');
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserName('User');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  return (
    <UserContext.Provider value={{ userName, userId, loading }}>
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