import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination, Table, Dropdown } from 'semantic-ui-react';

import ModalDelete from '../Modals/ModalDelete.jsx';
import ModalCreate from '../Modals/ModalCreate.jsx';

class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            pages: {
                count: 0,
                recordsPerPage: 10,
                current: 1
            }
        }
        this.handleUserAdded = this.handleUserAdded.bind(this);
        this.handleUserUpdated = this.handleUserUpdated.bind(this);
        this.handleUserDeleted = this.handleUserDeleted.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }



    componentDidMount() {
        axios.get("/Product/GetProdata/1").then(response => {
            console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
        axios.get("/Product/ProductCount").then(response => {
            console.log(response.data);
            this.setState({
                count: response.data
            });
        });
    }
    onCloseModal() {
        this.setState({
            active: false
        });
    }

    handleUserAdded(user) {
        let ProductData = this.state.ProductData.slice();
        ProductData.push(user);
        this.setState({ ProductData: ProductData });
        // this.handleClose();
    }

    handleUserUpdated(userid, user) {
        let ProductData = this.state.ProductData.slice();
        for (let i = 0, n = ProductData.length; i < n; i++) {
            if (ProductData[i].Id === userid) {
                ProductData[i].Name = user.Name;
                ProductData[i].Price = user.Price;

                break; // Stop this loop, we found it!
            }
        }
        this.setState({ ProductData: ProductData });
    }

    handlePaginationChange(e, { activePage }) {
        //this.recordFetchCount();
        // this.recordFetch(activePage, this.state.pages.recordsPerPage);
    }

    handleUserDeleted(id) {
        let ProductData = this.state.ProductData.slice();
        ProductData = ProductData.filter(u => { return u.Id != id; });
        this.setState({ ProductData: ProductData });
    }
    render() {

        return (
            <div className="ui container">

                <h1>Products List</h1>

                <ModalCreate
                    headerTitle='Create Product'
                    buttonTriggerTitle='Create New'
                    buttonSubmitTitle='Save' buttonColor='blue' pathname='Product'
                    onUserAdded={this.handleUserAdded} label='Price'
                    type='number' PH='100' ML='4' />
                <Table className="ui celled table">
                    <Table.Header>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                            <th>Actions</th>

                        </tr>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.ProductData.map((p, index) => {
                                return <tr key={index}><td> {p.Name}</td><td>{p.Price}</td><td> <ModalCreate
                                    headerTitle='Edit Product' buttonTriggerTitle='Edit' buttonIcon="edit outline icon"
                                    buttonSubmitTitle='Save' buttonColor='yellow'
                                    userID={p.Id} pathname='Product' onUserUpdated={this.handleUserUpdated} label='Price'
                                    type='number' PH='100' ML='4' /> </td><td><ModalDelete
                                        headerTitle='Delete Product' userID={p.Id} pathname='Product'
                                        buttonTriggerTitle='Delete' buttonIcon="trash alternate outline icon"
                                        buttonColor='red' onUserDeleted={this.handleUserDeleted} /></td></tr>;
                            })
                        }
                    </Table.Body>

                </Table>
                <Pagination activePage='1' boundaryRange={0} size='mini' floated='right' siblingRange={2} totalPages='2' />



            </div>
        )
    }
}


export default Products

