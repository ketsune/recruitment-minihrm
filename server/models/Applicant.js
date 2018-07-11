const db = require('../db');
// const moment = require('moment');

const Applicant = {};

Applicant.create = applicant => (
  db.one(
    'INSERT INTO applicants (first_name, last_name, position, mobile_number, email, first_name_th, last_name_th, citizen_id, file_path, file_name, status, registration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING 1',
    [
      applicant.firstName,
      applicant.lastName,
      applicant.position,
      applicant.mobileNumber,
      applicant.email,
      applicant.firstNameTH,
      applicant.lastNameTH,
      applicant.citizenID,
      './upload/',
      'resume.pdf',
      'Apply',
      applicant.registrationDate,
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

Applicant.updateFirstDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    first_date = $1
    WHERE citizen_id = $2`,
    [
      applicant.date,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateRejectDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    reject_date = $1
    WHERE citizen_id = $2`,
    [
      applicant.date,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateCancelDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    cancel_date = $1
    WHERE citizen_id = $2`,
    [
      applicant.date,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateBlacklistDate = applicant => (
  db.none(
    `UPDATE applicants
    SET
    blacklist_date = $1
    WHERE citizen_id = $2`,
    [
      applicant.date,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.updateNote = applicant => (
  db.none(
    `UPDATE applicants
    SET
    note = $1
    WHERE citizen_id = $2`,
    [
      applicant.note,
      applicant.citizenId
    ]
  )
    .then(() => db.manyOrNone(`SELECT * FROM applicants`))
);

Applicant.findById = id => (
  db.oneOrNone('SELECT * FROM applicants WHERE citizen_id = $1', [id])
);
Applicant.upload = (path, name, id, type) => (
  db.none('INSERT INTO applicants_files (citizen_id, file_path, file_name, type) VALUES ($1, $2, $3, $4);', [id, path, name, type])
);

// EmployeeInfo.findById = id => (
//   db.oneOrNone('SELECT * FROM employee_info WHERE user_id = $1', [id])
// );

// EmployeeInfo.updateProfileImg = (path, id) => (
//   db.none('UPDATE employee_info SET picture = $1 WHERE user_id = $2', [path, id])
// );

module.exports = Applicant;
