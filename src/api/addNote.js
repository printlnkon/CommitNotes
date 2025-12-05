import supabase from "@/config/supabase";

// add note API
export const addNoteAPI = {
  async addNote({ title, content }) {
    try {
      // add note
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: title, content: content }])
        .select();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error adding notes:", error);
      return { data: null, error };
    }
  },
};
