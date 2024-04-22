import Post from "../../model/posts";
(async () => {
  await Post.create({
    postName: "This is post one",
  });
  console.log("Post seeded");
})();
