const callApi = (endpoint, request) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const requestWithHeaders = {
    ...{ headers },
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }
      return Promise.resolve(body);
    });
};

const api = {};

// Auth

api.login = form => (
  callApi('/auth/login', {
    method: 'POST',
    body: form
  })
);

api.signup = form => (
  callApi('/auth/signup', {
    method: 'POST',
    body: form
  })
);

api.hello = () => (
  callApi('/api/hello')
);

// Master table

api.fetchDepartments = () => (
  callApi('/api/departments')
);

api.fetchPositions = () => (
  callApi('/api/positions')
);

api.fetchLevels = () => (
  callApi('/api/levels')
);

api.fetchContracts = () => (
  callApi('/api/contracts')
);

api.fetchUniversities = () => (
  callApi('/api/universities')
);

api.fetchDegrees = () => (
  callApi('/api/degrees')
);

api.fetchFaculties = () => (
  callApi('/api/faculties')
);

api.fetchMajors = () => (
  callApi('/api/majors')
);

api.fetchCertificates = () => (
  callApi('/api/certificates')
);

api.fetchAssets = () => (
  callApi('/api/assets')
);

api.fetchAssetTypes = () => (
  callApi('/api/asset-types')
);

api.fetchAcessTypes = () => (
  callApi('api/access-control')
);

// Profile

api.fetchGeneralProfile = id => (
  callApi(`/api/employee-info?id=${id}`)
);

api.fetchWorkProfile = id => (
  callApi(`/api/employee-work?id=${id}`)
);

api.fetchEducationProfile = id => (
  callApi(`/api/educates?id=${id}`)
);

api.fetchCertificateProfile = id => (
  callApi(`/api/has-certificates?id=${id}`)
);

api.fetchAssetProfile = id => (
  callApi(`/api/has-assets?id=${id}`)
);

api.updateGeneralProfile = body => (
  callApi('/api/employee-info', {
    method: 'PUT',
    body
  })
);

api.updateWorkProfile = body => (
  callApi('/api/employee-work', {
    method: 'PUT',
    body
  })
);

api.updateEducationProfile = body => (
  callApi('/api/educates', {
    method: 'PUT',
    body
  })
);

api.updateCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'PUT',
    body
  })
);

api.updateAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'PUT',
    body
  })
);

api.createEducationProfile = body => (
  callApi('/api/educates', {
    method: 'POST',
    body
  })
);

api.createCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'POST',
    body
  })
);

api.createAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'POST',
    body
  })
);

api.deleteEducationProfile = body => (
  callApi('/api/educates', {
    method: 'DELETE',
    body
  })
);

api.deleteCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'DELETE',
    body
  })
);

api.deleteAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'DELETE',
    body
  })
);

// Employee

api.createEmployee = body => (
  callApi('/api/users', {
    method: 'POST',
    body
  })
);

api.fetchEmployee = () => (
  callApi('/api/users')
);

// Project

api.fetchProject = () => (
  callApi('/api/projects')
);

api.createProject = body => (
  callApi('/api/projects', {
    method: 'POST',
    body
  })
);

// Project detail

api.fetchProjectDetail = id => (
  callApi(`/api/projects/${id}`)
);

api.createMember = body => (
  callApi(`/api/has-project`, {
    method: 'POST',
    body
  })
);

// Leave

api.createLeave = body => (
  callApi('/api/leave-request', {
    method: 'POST',
    body
  })
);

api.fetchLeave = () => (
  callApi('/api/leave-request')
);

api.updateLeave = body => (
  callApi('/api/leave-request', {
    method: 'PUT',
    body
  })
);

// Timesheet

api.fetchTimesheet = id => (
  callApi(`/api/timesheets/?id=${id}`)
);

// Applicant
api.fetchApplicant = () => (
  callApi('/api/applicants')
);

// Recruitment
api.fetchRecruitment = () => (
  callApi('/api/applicants')
);

api.changeRecruitmentStatus = body => (
  callApi('api/applicants/update-status', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentInterviewDateTime = body => (
  callApi('api/applicants/update-interview-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentSignDateTime = body => (
  callApi('api/applicants/update-sign-datetime', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCompleteDateTime = body => (
  callApi('api/applicants/update-first-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentRejectDate = body => (
  callApi('api/applicants/update-reject-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentCancelDate = body => (
  callApi('api/applicants/update-cancel-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentBlacklistDate = body => (
  callApi('api/applicants/update-blacklist-date', {
    method: 'PUT',
    body
  })
);

api.updateRecruitmentNote = body => (
  callApi('api/applicants/update-note', {
    method: 'PUT',
    body
  })
);

export default api;
