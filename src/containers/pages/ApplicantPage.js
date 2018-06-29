import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchApplicantRequest } from '../../actions/applicant';
import Loader from '../../components/Loader';
import Applicant from '../../components/Applicant';
// import { getFilteredEmployee } from '../../selectors/employee';

const ApplicantPage = ({ isFetching, applicants }) => (
  <div>
    {isFetching ? <Loader /> : <Applicant applicants={applicants} />}
  </div>
);

ApplicantPage.defaultProps = {
  applicants: []
};

ApplicantPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  applicants: PropTypes.array
  //   onChange: PropTypes.func.isRequired,
  //   onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.applicant.isFetching,
  applicants: state.applicant.lists
});

const mapDispatchToProps = dispatch => ({
  fetchApplicant: () => dispatch(fetchApplicantRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchApplicant } = this.props;
      fetchApplicant();
    }
  })
);

export default enhance(ApplicantPage);
