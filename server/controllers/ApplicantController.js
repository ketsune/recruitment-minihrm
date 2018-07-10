const Applicant = require('../models/Applicant');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  host: 'cpanel01wh.bkk1.cloud.z.com',
  port: 465,
  auth: {
    user: 'masaru39@playtorium.co.th',
    pass: 'z123456@plays'
  },
  secure: true
}));

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
  const editApplicant = req.body.applicant;
  Applicant.updateStatus(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
  if (editApplicant.status === 'Approve') {
    const mailOptions = {
      from: 'masaru39@playtorium.co.th',
      to: 'love_masachi4855@hotmail.com',
      subject: 'Hello',
      html: `<p>Good Morning </p> `,
      attachments: [{
        'filename': 'logo_original.png',
        'path' : './src/view/logo_original.png',
      }]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(info);
      }
    });
  }
};

exports.updateInterviewDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateInterviewDateTime(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateSignDateTime(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateFirstDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateFirstDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateRejectDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateRejectDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateCancelDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateCancelDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateBlacklistDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateBlacklistDate(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateNote = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateNote(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.findById = (req, res, next) => {
  Applicant.findById(req.query.id)
    .then((applicantInfo) => {
      res.json(applicantInfo);
    })
    .catch(next);
};

exports.uploadFile = (req, res, next) => {
  // console.log(req.file.destination);
  Applicant.uploadFile(`${req.file.destination}`, `${req.body.citizenId}.pdf`, req.body.citizenId)
    .then(() => {
      res.json('complete');
    });
};
