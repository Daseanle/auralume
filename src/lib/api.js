import { supabase } from './supabase';

/**
 * Generates a partnership invite link
 */
export const createPartnershipInvite = async (userId) => {
    if (!userId) throw new Error("User ID required");

    // 1. Create a new partnership record
    const { data, error } = await supabase
        .from('partnerships')
        .insert([{
            user_a_id: userId,
            status: 'pending'
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

/**
 * Checks if a partnership has been accepted
 */
export const getPartnershipStatus = async (userId) => {
    const { data, error } = await supabase
        .from('partnerships')
        .select('*')
        .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
        .eq('status', 'active')
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
        console.error("Error fetching partnership:", error);
    }

    return data; // Returns the partnership object or null
};

/**
 * Save a chat or tarot reading
 */
export const saveReading = async (userId, type, content) => {
    const { error } = await supabase
        .from('readings')
        .insert([{ user_id: userId, type, content }]);

    if (error) console.error("Failed to save reading:", error);
};

/**
 * Load chat history
 */
export const getChatHistory = async (userId) => {
    const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'chat')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
};
