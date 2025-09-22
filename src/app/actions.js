"use server";
import { revalidatePath } from "next/cache";

export async function refetchBlogDetails(slug) {
  try {
    revalidatePath(`/blogs/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error disliking content:", error);
    return { success: false, error: error.message };
  }
}
