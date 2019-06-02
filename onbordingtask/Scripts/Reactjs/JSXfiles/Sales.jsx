import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'semantic-ui-react';
import ModalDelete from '../Modals/ModalDelete.jsx';
import ModalCreate from '../Modals/SalesModal.jsx';

class Sales extends React.Component {
    constructor() {
        super();
        this.state = {
            SalesData: []
        }
        this.handleUserAdded = this.handleUserAdded.bind(this);
        this.handleUserUpdated = this.handleUserUpdated.bind(this);
        this.handleUserDeleted = this.handleUserDeleted.bind(this);
    }
    componentDidMount() {
        axios.get("/Sales/GetSalesData").then(response => {
            console.log(response.data);
            this.setState({
                SalesData: response.data
            });
        });
    }
    onCloseModal() {
        this.setState({
            active: false
        });
    }

    handleUserAdded(user) {
        
        let SalesData = this.state.SalesData.slice();
        SalesData.push(user);
        this.setState({ SalesData: SalesData });
    }

    handleUserUpdated(userid, user) {
        

        let SalesData = this.state.SalesData.slice();
        for (let i = 0, n = SalesData.length; i < n; i++) {
            if (SalesData[i].Id === userid) {
                SalesData[i].Product.ProductId = user.Product.ProductId
                SalesData[i].Product.ProductName = user.Product.ProductName;
                SalesData[i].Store.StoreId = user.Store.StoreId;
                SalesData[i].Store.StoreName = user.Store.StoreName;
                SalesData[i].Customer.CustomerId = user.Customer.CustomerId;
                SalesData[i].Customer.CustomerName = user.Customer.CustomerName;
                SalesData[i].DateSold = user.DateSold;

                break; // Stop this loop, we found it!
            }
        }
        this.setState({ SalesData: SalesData });
    }


    handleUserDeleted(id) {
        let SalesData = this.state.SalesData.slice();
        SalesData = SalesData.filter(u => { return u.Id != id; });
        this.setState({ SalesData: SalesData });
    }
    render() {
        console.log(this.state.SalesData);
        return (
            <div className="ui container">

                <h1>Sales List</h1>
                <div>
                    <ModalCreate
                        headerTitle='Create Sale'
                        buttonTriggerTitle='New Sale'
                        buttonSubmitTitle='Save'
                        buttonColor='blue'
                        onUserAdded={this.handleUserAdded} />
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>DateSold</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.SalesData.map((se, index) => {
                                    return <tr key={index}><td> {se.Customer.Name}</td>
                                        <td>{se.Product.Name}</td><td>{se.Store.Name}</td>
                                        <td>{new Date(parseInt(se.DateSold.substring(6, 19))).toDateString()}</td><td>   
                                        <ModalCreate
                                        headerTitle='Edit Sale'
                                        buttonTriggerTitle='Edit' buttonIcon="edit outline icon"
                                        buttonSubmitTitle='Save'
                                        buttonColor='yellow'
                                        userID={se.Id}
                                        onUserUpdated={this.handleUserUpdated} /> </td><td><ModalDelete
                                            headerTitle='Delete Sale' userID={se.Id} pathname='Sales'
                                            buttonTriggerTitle='Delete' buttonIcon="trash alternate outline icon"
                                            buttonColor='red' onUserDeleted={this.handleUserDeleted} /></td></tr>;
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

export default Sales