import supabase from "@/config/supabase";

// home API
export const homeAPI = {
  async getNotes() {
    try {
      // fetch all notes
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("archived", false)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching notes:", error);
      return { data: null, error };
    }
  },
};