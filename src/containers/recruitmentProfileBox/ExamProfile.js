import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
// import { openModal } from '../../actions/modal';
// import * as modalNames from '../../constants/modalNames';

const ExamProfile = ({ examProfile, onClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            Interview & Exam
          </Header>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Grid>
        <Grid.Row divided>
          <Grid.Column width={10}>
            <Header size="small">Interview Time <Icon name="clock outline" />: {examProfile.interviewTime}</Header>
            <Header size="small">Interview Date <Icon name="calendar outline" />: {examProfile.interviewDate}</Header>
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="middle">
            <Header size="small">Exam: <Icon name="file pdf outline" onClick={() => onClick()} /></Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Segment.Group>
);

ExamProfile.propTypes = {
  examProfile: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(),
});

export default connect(null, mapDispatchToProps)(ExamProfile);
