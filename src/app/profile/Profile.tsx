'use client'; // если используешь App Router и client component

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const API_URL = process.env.NEXT_PUBLIC_API_URL

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/profile`, {
          withCredentials: true, // обязательно для отправки cookie
        });
        setUser(res.data.user);
      } catch (e: any) {
        if (e.response?.status === 401) {
          // access просрочен или нет токена → пробуем refresh
          try {
            await axios.post(
              `${API_URL}/api/auth/refresh`,
              {},
              { withCredentials: true }
            );
            // повторный запрос после обновления токена
            const resRetry = await axios.get(`${API_URL}/api/user/profile`, {
              withCredentials: true,
            });
            setUser(resRetry.data.user);
          } catch {
            router.push('/login'); // если refresh не сработал
          }
        } else {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Name:</strong> {user.name || 'Not set'}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}
