import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Item, Segment, Input, Button, Icon } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';
import history from '../history';

const row = applicant => (
  <Grid.Column width={8} key={applicant.citizenId}>
    <Segment raised style={{ cursor: 'pointer' }} onClick={() => history.push(`/profile/${applicant.citizenId}`)}>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={image} />
          <Item.Content>
            <Item.Header ><br /><br />{`${applicant.firstName || '-'} ${applicant.lastName || '-'}`}</Item.Header>
            <Item.Description>{`Mobile No.: ${applicant.mobileNumber || '-'}`}</Item.Description>
            <Item.Description>{`E-mail: ${applicant.email || '-'}`}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Grid.Column>
);

const Applicant = ({ applicants }) => (
  <div>
    <PageHeader icon="users" text="Employee" />
    <Segment.Group>
      <Segment>
        <Input icon="search" placeholder="Search employees..." />
        <Button icon labelPosition="left" color="blue" floated="right">
          <Icon name="add user" />
          Add new employee
        </Button>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={16}>
            <Grid columns={2}>
              {applicants.map(applicant => row(applicant))}
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  </div>
);

Applicant.propTypes = {
  applicants: PropTypes.array.isRequired
};

export default Applicant;


// <Table celled compact>
//         <Table.Header>
//           <Table.Row>
//             {/* {tableHeader.map(i => <Table.HeaderCell key={i}>{i}</Table.HeaderCell>)} */}
//             <Table.HeaderCell> Hello World </Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           <Table.Row>
//             <Table.Cell>Test</Table.Cell>
//           </Table.Row>
//           {/* {rows.map(i => <Table.Row key={i.citizenId}><Table.Cell >{i.no}.</Table.Cell>
//             <Table.Cell >{i.firstName} {i.lastName}</Table.Cell><Table.Cell >{i.position.join(' / ')}</Table.Cell><Table.Cell >{i.citizenId}</Table.Cell>
//             <Table.Cell >{i.email}</Table.Cell><Table.Cell >{i.mobileNumber}</Table.Cell><Table.Cell><Icon name = 'file pdf outline' /></Table.Cell>
//             <Table.Cell ><StatusChange dbStatus={i.status} callBackFromParent={this.handleStatusChange.bind(this,i)} /></Table.Cell><Table.Cell >{i.registrationDate}</Table.Cell>
//             <Table.Cell >{i.interviewDate}</Table.Cell>
//             <Table.Cell>
//                 <Button size='small' basic color='blue' onClick={this.todoAfterConfirm.bind(this,i)} >Confirm</Button>
//             </Table.Cell>
//             </Table.Row>)}                 */}
//         </Table.Body>
//         <Table.Footer fullWidth>
//           <Table.Row>
//             <Table.HeaderCell colSpan="11" />
//           </Table.Row>
//         </Table.Footer>
//       </Table>
