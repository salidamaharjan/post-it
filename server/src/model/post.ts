import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConnection";
class Post extends Model {}

Post.init(
  {
    // Model attributes are defined here
    postName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "post", // We need to choose the model name
    underscored: true,
    freezeTableName: true,
  }
);

// the defined model is the class itself
console.log(Post === sequelize.models.User); // true
export default Post;
