import { DataTypes } from "sequelize";

export default function (sequelize) {
    sequelize.define(
        'Vehicles', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        make: {
            allowNull: false,
            type: DataTypes.STRING

        },
        model: {
            allowNull: false,
            type: DataTypes.STRING

        },
        year: {
            allowNull: false,
            type: DataTypes.INTEGER

        }

    }
    )
}