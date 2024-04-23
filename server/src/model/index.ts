import Client from "./client";
import Post from "./post";

Client.hasMany(Post);
Post.belongsTo(Client);

export { Client, Post };
