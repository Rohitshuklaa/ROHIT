const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentsbyId = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsbyId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.cheakEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exist");
    }
    pool.query(
      queries.addStudents,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("student created successfully!");
      }
    );
  });
};

module.exports = {
  getStudents,
  getStudentsbyId,
  addStudents,
};
