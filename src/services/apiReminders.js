import { checkUserPremission } from "./apiAuth";
import supabase from "./supabase";

export async function getReminders() {
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("*");

  if (error) throw new Error("Faild to fetch reminders!");

  const sortRemindersByDate = reminders.sort(
    (first, second) => new Date(first.event_date) - new Date(second.event_date),
  );

  return sortRemindersByDate;
}

export async function addNewReminder(newReminder) {
  // check user role for CREATE
  const { error: premissionError } = await checkUserPremission();

  if (premissionError) {
    return { error: premissionError };
  }

  const { data, error } = await supabase
    .from("reminders")
    .insert(newReminder)
    .select();

  if (error) {
    if (error.code === "42501") {
      // RLS Error
      console.error(
        "User does not have permission to insert data into this table.",
      );
      return {
        error: new Error("You do not have permission to add new reminder."),
      };
    } else {
      // Other public error
      return { error: new Error("Faild to add new reminder!") };
    }
  }
  return { data };
}

export async function editReminder({ reminderId, updatedReminder }) {
  // check user role for EDIT(UPDATE)
  const { error: premissionError } = await checkUserPremission();

  if (premissionError) {
    return { error: premissionError };
  }

  const { data, error } = await supabase
    .from("reminders")
    .update(updatedReminder)
    .eq("id", reminderId)
    .select();

  if (error) {
    if (error.code === "42501") {
      //RLS error
      return {
        error: new Error("You do not have premission to edit reminder."),
      };
    } else {
      // other public error
      return { error: new Error("Faild to edit reminder!") };
    }
  }

  return { data };
}

export async function deleteReminder(reminderId) {
  // check user role for DELETE
  const { error: premissionError } = await checkUserPremission();

  if (premissionError) {
    return { error: premissionError };
  }

  const { data, error } = await supabase
    .from("reminders")
    .delete()
    .eq("id", reminderId);

  if (error) {
    if (error.code === "42501") {
      // RLS error
      return {
        error: new Error("You do not have premission to delete reminder."),
      };
    } else {
      // other public error
      return { error: new Error("Faild to delete reminder.") };
    }
  }

  return { data };
}

/*
alter policy "Enable insert for authenticated users only"


on "public"."reminders"


to authenticated


with check (
(
  EXISTS (
    SELECT
      1
    FROM
      user_roles
    WHERE
      (
        (user_roles.user_id = auth.uid ())
        AND (user_roles.role = 'authenticated'::text)
      )
  )
)
);
*/
