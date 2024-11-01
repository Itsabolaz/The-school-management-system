import { PAGE_SIZE } from "../utils/constants";
import { removeOldImage, uploadImage } from "../utils/storageHelper";
import { checkUserPremission } from "./apiAuth";
import supabase, { supabaseUrl } from "./supabase";

export async function getAllStudents({ search, filter, page }) {
  let query = supabase
    .from("students")
    .select("* , parents!students_parent_id_fkey(fatherName , address)", {
      count: "exact",
    });

  // Search by name
  if (search) query.ilike(search.field, `%${search.value}%`);

  // Filter by class (grade)
  if (filter) query.eq(filter.field, filter.value);

  // Pagination
  
  if (window.location.pathname !== "/dashboard") {
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }
  }

  // sort students from grade 1 to 6
  query.order("grade", { ascending: true });

  const { data, error, count } = await query;

  if (error) throw new Error("Getting students wasn't successfull!");

  return { data, count };
}

export async function createStudentAndParents({ data: newData, image }) {
  // check user role for CREATE
  const {error: premissionError} = await checkUserPremission();

  if(premissionError){
    return {error: premissionError}
  }
  const {
    nationalId,
    studentName,
    gender,
    religion,
    dateOfBirth,
    admissionDate,
    grade,
    bloodGroup,
    fatherName,
    motherName,
    email,
    phoneNumber,
    fatherOccupation,
    address,
  } = newData;

  // create image path
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/student-avatars/${imageName}`;

  let studentQuery = supabase.from("students");
  // 1. Add new student
  const newStudent = {
    nationalId,
    studentName,
    gender,
    religion,
    dateOfBirth,
    admissionDate,
    grade,
    bloodGroup,
  };
  const { data: studentData, error: studentError } = await studentQuery
    .insert([{ ...newStudent, image: imagePath }])
    .select();

  if (studentError) throw new Error("Creating student wasn't successfull!");

  // get new student id for connect to new parent
  const studentId = studentData[0].id;

  // 2. Add new parent and connect the student key
  const newParent = {
    fatherName,
    motherName,
    email,
    phoneNumber,
    fatherOccupation,
    address,
  };

  const { data: parentData, error: parentError } = await supabase
    .from("parents")
    .insert([{ ...newParent, student_id: studentId }])
    .select();

  if (parentError) throw new Error("Creating parent wasn't successfull!");

  // get new parent id for connect to new student
  const parentId = parentData[0].id;

  // 2. update new student and connect the parent key
  const { data: updatedStudentData, error: updateStudentError } = await supabase
    .from("students")
    .update({ parent_id: parentId })
    .eq("id", studentId)
    .select();

  if (updateStudentError) throw new Error(updateStudentError);

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("student-avatars")
    .upload(imageName, image);

  if (storageError) throw new Error(`Uploading image wasn't successfull!`);

  return updatedStudentData;
}

export async function getStudent(studentId) {
  const { data, error } = await supabase
    .from("students")
    .select("*, parents!students_parent_id_fkey(*)")
    .eq("id", studentId)
    .single();

  if (error) throw new Error("Student not found!");

  return data;
}

export async function deleteStudentAndParents(studentId) {
  // check user role for DELETE
  const {error: premissionError} = await checkUserPremission();

  if(premissionError){
    return {error: premissionError}
  }

  let studentQuery = supabase.from("students");

  // 1. before delete student , select student image.
  const { data: studentData, error: fetchStudentError } = await studentQuery
    .select("image")
    .eq("id", studentId);

  if (fetchStudentError)
    throw new Error("Fetching the student's data was not successful!");

  const image = studentData?.[0]?.image;

  // 2. Delete the student's parents  , first:
  const { error: deleteParentError } = await supabase
    .from("parents")
    .delete()
    .eq("student_id", studentId);

  if (deleteParentError)
    throw new Error("Deleting the student was not successful!");

  // 3. Now delete the student
  const { data: deleteStudentData, error: deleteStudentError } =
    await studentQuery.delete().eq("id", studentId);

  if (deleteStudentError)
    throw new Error("Deleting the student was not successful!");

  //4. last, delete the image of student
  if (!image) {
    console.log("No avatar found for this student");
  } else {
    const imagePath = image.replace(
      "https://enoyegffjahwqkmolsbl.supabase.co/storage/v1/object/public/student-avatars/",
      "",
    );
    // Remove the image of student from the storage bucket
    const { error: deleteAvatarError } = await supabase.storage
      .from("student-avatars")
      .remove([imagePath]); // Use the image in the remove method

    if (deleteAvatarError)
      throw new Error(
        "There is a problem. The student's avatar was not deleted!",
      );
  }

  return deleteStudentData;
}

export async function editStudent({ studentId, studentObj }) {
  // check user role for EDIT(UPDATE)
  const {error: premissionError} = await checkUserPremission();

  if(premissionError){
    return {error: premissionError}
  }

  const { image } = studentObj;
  // 1. check image has path or not
  let hasImagePath = image?.startsWith?.(supabaseUrl);

  // delete old image from storage if a new photo is uploaded.
  if (!hasImagePath) {
    const { data: studentData, error: fetchStudentError } = await supabase
      .from("students")
      .select("image")
      .eq("id", studentId);

    if (fetchStudentError)
      throw new Error("Fetching the student's data was not successful!");

    const oldImage = studentData?.[0]?.image;

    if (oldImage) await removeOldImage(oldImage, "student");
  }

  const imageName = hasImagePath
    ? image
    : `${Math.random()}-${image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/student-avatars/${imageName}`;

  // 2. Edit student with new data
  const { data: editStudentData, error: editStudentError } = await supabase
    .from("students")
    .update({
      ...studentObj,
      image: imagePath,
    })
    .eq("id", studentId)
    .select();

  if (editStudentError)
    throw new Error("Editting the student was not successful!");

  if (!hasImagePath) await uploadImage(imageName, image, "student");

  return editStudentData;
}
