export const typeDefs = `#graphql
type Post {
    postName: String
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
`
