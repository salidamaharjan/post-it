import Post from "../model/posts";

export const resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      const post = posts.map((post) => {
        return post.toJSON();
      });
      console.log(post);
      return post;
    },
  },
};
