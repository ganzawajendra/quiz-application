import { supabase } from "../config/supabaseClient"

export const getXpUser = async (userId) => {
    if(!userId) return null
    try {
        const {data, error} = await supabase.from('users').select('xp').eq('id', userId).single()
        if (error) throw error
        return data
    } catch (error) {
        console.log("Error dalam pengambilan data XP user: " + error.message)
        throw error
    }
}