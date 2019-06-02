import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'semantic-ui-react';
import ModalDelete from '../Modals/ModalDelete.jsx';
import ModalCreate from '../Modals/ModalCreate.jsx';

class Customer extends React.Component {
    constructor() {
        super();
        this.state = {
            CustomerData: []
        }
        this.handleUserAdded = this.handleUserAdded.bind(this);
        this.handleUserUpdated = this.handleUserUpdated.bind(this);
        this.handleUserDeleted = this.handleUserDeleted.bind(this);
    }



    componentDidMount() {
        axios.get("/Customer/GetCustomerData").then(response => {
            console.log(response.data);
            this.setState({
                CustomerData: response.data
            });
        });
        axios.get("/Customer/CustCount").then(response => {
            console.log(response.data);
            this.setState({
                Count: response.data
            });
        });

    }
    onCloseModal() {
        this.setState({
            active: false
        });
    }

    handleUserAdded(cust) {
        let CustomerData = this.state.CustomerData.slice();
        CustomerData.push(cust);
        this.setState({ CustomerData: CustomerData });
    }

    handleUserUpdated(UserID, cust) {
        let CustomerData = this.state.CustomerData.slice();
        for (let i = 0, n = CustomerData.length; i < n; i++) {
            if (CustomerData[i].Id === UserID) {
                CustomerData[i].CustomerName = cust.CustomerName;
                CustomerData[i].CustomerAddress = cust.CustomerAddress;

                break; // Stop this loop, we found it!
            }
        }
        this.setState({ CustomerData: CustomerData });
    }

    handleUserDeleted(Id) {
        let CustomerData = this.state.CustomerData.slice();
        CustomerData = CustomerData.filter(u => { return u.Id != Id; });
        this.setState({ CustomerData: CustomerData });
    }
    render() {

        return (
            <div className="ui container">

                <h1>Customers List</h1>
                <div>
                    <ModalCreate
                        headerTitle='Create Customer'
                        buttonTriggerTitle='Create New'
                        buttonSubmitTitle='Create' pathname='Customer'
                        buttonColor='blue'
                        onUserAdded={this.handleUserAdded} label='Address'
                        type='text' PH='Sydney' ML='100' />
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Address</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.CustomerData.map((c, index) => {
                                    return <tr key={index}><td> {c.Name}</td><td>{c.Address}</td><td>
                                        <ModalCreate
                                        headerTitle='Edit Product'
                                        buttonTriggerTitle='Edit' buttonIcon="edit outline icon"
                                        buttonSubmitTitle='Save' pathname='Customer'
                                        buttonColor='yellow' label='Address'
                                        type='text' PH='Sydney' ML='100' userID={c.Id} 
                                            onUserUpdated={this.handleUserUpdated} /> </td><td>
                                            <ModalDelete
                                            headerTitle='Delete Product' userID={c.Id} pathname='Customer'
                                            buttonTriggerTitle='Delete' buttonIcon="trash alternate outline icon"
                                            buttonColor='red' onUserDeleted={this.handleUserDeleted}  /></td></tr>;
                                })
                            }
                        </tbody>
                    </table>
                    <Pagination activePage='1' boundaryRange={0} size='mini' floated='right' siblingRange={2} totalPages='2' />
                </div>


            </div>
        )
    }
}

export default Customer