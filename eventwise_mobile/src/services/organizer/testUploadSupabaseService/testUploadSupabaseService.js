// src/services/organizer/testUploadSupabaseService/testUploadSupabaseService.js
import { supabase } from "../../../config/supabaseConfig";

export const testUploadImageToSupabase = async (uri, fileName) => {
  try {
    // Fetch the image as a binary buffer
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    console.log("Uint8Array obtained:", uint8Array);

    // Define the storage path
    const storagePath = `test_uploads/${fileName}`;

    // Upload the Uint8Array to Supabase Storage
    const { error } = await supabase.storage
      .from("capstone") // Ensure this bucket exists
      .upload(storagePath, uint8Array, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg",
      });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { publicURL, error: urlError } = supabase.storage
      .from("capstone")
      .getPublicUrl(storagePath);

    if (urlError) {
      throw urlError;
    }

    console.log("Public URL obtained:", publicURL);
    return publicURL;
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    if (error instanceof TypeError) {
      console.error("Possible network issue or invalid URI.");
    } else {
      console.error("Error details:", error.message || error);
    }
    throw error;
  }
};
