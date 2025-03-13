import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY);

export const uploadImage = async (file: File) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/airplanes/${fileName}`;

    const { data, error: uploadError } = await supabase.storage.from("image-upload").upload(filePath, file, {
      upsert: false,
      cacheControl: "3600",
    });

    if (uploadError) {
      throw uploadError;
    }

    return {
      ...data,
      fileName,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
