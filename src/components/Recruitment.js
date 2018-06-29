import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import RecruitmentTable from './RecruitmentTable';

const Recruitment = ({ activeItem, changeActiveItem, data, onSearchChange, sortKey, direction, handleSort, onConferm }) => (
  <div>
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Menu fluid vertical tabular>
              <Menu.Item name="ทั้งหมด" active={activeItem === 'all'} onClick={() => changeActiveItem('all')} />
              <Menu.Item name="เลือก1" active={activeItem === 'tab1'} onClick={() => changeActiveItem('tab1')} />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={14}>
            {activeItem === 'all' ? <RecruitmentTable data={data} onSearchChange={onSearchChange} sortKey={sortKey} direction={direction} handleSort={handleSort} onConferm={onConferm} /> :
              (activeItem === 'tab1' ? 'BBB' : 'ขออภัยในความไม่สะดวก')
            }
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
