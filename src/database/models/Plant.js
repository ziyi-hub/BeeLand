import { DataTypes, Sequelize } from "sequelize"
import { getBDD } from "../database.js"
const sequelize = getBDD();

export const Plant = sequelize.define("plants", {
  color: DataTypes.STRING(50),
  flowering: DataTypes.STRING(80),
  french_name: DataTypes.STRING(50),
  height: DataTypes.STRING(20),
  honeydew: DataTypes.TINYINT,
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  latin_name: DataTypes.STRING(50),
  location: DataTypes.STRING(80),
  nectar: DataTypes.INTEGER,
  photo: DataTypes.STRING(80),
  pollen: DataTypes.INTEGER
}, {
  timestamps: false
})