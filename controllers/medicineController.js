const { Medicine } = require("../models");
const { Op } = require("sequelize");

exports.getAllMedicine = async (req, res) => {
  try {
    const search = req.query.medicineName;

    // Construct search condition
    let whereCondition = {};

    if (search) {
      whereCondition = {
        medicineName: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    // Find medicines with the search condition
    const medicines = await Medicine.findAll({
      where: whereCondition,
      // Add a case-insensitive collation option for MySQL
      collate: "utf8_general_ci", // Replace with appropriate collation for your database
    });

    res.status(200).json(medicines);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
