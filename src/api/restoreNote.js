import supabase from "@/config/supabase";

// restore note API
export const restoreNoteAPI = {
  async restoreNote({ id }) {
    try {
      // validate id
      const finalId = typeof id === "number" ? id : null;
      if (!finalId) {
        throw new Error("Invalid note ID.");
      }

      // check if note exists
      const { data: existingNote, error: noteError } = await supabase
        .from("notes")
        .select("archived")
        .eq("id", finalId)
        .single();

      if (noteError) {
        throw noteError;
      }
      
      if (!existingNote) {
        throw new Error("Note not found.");
      }

      //  update the "archived" field to "FALSE"
      const { data, error } = await supabase
        .from("notes")
        .update({ archived: false })
        .eq("id", finalId);

      if (error) {
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error restoring note:", error);
      return { data: null, error };
    }
  },
};
