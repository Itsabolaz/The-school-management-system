import supabase from "./supabase";

export async function getClasses() {
  const {
    data: classes,
    error: classesError,
    count,
  } = await supabase
    .from("classes")
    .select("grade, teacher_id(id , fullName)", { count: "exact" })
    .order("grade", { ascending: true });

  if (classesError) throw new Error("Faild to get classes data!");

  // get all students to show number of them in classes page
  const { data: students, error: studentError } = await supabase
    .from("students")
    .select("grade");

  if (studentError) throw new Error("Faild to get students data!");

  return { classes, students, count };
}
