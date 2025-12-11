import supabase from "@/config/supabase";

// edit note API
export const editNoteAPI = {
  async editNote({ id, title, note }) {
    try {
      // validate title
      const finalTitle = typeof title === "string" ? title.trim() : "";
      if (finalTitle.length > 100) {
        throw new Error("Invalid input. Title must be at most 100 characters.");
      }

      // validate note
      const finalNote = typeof note === "string" ? note.trim() : "";
      if (finalNote.length < 3 || finalNote.length > 5000) {
        throw new Error("Invalid input. Note must be 3-5000 characters.");
      }

      // edit note
      const { data, error } = await supabase
        .from("notes")
        .update([{ title: finalTitle, note: finalNote }])
        .eq("id", id);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error editing notes:", error);
      return { data: null, error };
    }
  },
};
