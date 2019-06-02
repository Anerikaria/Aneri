import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from 'semantic-ui-react';
import ModalDelete from '../Modals/ModalDelete.jsx';
import ModalCreate from '../Modals/ModalCreate.jsx';

class Stores extends React.Component {
    constructor() {
        super();
        this.state = {
            StoreData: []
        }
        this.handleUserAdded = this.handleUserAdded.bind(this);
        this.handleUserUpdated = this.handleUserUpdated.bind(this);
        this.handleUserDeleted = this.handleUserDeleted.bind(this);
    }



    componentDidMount() {
        axios.get("/Store/GetStoreData").then(response => {
            console.log(response.data);
            this.setState({
                StoreData: response.data
            });
        });
    }
    onCloseModal() {
        this.setState({
            active: false
        });
    }

    handleUserAdded(user) {
        let StoreData = this.state.StoreData.slice();
        StoreData.push(user);
        this.setState({ StoreData: StoreData });
    }

    handleUserUpdated(userid, user) {

        let StoreData = this.state.StoreData.slice();
        for (let i = 0, n = StoreData.length; i < n; i++) {
            if (StoreData[i].Id === userid) {
                StoreData[i].StoreName = user.StoreName;
                StoreData[i].StoreAddress = user.StoreAddress;

                break; // Stop this loop, we found it!
            }
        }
        this.setState({ StoreData: StoreData });
    }

    handleUserDeleted(id) {
        let StoreData = this.state.StoreData.slice();
        StoreData = StoreData.filter(u => { return u.Id != id; });
        this.setState({ StoreData: StoreData });
    }
    render() {

        return (
            <div className="ui container">

                <h1>Stores List</h1>
                <div>
                    <ModalCreate headerTitle='Create Store' buttonTriggerTitle='Create New' buttonSubmitTitle='Save'
                        buttonColor='blue' pathname='Store' label='Address' type='text' PH='Sydney' ML='100' onUserAdded={this.handleUserAdded} />
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Store Address</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.StoreData.map((s, index) => {

                                    return <tr key={index}><td> {s.Name}</td><td>{s.Address}</td><td> <ModalCreate
                                        headerTitle='Edit Product' buttonTriggerTitle='Edit' buttonIcon="edit outline icon"
                                        buttonSubmitTitle='Save' pathname='Store' label='Address' type='text' PH='Sydney' ML='100' buttonColor='yellow' userID={s.Id}
                                        onUserUpdated={this.handleUserUpdated} /> </td><td><ModalDelete
                                            headerTitle='Delete Product' userID={s.Id} pathname='Store'
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

export default Stores