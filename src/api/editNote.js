import supabase from "@/config/supabase";

// edit note API
export const editNoteAPI = {
  async editNote({ id, title, note }) {
    try {
      // edit note
      const { data, error } = await supabase
        .from("notes")
        .update([{ title, note }])
        .eq("id", id);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error editing notes:", error);
      return { data: null, error };
    }
  },
};
