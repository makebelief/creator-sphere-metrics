
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  url: string;
  followers_count: number;
  engagement_rate: number;
}

export const useSocialAccounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAccounts();
    } else {
      setAccounts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchAccounts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching social accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (account: Omit<SocialAccount, 'id'>) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { error } = await supabase
        .from('social_accounts')
        .insert({ ...account, user_id: user.id });

      if (error) throw error;
      await fetchAccounts();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateAccount = async (id: string, updates: Partial<SocialAccount>) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchAccounts();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    accounts,
    loading,
    addAccount,
    updateAccount,
    refetch: fetchAccounts,
  };
};
