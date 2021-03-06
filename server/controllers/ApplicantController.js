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
};

exports.updateInterviewDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.citizenId).then((selectApplicant) => {
    if (!(selectApplicant.interviewDate === null && selectApplicant.interviewTime === null)) {
      const mailOptions = {
        from: 'masaru39@playtorium.co.th',
        to: 'love_masachi4855@hotmail.com',
        subject: 'HR Playtorium : Interview Appointment เปลี่ยนวัน',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p>Playtorium Solutions Company Limited would like to make an appointment</p>
        <br />
        <hr />
        <p>for  <span style="background-color: #FFFF00">Interview</span> as details below;</p>    
        <p><span style="background-color: #FFFF00">Date : ${editApplicant.date} </span></p>
        <p><span style="background-color: #FFFF00">Time : ${editApplicant.time}  : Interview and Portfolio Presentation (If Applicable)</span></p>
        <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
        <p> Contact : Khun Suphattra 0819222562 </p>
        <br />
        <hr />
        <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
        <p>Best regards,</p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
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
    else {
      const mailOptions = {
        from: 'masaru39@playtorium.co.th',
        to: 'love_masachi4855@hotmail.com',
        subject: 'HR Playtorium : Interview Appointment',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
            <p>Playtorium Solutions Company Limited would like to make an appointment</p>
            <br />
            <hr />
            <p>for  Interview&Exam as details below;</p>    
            <p><span style="background-color: #FFFF00">Interview Date : ${editApplicant.date} </span></p>
            <p><span style="background-color: #FFFF00">Interview Time : ${editApplicant.time}  : Interview and Portfolio Presentation (If Applicable)</span></p>
            <p><span style="background-color: #FFFF00">Exam Date : ${editApplicant.date} </span></p>
            <p><span style="background-color: #FFFF00">Exam Time : ${editApplicant.time}</span></p>
            <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
            <p> Contact : Khun Suphattra 0819222562 </p>
            <br />
            <hr />
            <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
            <p>Best regards,</p>
            <p>Suphattra Trairatwarakorn</p>
            <p>Account Manager</p>
            <p>Playtorium Solutions Company Limited</p>
            <p>Mobile : 0819222562</p>
            `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
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
  }).catch(next);
  Applicant.updateInterviewDateTime(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignedPosition = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateSignedPosition(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.updateSignDateTime = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.citizenId).then((selectApplicant) => {
    if (!(selectApplicant.signDate === null && selectApplicant.signTime === null)) {
      const mailOptions = {
        from: 'masaru39@playtorium.co.th',
        to: 'love_masachi4855@hotmail.com',
        subject: 'HR Playtorium : เซ็นสัญญา เปลี่ยนสักอย่าง',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
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
    else {
      const mailOptions = {
        from: 'masaru39@playtorium.co.th',
        to: 'love_masachi4855@hotmail.com',
        subject: 'HR Playtorium : เซ็นสัญญา',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
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
  }).catch(next);
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

exports.updateExamDate = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.findInfoById(editApplicant.citizenId).then((selectApplicant) => {
    if (!(selectApplicant.examDate === null && selectApplicant.examTime === null)) {
      const mailOptions = {
        from: 'masaru39@playtorium.co.th',
        to: 'love_masachi4855@hotmail.com',
        subject: 'HR Playtorium : Interview Appointment เปลี่ยนสอบ',
        html: `<p>Dear Khun  ${selectApplicant.firstName} ,</p>
        <p>Playtorium Solutions Company Limited would like to make an appointment</p>
        <br />
        <hr />
        <p>for  <span style="background-color: #FFFF00">Exam</span> as details below;</p>    
        <p><span style="background-color: #FFFF00">Date : ${editApplicant.date} </span></p>
        <p><span style="background-color: #FFFF00">Time : ${editApplicant.time} </span></p>
        <p>Venue : PLAYTORIUM office, SJ Infinite One Business Complex, 11th Fl., (map as attached)</p>
        <p> Contact : Khun Suphattra 0819222562 </p>
        <br />
        <hr />
        <p>For more info about Company products and services please visit our website: <a href="https://www.playtorium.co.th">www.playtorium.co.th</a> [1] and FB: PlaytoriumSolutions </p>
        <p>Best regards,</p>
        <p>Suphattra Trairatwarakorn</p>
        <p>Account Manager</p>
        <p>Playtorium Solutions Company Limited</p>
        <p>Mobile : 0819222562</p>
        `,
        attachments: [{
          filename: 'play_map.jpg',
          path: './server/storage/play_map.jpg',
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
  }).catch(next);
  Applicant.updateExamDate(editApplicant)
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

exports.updateInterviewResult = (req, res, next) => {
  const editApplicant = req.body.applicant;
  Applicant.updateInterviewResult(editApplicant)
    .then((updatedApplicant) => {
      res.json(updatedApplicant);
    })
    .catch(next);
};

exports.findInfoById = (req, res, next) => {
  Applicant.findInfoById(req.query.id)
    .then((applicantInfo) => {
      res.json(applicantInfo);
    })
    .catch(next);
};

exports.findFileById = (req, res, next) => {
  Applicant.findFileById(req.query.id)
    .then((applicantInfo) => {
      res.json(applicantInfo);
    })
    .catch(next);
};

exports.upload = (req, res, next) => {
  // console.log(req);
  Applicant.upload(`/applicants-files/`, `${req.body.citizenId}_${req.body.type}.pdf`, req.body.citizenId)
    .then(() => {
      res.json('complete');
    })
    .catch(next);
};

exports.getPosition = (req, res, next) => {
  Applicant.getPosition()
    .then((position) => {
      res.json(position);
    })
    .catch(next);
};
