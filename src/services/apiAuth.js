import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: new Error("Provided email or password are incorrect!"),
    };
  }

  return { data };
}

export async function signup({ email, password, userName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
        schoolName: 'Future Leaders school'
      },
    },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      return {
        error: new Error("User already registered with this email"),
      };
    } else {
      return {
        error: new Error("Failed to sign up!"),
      };
    }
  }

  // change new user role after sign up
  const userId = data.user.id;
  const { error: roleError } = await supabase
    .from("user_roles")
    .insert([{ user_id: userId, role: "anon" }]);
  if (roleError) {
    console.error("Failed to assign role:", roleError);
  }

  return { data };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Faild to log out!");
}

export async function uploadUserImage(avatar) {
  // create image path
  const imageName = `${Math.random()}-${avatar.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/principals-avatar/${imageName}`;

  const { data, error: updateUserError } = await supabase.auth.updateUser({
    data: {
      avatar: imagePath,
    },
  });

  if (updateUserError) throw new Error("Faild to update user image!");

  const { error: storageError } = await supabase.storage
    .from("principals-avatar")
    .upload(imageName, avatar);

  if (storageError) throw new Error(`Uploading image wasn't successfull!`);

  return data;
}

export async function updateUserData({ email, otherData }) {
  const { data, error } = await supabase.auth.updateUser({
    email,
    data: { ...otherData },
  });

  // if (error.code === "email_exists") {
  //   throw new Error(
  //     "A user with this email address has already been registered",
  //   );
  // } else {
  if (error) throw new Error(error);
  // }

  return data;
}

export async function sendRecoveryEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email , {
    redirectTo: 'http://localhost:5173/reset-password',
  });
  // redirectTo: 'http://localhost:5173/reset-password'

  if (error) throw new Error("Failed to send login link via email!");

  return data;
}

export async function resetPassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error);

  return data;
}

// check user role for DELETE, INSERT AND UPDATE
export async function checkUserPremission() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userRoles.role !== "authenticated") {
    return {
      error: new Error("You do not have permission to perform this action."),
    };
  }

  return { user };
}
