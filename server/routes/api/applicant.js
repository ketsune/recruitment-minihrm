const router = require('express').Router();
const ApplicantController = require('../../controllers/ApplicantController');
// const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
// const multer = require('multer');

router.post('/', ApplicantController.create);

router.get('/', ApplicantController.findAll);

router.put('/update-status', ApplicantController.updateStatus);

router.put('/update-interview-datetime', ApplicantController.updateInterviewDateTime);

router.put('/update-sign-datetime', ApplicantController.updateSignDateTime);

router.put('/update-first-date', ApplicantController.updateFirstDate);

router.put('/update-reject-date', ApplicantController.updateRejectDate);

router.put('/update-cancel-date', ApplicantController.updateCancelDate);

router.put('/update-blacklist-date', ApplicantController.updateBlacklistDate);


// router.put('/', ApplicantController.update);

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, 'server/storage/profile-img');
//   },
//   filename: (req, res, cb) => {
//     cb(null, String(req.user.id));
//   }
// });

// const upload = multer({ storage });

// router.post('/upload-profile-img', upload.single('profile'), EmployeeInfoController.updateProfileImg);

module.exports = router;
