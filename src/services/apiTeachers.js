import { removeOldImage, uploadImage } from "../utils/storageHelper";
import { checkUserPremission } from "./apiAuth";
import supabase, { supabaseUrl } from "./supabase";

export async function getTeachers({ search, filter }) {
  let query = supabase.from("teachers").select("*" , {count: 'exact'});

  // search by teacher name
  if (search) query.ilike(search.field, `%${search.value}%`);

  // filter by class(grade)
  if (filter) query.eq(filter.field, filter.value);

  // sort teachers from grade 1 to 6
  query.order('grade' , {ascending: true})

  const { data: teachers, error , count } = await query;

  if (error) throw new Error("Getting teachers wasn't successfull!");

  return {teachers , count};
}

export async function getTeacher(teacherId) {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("id", teacherId)
    .single();

  if (error) throw new Error("Getting teacher wasn't successfull!");

  return data;
}

export async function deleteTeacher(teacherId) {
   // check user role for DELETE
   const { error: premissionError } = await checkUserPremission();

   if (premissionError) {
     return { error: premissionError };
   }

  let teachersQuery = supabase.from("teachers");

  // 1. before delete teacher , select teacher image.
  const { data: teacherData, error: fetchTeacherError } = await teachersQuery
    .select("image")
    .eq("id", teacherId);

  if (fetchTeacherError)
    throw new Error("Fetching the teacher's data was not successful!");

  const image = teacherData?.[0]?.image;

  //2. Now delete teacher
  const { data: deleteTeacherData, error } = await teachersQuery
    .delete()
    .eq("id", teacherId);

  if (error) throw new Error("Deleting teacher wasn't successfull!");

  //4. last, delete the image of teacher
  if (!image) {
    console.log("No avatar found for this teacher");
  } else {
    const imagePath = image.replace(
      "https://enoyegffjahwqkmolsbl.supabase.co/storage/v1/object/public/teachers-avatar/",
      "",
    );
    // Remove the image of teacher from the storage bucket
    const { error: deleteAvatarError } = await supabase.storage
      .from("teachers-avatar")
      .remove([imagePath]); // Use the image in the remove method

    if (deleteAvatarError)
      throw new Error(
        "There is a problem. The teacher's avatar was not deleted!",
      );
  }

  return deleteTeacherData;
}

export async function editTeacher({ teacherId, teacherObj }) {
   // check user role for EDIT(UPDATE)
   const { error: premissionError } = await checkUserPremission();

   if (premissionError) {
     return { error: premissionError };
   }

  const { image } = teacherObj;
  // 1. check image has path or not
  let hasImagePath = image?.startsWith?.(supabaseUrl);

  //2. delete old image from storage if a new photo is uploaded.
  if (!hasImagePath) {
    const { data: teacherData, error: fetchTeacherError } = await supabase
      .from("teachers")
      .select("image")
      .eq("id", teacherId);

    if (fetchTeacherError)
      throw new Error("Fetching the teacher's data was not successful!");

    const oldImage = teacherData?.[0]?.image;
    if (oldImage) await removeOldImage(oldImage , 'teacher');
  }

  const imageName = hasImagePath
    ? image
    : `${Math.random()}-${image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/teachers-avatar/${imageName}`;

  // 3. Edit teacher with new data
  const { data: editTeacherData, error: editTeacherError } = await supabase
    .from("teachers")
    .update({
      ...teacherObj,
      image: imagePath,
    })
    .eq("id", teacherId)
    .select();

  if (editTeacherError) throw new Error("Faild to update teacher!");

  if (!hasImagePath) await uploadImage(imageName, image , 'teacher');

  return editTeacherData;
}

export async function createTeacher({ data: newData, image }){
   // check user role for CREATE
   const { error: premissionError } = await checkUserPremission();

   if (premissionError) {
     return { error: premissionError };
   }

  // create image path
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/teachers-avatar/${imageName}`;

  let teachersQuery = supabase.from("teachers");
  // 1. Add new student
  const newTeacher = (({
    nationalId,
    fullName,
    gender,
    religion,
    dateOfBirth,
    grade,
    fatherName,
    phoneNumber,
    email,
    address ,
    teacherDescription,
  }) => ({
    nationalId,
    fullName,
    gender,
    religion,
    dateOfBirth,
    grade,
    fatherName,
    phoneNumber,
    email,
    address ,
    teacherDescription,
  }))(newData)


  const { data: teacherData, error: teacherError } = await teachersQuery
    .insert([{ ...newTeacher, image: imagePath }])
    .select();

  if (teacherError) throw new Error("Creating teacher wasn't successfull!" , teacherError);

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("teachers-avatar")
    .upload(imageName, image);

  if (storageError) throw new Error(`Uploading image wasn't successfull!`);

  return teacherData;
}