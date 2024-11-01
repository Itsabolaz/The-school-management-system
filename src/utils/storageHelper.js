import supabase, { supabaseUrl } from "../services/supabase";

export async function removeOldImage(image , userType) {
    const storageName = userType === 'teacher' ? 'teachers-avatar' : 'student-avatars'
    const oldImagePath = image.replace(
      `${supabaseUrl}/storage/v1/object/public/${storageName}/`,
      "",
    );
  
    const { error: deleteAvatarError } = await supabase.storage
      .from(storageName)
      .remove([oldImagePath]);
  
    if (deleteAvatarError)
      throw new Error(`Failed to delete ${userType}'s old avatar!`);
  }
  
export async function uploadImage(imageName, image , userType) {
    const storageName = userType === 'teacher' ? 'teachers-avatar' : 'student-avatars'
    // Upload image
    const { error: storageError } = await supabase.storage
      .from(storageName)
      .upload(imageName, image);
  
    if (storageError) throw new Error(`Uploading image wasn't successfull!`);
  }