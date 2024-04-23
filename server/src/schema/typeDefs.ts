export const typeDefs = `#graphql
type Post {
    id: Int
    postName: String
    createdAt: String
    updatedAt: String
    username: String
}

type Client {
    id: Int
    username: String
}

type Query {
    posts: [Post]
}

input NewPost {
    postName: String
}

type Mutation {
    newPost(post: NewPost): Post
    login(username: String, password: String): String
}
`;
