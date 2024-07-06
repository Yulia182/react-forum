import { supabase } from "../client";

// fn to get posts from supabase
export const getPosts = async (searchTerm) => {
  let query = supabase
    .from("Posts")
    .select()
    .order("created_at", { ascending: false });

  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  const { data } = await query;
  return data;
};

// fn to get post details by id
export const getPostDetailsById = async (id) => {
  const { data, error } = await supabase
    .from("Posts")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post details:", error);
  } else {
    return data;
  }
};
