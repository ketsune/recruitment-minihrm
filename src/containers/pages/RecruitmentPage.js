import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchRecruitmentRequest, changeActiveItemRequest, filterRecruitment, sortRecruitment } from '../../actions/recruitment';
import Recruitment from '../../components/Recruitment';
import Loader from '../../components/Loader';
import { getVisibleRecruitment } from '../../selectors/recruitment';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const RecruitmentPage = ({ isFetching, activeItem, changeActiveItem, data, onSearchChange, sortKey, sortByKey, direction, onConferm }) => {
  const handleSort = (key) => {
    if (sortKey !== key) {
      sortByKey(key, 'ascending');
    }
    else {
      sortByKey(key, direction === 'ascending' ? 'descending' : 'ascending');
    }
  };
  return (
    <div>
      {isFetching ? <Loader /> : <Recruitment
        activeItem={activeItem}
        changeActiveItem={changeActiveItem}
        data={data}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConferm={onConferm}
      />
      }
    </div>
  );
};

RecruitmentPage.defaultProps = {
  isFetching: true,
  activeItem: 'all',
  data: [],
};

RecruitmentPage.propTypes = {
  isFetching: PropTypes.bool,
  activeItem: PropTypes.string,
  changeActiveItem: PropTypes.func.isRequired,
  data: PropTypes.array,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  onConferm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isFetching,
  activeItem: state.recruitment.activeItem,
  tableHeader: state.recruitment.tableHeader,
  data: getVisibleRecruitment(state),
  sortKey: state.recruitment.sortKey,
  direction: state.recruitment.direction,
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitment: () => dispatch(fetchRecruitmentRequest()),
  changeActiveItem: activeItem => dispatch(changeActiveItemRequest(activeItem)),
  onSearchChange: e => dispatch(filterRecruitment(e.target.value)),
  sortByKey: (key, direction) => dispatch(sortRecruitment(key, direction)),
  onConferm: () => dispatch(openModal(modalNames.EDIT_RECRUITMENT)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchRecruitment } = this.props;
      fetchRecruitment();
    }
  })
);

export default enhance(RecruitmentPage);
