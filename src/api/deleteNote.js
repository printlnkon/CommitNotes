import supabase from "@/config/supabase";

// delete note API
export const deleteNoteAPI = {
  async deleteNote({ id }) {
    try {
      // validate id
      const finalId = typeof id === "number" ? id : null;
      if (!finalId) {
        throw new Error("Invalid note ID.");
      }

      // delete note
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .eq("id", finalId);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error deleting note:", error);
      return { data: null, error };
    }
  },
};
