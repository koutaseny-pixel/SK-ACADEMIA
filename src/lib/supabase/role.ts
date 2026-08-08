import { createClient } from "./server";

export async function getUserRole(): Promise<'admin' | 'customer' | null> {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return null;
  }

  if (user.email === 'koutaseny@gmail.com') {
    return 'admin';
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return 'customer'; // Default fallback
  }

  return profile.role as 'admin' | 'customer';
}
