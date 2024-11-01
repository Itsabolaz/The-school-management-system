import { PAGE_SIZE } from "../utils/constants";
import { checkUserPremission } from "./apiAuth";
import supabase from "./supabase";

export async function getAllParents({ search, filter, page }) {
  let studentQuery = supabase.from("students").select("id , grade");

  if (search) {
    studentQuery.ilike("studentName", `%${search.value}%`);
  }

  if (filter) {
    studentQuery.eq("grade", filter.value);
  }

  // sort students from grade 1 to 6
  studentQuery.order("grade", { ascending: true });

  // get students ids base filter and search
  const { data: studentData } = await studentQuery;
  const studentIds = studentData.map((student) => student.id);

  let parentsQuery = supabase
    .from("parents")
    .select("* , students:student_id(id ,studentName , grade)", {
      count: "exact",
    })
    .in("student_id", studentIds);

  const { data: parentsData, error, count } = await parentsQuery;

  if (error) throw new Error("Parents data did not load!");

  // Sorting parents based on their children's grades
  let sortedAllParents = studentData
    .map((student) =>
      parentsData.find((parents) => parents.student_id === student.id),
    )
    .filter((parents) => parents !== undefined);

  // pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    sortedAllParents = sortedAllParents.slice(from, to);
  }

  return { parentsData: sortedAllParents, count };
}

export async function getParents(parentsId) {
  const { data: parent, error } = await supabase
    .from("parents")
    .select("*, students!parents_student_id_fkey(*)")
    .eq("id", parentsId)
    .single();

  if (error) throw new Error("Parent data did not load!");

  return parent;
}

export async function editParents({ parentsObj, parentsId }) {
   // check user role for EDIT
   const { error: premissionError } = await checkUserPremission();

   if (premissionError) {
     return { error: premissionError };
   }

  const { data, error } = await supabase
    .from("parents")
    .update(parentsObj)
    .eq("id", parentsId)
    .select();

  if (error) throw new Error("Editting the parents was not successful!");

  return data;
}
