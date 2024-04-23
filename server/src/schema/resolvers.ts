import Post from "../model/posts";

type NewPost = {
  postName: String;
};

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
  Mutation: {
    newPost: async (_: any, args: { post: NewPost }, __: any) => {
      const newPost = await Post.create(args.post);
      return newPost.toJSON();
    },
  },
};
