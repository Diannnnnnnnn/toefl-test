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
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId') || null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      console.log('Initial userId from localStorage:', id);
      console.log('Initial token from localStorage:', token);

      if (!id || !token) {
        console.log('No userId or token found, redirecting to login');
        setUserName('User');
        setUserId(null);
        setLoading(false);
        router.push('/login');
        return;
      }

      setUserId(id); // Set userId dari localStorage terlebih dahulu
      console.log('UserId set from localStorage:', id);

      try {
        const response = await fetch(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response status:', response.status);

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized, clearing data and redirecting');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setUserId(null);
            router.push('/login');
            return;
          }
          console.log('Non-401 error, proceeding without user data');
        } else {
          setUserName(data.fullName || 'User');
          console.log('User data fetched successfully:', data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
        console.log('Loading set to false, userId:', userId);
      }
    };
    fetchUserData();
  }, [router]);

  // Sinkronisasi dengan localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      console.log('UserId synced to localStorage:', userId);
    } else {
      localStorage.removeItem('userId');
      console.log('UserId removed from localStorage');
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg font-medium">Memuat...</p>
      </div>
    );
  }

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
  console.log('useUser context:', context); // Logging untuk debugging
  return context;
}