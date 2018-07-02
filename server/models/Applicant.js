const db = require('../db');
// const moment = require('moment');

const Applicant = {};

Applicant.create = applicant => (
  db.one(
    'INSERT INTO applicants (first_name, last_name, position, mobile_number, email, first_name_th, last_name_th, citizen_id, file_path, file_name, status, sign_date, interview_date,registration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING 1',
    [
      applicant.firstName,
      applicant.lastName,
      applicant.position,
      applicant.mobileNumber,
      applicant.email,
      applicant.firstNameTH,
      applicant.lastNameTH,
      applicant.citizenID,
      applicant.filePath,
      applicant.fileName,
      applicant.status,
      applicant.signDate,
      applicant.interviewDate,
      applicant.registrationDate
    ]
  )
);

Applicant.findAll = () => (
  db.manyOrNone('SELECT * FROM applicants')
);

Applicant.updateStatus = applicant => (
  db.none(
    `UPDATE applicants
    SET
    status = $1
    WHERE citizen_id = $2`,
    [
      applicant.status,
      applicant.citizenId,
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateInterviewDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    interview_date = $1
    WHERE first_name = $2 AND last_name = $3`,
    [
      applicant.interviewDate,
      applicant.firstName,
      applicant.lastName
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateSignDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    sign_date = $1
    WHERE first_name = $2 AND last_name = $3`,
    [
      applicant.signDate,
      applicant.firstName,
      applicant.lastName
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);
// EmployeeInfo.findById = id => (
//   db.oneOrNone('SELECT * FROM employee_info WHERE user_id = $1', [id])
// );

// EmployeeInfo.updateProfileImg = (path, id) => (
//   db.none('UPDATE employee_info SET picture = $1 WHERE user_id = $2', [path, id])
// );

module.exports = Applicant;
