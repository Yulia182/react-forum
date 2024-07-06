const updatePostInfo = async () => {
  await supabase
    .from("Posts")
    .update({
      title: title,
      content: content,
      image: image,
    })
    .eq("id", id);

  window.location = "/";
};

const deletePlayer = async () => {
  await supabase.from("Players").delete().eq("id", id);

  window.location = "/display";
};

export default updatePostInfo;
