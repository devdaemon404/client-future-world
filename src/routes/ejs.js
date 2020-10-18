const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employee');

const { protect, authorize } = require('../middleware/auth');

router.get('/pdf-gen', protect, authorize('admin'), async (req, res, next) => {
  let e = await Employee.findOne({ user: req.query.employeeId });

  if (!e) {
    return next(new ErrorResponse('Employee not filled the form', 400));
  }
  e = e.toObject();
  res.render('index', {
    photo: e.photo || '',
    basicInformation: {
      'Company Name': e.companyName || '',
      'Emp No.': e.empNo || '',
      'Name in Full': e.fullName || '',
      'Name in HRIS': e.nameHRIS || '',
      'Father Name': e.fatherName || '',
      'Documented Date of Birth': e.dob || '',
      'Original Date of Birth': e.originalDob || '',
      Sex: e.sex || '',
      'Birth Place': e.birthPlace || '',
      'Marital Status': e.maritalStatus || '',
      'Marriage Date': e.marriageDate || '',
      Religion: e.religion || '',
      Designation: e.designation || '',
      'Joining Date': e.joiningDate || '',
      Department: e.department || '',
      'Reporting To': e.reporting || '',
      'Job Level': e.jobLevel || '',
      Location: e.officeLocation || '',
      'Manner of Entry': e.entryVia || '',
      Nomination: e.nomination || '',
      'PAN Number': e.panNo || '',
      'Passport Number': e.passportNo || '',
      'Issue Date & Place': e.issue || '',
      Validity: e.validity || '',
    },
    addressInformation: {
      'Present Address': e.presentAddress || '',
      'Ph No. / Mob No': e.phoneNumberPresAdd || '',
      'Permanent Address': e.permanentAddress || '',
      'Perm. Ph No. / Mob No': e.phoneNumberPermAdd || '',
      'Contact Person \n(In case of emergency)': e.contactPersonName || '',
      'Contact Person \nPh No. / Mobile No.': e.contactPersonPhone || '',
      'Contact Person Address': e.contactPersonAddress || '',
    },
    familyMembersInformation: (e.familyInformation || []).map((o) => ({
      name: o.name || '',
      relationship: o.relationship || '',
      dob: o.familyDob || '',
      occupation: o.occupation || '',
      bloodGroup: o.bloodGroup || '',
    })),

    languageInformation: {
      'Can Read': e.canRead || '',
      'Can Write': e.canWrite || '',
      'Can Speak': e.canSpeak || '',
      'Mother Tongue': e.motherLang || '',
    },
    academicInformation: (e.academicInformation || []).map((o) => ({
      qualification: o.qualiDesc || '',
      subject: o.sub || '',
      schoolName: o.schoolCollegeName || '',
      boardName: o.boardUniversityName || '',
      boardLocation: o.location || '',
      courseDuration: o.courseDuration || '',
      marks: o.marks || '',
      fullTime: o.fullPartTime || '',
      yearOfPassing: o.yOfPassing || '',
    })),
    professionalExperience: (e.workInformation || []).map((o) => ({
      company: o.company || '',
      fromDate: o.fromDate || '',
      toDate: o.toDate || '',
      designation: o.designation || '',
      salary: o.salary || '',
      typeOfIndustry: o.typeOfIndustry || '',
      reasonForLeaving: o.reasonForLeaving || '',
    })),
    healthInformation: {
      'Blood Group': e.bloodGroup || '',
      'Height (in cms)': e.height || '',
      Weight: e.weight || '',
      'Glass Power (L)': e.lEyePower || '',
      'Glass Power (R)': e.rEyePower || '',
    },
    otherHealthInformation: {
      'Identification Marks 1': e.identification1 || '',
      'Identification Marks 2': e.identification2 || '',
      'Any major surgery / illness in the past / Allergies': e.illnesses || '',
    },
    otherInformation: {
      'Relatives in the Company (Name, Designation & Location)':
        e.relativeInfo || '',
      'Reference 1 - Name': e.ref1Name || '',
      'Ref 1 Company': e.ref1Company || '',
      'Ref 1 Designation': e.ref1Designation || '',
      'Ref 1 Contact No': e.ref1Contact || '',
      'Reference 2 - Name': e.ref2Name || '',
      'Ref 2 Company': e.ref2Company || '',
      'Ref 2 Designation': e.ref2Designation || '',
      'Ref 2 Contact No': e.ref2Contact || '',
    },
  });
});

module.exports = router;