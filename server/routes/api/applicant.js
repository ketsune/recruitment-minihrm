const router = require('express').Router();
const ApplicantController = require('../../controllers/ApplicantController');
// const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');

router.post('/', ApplicantController.create);

router.get('/', ApplicantController.findAll);

router.put('/update-status', ApplicantController.updateStatus);

router.put('/update-interview-datetime', ApplicantController.updateInterviewDateTime);

router.put('/update-sign-datetime', ApplicantController.updateSignDateTime);

router.put('/update-first-date', ApplicantController.updateFirstDate);

router.put('/update-reject-date', ApplicantController.updateRejectDate);

router.put('/update-cancel-date', ApplicantController.updateCancelDate);

router.put('/update-blacklist-date', ApplicantController.updateBlacklistDate);

router.put('/update-note', ApplicantController.updateNote);

router.get('/applicant-info', ApplicantController.findInfoById);

router.get('/applicant-file', ApplicantController.findFileById);


const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'server/storage/applicant');
  },
  filename: (req, res, cb) => {
    cb(null, `${req.body.citizenId}.pdf`);
  }
});

const upload = multer({ storage });

router.post('/upload-file', upload.single('cv'), ApplicantController.uploadFile);

module.exports = router;
