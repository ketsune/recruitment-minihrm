import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon, Image } from 'semantic-ui-react';
// import { openModal } from '../../actions/modal';
// import * as modalNames from '../../constants/modalNames';

const GeneralProfile = ({ generalProfile, file }) => {
  const imgSrc = `http://localhost:3000/static${file.filePath}${file.fileName}`;
  return (
    <Segment.Group raised size="large">
      <Segment padded>
        <Grid>
          <Grid.Row style={{ marginLeft: '10px' }}>
            <Header size="huge">{generalProfile.firstName} {generalProfile.lastName} ( {generalProfile.status} )</Header>
          </Grid.Row>
          <Grid.Row style={{ marginLeft: '20px', marginBottom: '5px' }}>
            <Header size="medium">{`${generalProfile.firstNameTh} ${generalProfile.lastNameTh} - ${generalProfile.position.join('/ ')}`}</Header>
          </Grid.Row>
          <hr style={{ width: '100%' }} />
          <Grid.Row divided>
            <Grid.Column width={10}>
              <Header size="small">Citizen ID <Icon name="id card" />:  {generalProfile.citizenId}</Header>
              <Header size="small">Mobile No <Icon name="phone" />: {generalProfile.mobileNumber}</Header>
              <Header size="small">Email <Icon name="mail" />: {generalProfile.email}</Header>
              <Header size="small">Registration Date <Icon name="calendar outline" />: {generalProfile.registrationDate}</Header>
            </Grid.Column>
            <Grid.Column width={6} verticalAlign="middle" >
              <Image src={imgSrc} href={imgSrc} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

GeneralProfile.propTypes = {
  generalProfile: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
  // onEditClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onEditClick: () => dispatch(),
  //   onEditClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
});

export default connect(null, mapDispatchToProps)(GeneralProfile);
