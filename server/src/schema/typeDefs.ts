export const typeDefs = `#graphql
type Post {
    postName: String
}
type Query {
    posts: [Post]
}
`