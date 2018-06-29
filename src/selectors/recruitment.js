export const getVisibleRecruitment = (state) => {
  if (!state.recruitment.data) return [];
  const regExp = new RegExp(state.recruitment.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return state.recruitment.data
    .filter(data => regExp.test(data.firstName)
      || regExp.test(data.lastName)
      || regExp.test(data.firstNameTh)
      || regExp.test(data.lastNameTh)
      || regExp.test(data.email)
      || regExp.test(data.position)
      || regExp.test(data.mobileNumber)
      || regExp.test(data.citizenId)
      || regExp.test(data.registrationDate)
      || regExp.test(data.signDate)
      || regExp.test(data.interviewDate))
    .sort((a, b) => {
      const direction = state.recruitment.direction === 'ascending' ? 1 : -1;
      if (a[state.recruitment.sortKey] < b[state.recruitment.sortKey]) {
        return direction * -1;
      }
      else if (a[state.recruitment.sortKey] > b[state.recruitment.sortKey]) {
        return direction;
      }
      return 0;
    });
};

export const getFilterRecruitment = (data, status) => {
  if (!data) return [];
  return data
    .filter(row => row.status === status);
};

export const getFilterRecruitmentTwoParam = (data, status, status2) => {
  if (!data) return [];
  return data
    .filter(row => row.status === status
    || row.status === status2);
};

