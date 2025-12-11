import supabase from "@/config/supabase";

// archive note API
export const archiveNoteAPI = {
  async archiveNote({ id }) {
    try {
      // validate id
      const finalId = typeof id === "number" ? id : null;
      if (!finalId) {
        throw new Error("Invalid note ID.");
      }

      // check if note exists or archived already
      const { data: note, error: noteError } = await supabase
        .from("notes")
        .select("archived")
        .eq("id", finalId)
        .single();
      if (noteError) throw noteError;
      if (!note) throw new Error("Note not found.");
      if (note.archived) throw new Error("Note is already archived.");

      // update the "archived" field to "TRUE"
      const { data, error } = await supabase
        .from("notes")
        .update({ archived: true })
        .eq("id", finalId);

      if (error) throw error;
      return { data, error: null };

    } catch (error) {
      console.error("Error archiving note:", error);
      return { data: null, error };
    }
  },
};
