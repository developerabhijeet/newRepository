import React, { Component } from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import { Table, Button} from 'reactstrap';

class DataTable extends Component {
  render() {
    return (
      <>
      
        <br />
      <Table dark>
          <tbody>
            <th><h5>Problem Statement:</h5></th>
            <tr>
            <td> <strong><h4>{this.props.obj.post}
            </h4></strong></td></tr>
            <th colspan="2"><Link clasName="link" to={`/post/${this.props.obj._id}`}><Button color="primary">VIEW POST</Button></Link> </th>
              <tr>

              </tr>
           
          </tbody>
        </Table>
       
      </>
    );
  }
}

export default DataTable;