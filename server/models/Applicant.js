const db = require('../db');
// const moment = require('moment');

const Applicant = {};

Applicant.create = applicant => (
  db.one(
    'INSERT INTO applicants (first_name, last_name, position, mobile_number, email, first_name_th, last_name_th, citizen_id, file_path, file_name, status, sign_date, sign_time, interview_date, interview_time, registration_date, cancel_date, first_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING 1',
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
      applicant.signTime,
      applicant.interviewDate,
      applicant.interviewTime,
      applicant.registrationDate,
      applicant.cancelDate,
      applicant.firstDate,
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

Applicant.updateInterviewDateTime = applicant => (
  db.none(
    `UPDATE applicants
    SET
    interview_date = $1, interview_time = $2
    WHERE  citizen_id = $3`,
    [
      applicant.date,
      applicant.time,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateSignDateTime = applicant => (
  db.none(
    `UPDATE applicants
    SET
    sign_date = $1, sign_time = $2
    WHERE citizen_id = $3`,
    [
      applicant.date,
      applicant.time,
      applicant.citizenId
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
