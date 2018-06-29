const Applicant = require('../models/Applicant');

exports.create = (req, res, next) => {
  const newApplicant = req.body;
  Applicant.create(newApplicant, req.user.id)
    .then((createdApplicant) => {
      res.json(createdApplicant);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Applicant.findAll()
    .then((applicants) => {
      res.json(applicants);
    })
    .catch(next);
};

exports.updateStatus = (req, res, next) => {
  const editApplicant = req.body;
  Applicant.updateStatus(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateInterviewDate = (req, res, next) => {
  const editApplicant = req.body;
  Applicant.updateInterviewDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignDate = (req, res, next) => {
  const editApplicant = req.body;
  Applicant.updateSignDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};
