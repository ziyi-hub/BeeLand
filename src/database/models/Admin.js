import { DataTypes, Sequelize } from "sequelize"
import { getBDD } from "../database.js"
const sequelize = getBDD()

export const Admin = sequelize.define("admins", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  login: {
    type: DataTypes.STRING(80),
    unique: true
  },
  password: DataTypes.STRING
}, {
  timestamps: false
})