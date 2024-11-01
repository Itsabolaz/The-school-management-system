import supabase from "./supabase";

export async function getCurriculum(filter) {
    const query = supabase.from("curricula").select("*")

   // filter Curricula by class(grade)
  if (filter) query.eq(filter.field, filter.value);

  const { data, error } = await query;

  if (error) throw new Error("Faild to fetch curriculm!");

  return data;
}
