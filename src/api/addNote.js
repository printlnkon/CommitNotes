import supabase from "@/config/supabase";

// add note API
export const addNoteAPI = {
  async addNote({ title, note, archived = false }) {
    try {
      // validate title andset default title if empty
      const finalTitle = typeof title !== "string" || title.trim() === "" ? "Untitled" : title.trim();
      if (finalTitle.length > 100) {
        throw new Error("Invalid input. Title must be at most 100 characters.");
      }

      // validate note
      const finalNote = typeof note === "string" ? note.trim() : "";
      if (finalNote.length < 3 || finalNote.length > 5000) {
        throw new Error("Invalid input. Note must be 3-5000 characters.");
      }

      // get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // add note
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: finalTitle, note: finalNote, archived, user_id: user.id }])
        .select();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error adding note:", error);
      return { data: null, error };
    }
  },
};
