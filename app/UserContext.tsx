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
  const [userId, setUserId] = useState<string | null>(null); // Inisialisasi awal null
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Pengecekan apakah di lingkungan browser
    if (typeof window !== 'undefined') {
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

        setUserId(id); // Set userId dari localStorage

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
    } else {
      // Jika bukan browser (server-side), set loading ke false tanpa akses localStorage
      setLoading(false);
    }
  }, [router]);

  // Sinkronisasi dengan localStorage hanya di client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && userId) {
      localStorage.setItem('userId', userId);
      console.log('UserId synced to localStorage:', userId);
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