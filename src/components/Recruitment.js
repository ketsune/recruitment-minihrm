import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import AllTable from './RecruitmentTable/AllTable';
import ApplyTable from './RecruitmentTable/ApplyTable';
import ApproveTable from './RecruitmentTable/ApproveTable';
import InProgressTable from './RecruitmentTable/InProgessTable';
import RejectTable from './RecruitmentTable/RejectTable';
import PassTable from './RecruitmentTable/PassTable';
import SignContractTable from './RecruitmentTable/SignContractTable';
import CompleteTable from './RecruitmentTable/CompleteTable';
import CancelTable from './RecruitmentTable/CancelTable';
import BlacklistTable from './RecruitmentTable/BlacklistTable';
import { getFilterRecruitment, getFilterRecruitmentTwoParam } from '../selectors/recruitment';

const getActiveTable = (activeItem, data, onSearchChange, sortKey, direction, handleSort) => {
  let filteredData = [];
  switch (activeItem) {
    case 'All':
      return (<AllTable data={data} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Apply':
      filteredData = getFilterRecruitment(data, 'Apply');
      console.log(filteredData);
      return (<ApplyTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Approve':
      filteredData = getFilterRecruitment(data, 'Approve');
      return (<ApproveTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'In Progress':
      filteredData = getFilterRecruitment(data, 'In Progress');
      return (<InProgressTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Reject':
      filteredData = getFilterRecruitmentTwoParam(data, 'Reject', 'Fail');
      return (<RejectTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Pass':
      filteredData = getFilterRecruitment(data, 'Pass');
      return (<PassTable data={data} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Sign Contract':
      filteredData = getFilterRecruitment(data, 'Sign Contract');
      console.log(filteredData);
      return (<SignContractTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Cancel':
      filteredData = getFilterRecruitment(data, 'Cancel');
      return (<CompleteTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Complete':
      filteredData = getFilterRecruitment(data, 'Complete');
      return (<CancelTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    case 'Blacklist':
      filteredData = getFilterRecruitment(data, 'Blacklist');
      return (<BlacklistTable data={filteredData} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} />);
    default:
      return ('ขออภัยในความไม่สะดวก');
  }
};

const Recruitment = ({ activeItem, changeActiveItem, data, onSearchChange, sortKey, direction, handleSort, onConferm }) => (
  <div>
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Menu fluid vertical tabular>
              <Menu.Item name="All applicants" active={activeItem === 'All'} onClick={() => changeActiveItem('All')} />
              <Menu.Item name="New applicants" active={activeItem === 'Apply'} onClick={() => changeActiveItem('Apply')} />
              <Menu.Item name="Interview applicants" active={activeItem === 'Approve'} onClick={() => changeActiveItem('Approve')} />
              <Menu.Item name="In Progress applicants" active={activeItem === 'In Progress'} onClick={() => changeActiveItem('In Progress')} />
              <Menu.Item name="Reject or Fail applicants" active={activeItem === 'Reject'} onClick={() => changeActiveItem('Reject')} />
              <Menu.Item name="Pass applicants" active={activeItem === 'Pass'} onClick={() => changeActiveItem('Pass')} />
              <Menu.Item name="Sign Contract applicants" active={activeItem === 'Sign Contract'} onClick={() => changeActiveItem('Sign Contract')} />
              <Menu.Item name="Cancel applicants" active={activeItem === 'Cancel'} onClick={() => changeActiveItem('Cancel')} />
              <Menu.Item name="Complete applicants" active={activeItem === 'Complete'} onClick={() => changeActiveItem('Complete')} />
              <Menu.Item name="Blacklist applicants" active={activeItem === 'Blacklist'} onClick={() => changeActiveItem('Blacklist')} />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={14}>
            {getActiveTable(activeItem, data, onSearchChange, sortKey, direction, handleSort)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

Recruitment.propTypes = {
  changeActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConferm: PropTypes.func.isRequired,
};

export default Recruitment;
