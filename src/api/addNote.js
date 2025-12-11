import supabase from "@/config/supabase";

// add note API
export const addNoteAPI = {
  async addNote({ title, note }) {
    try {
      // set default title if empty
      const finalTitle =
        typeof title !== "string" || title.trim() === ""
          ? "Untitled"
          : title.trim();

      // validate note
      const finalNote = typeof note === "string" ? note.trim() : "";
      if (finalNote.trim().length < 1 || finalNote.trim().length > 5000) {
        throw new Error("Invalid input. Note must be 1-5000 characters.");
      }

      // add note
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: finalTitle, note: finalNote }])
        .select();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error adding notes:", error);
      return { data: null, error };
    }
  },
};
