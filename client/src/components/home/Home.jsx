import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import DataTable from './data-table';
import {
	Container,
	Button,Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { postsCollection: [], userCollection: [] };
	}
	componentDidMount = () => {
		axios.get('http://localhost:4000/app')
			.then(res => {
				this.setState({ postsCollection: res.data });
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	dataTable() {
		
		return this.state.postsCollection.map((data,i) => {
			console.log(i)
			return <DataTable obj={data} key={i} />
		});
	}
	render() {
		return (
			<div>

				<center>
					
					<div className="search-div">
						<Search />
					</div>
					<div className="post-link">
						<h6 className=""><Link to="/post"><Button color="primary" className="w-25 btn-post">Post Your Errors buddy!</Button></Link></h6>
					</div>
					<Container className="home">
					<br />
		 
					<h2 className="font-weight-bold details">See All Posted Errors: </h2>
					<br/>
					<Pagination aria-label="Page navigation example">
      <PaginationItem disabled>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem disabled>
        <PaginationLink previous href="#" />
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
						<br />
			
						{this.dataTable(1)}
						<br />
					
					</Container>
				</center>

			</div>
		)
	}
}

export default Home;
