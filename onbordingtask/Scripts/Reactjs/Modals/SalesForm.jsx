import React, { Component } from 'react';
import { Message, Button, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import DatePicker from "react-datepicker";

import { DateInput } from 'semantic-ui-calendar-react';


class SalesForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            formClassName: '',
            formSuccessMessage: '',
            formErrorMessage: '',
            products: [],
            customers: [],
            stores: [],
            startdate: '', pvalue: 'select', cvalue: 'select', svalue: 'select',
            Product: '', Customer: '', Store: '', DateSold: '',
            validationError: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get("/Product/GetProdata/1")
            .then((response) => {
                this.setState({
                    products: response.data
                });
            })
        axios.get("/Customer/GetCustomerData")
            .then((response) => {
                this.setState({
                    customers: response.data
                });
            })
        axios.get("/Store/GetStoreData")
            .then((response) => {
                this.setState({
                    stores: response.data
                });
            })
    }
    componentWillMount() {
        // Fill in the form with the appropriate data if user id is provided
        console.log("componentWillMountIF: " + this.props.userID);
        const path = this.props.pathname;
        if (this.props.userID) {
            axios.get(`/Sales/GetSale/${this.props.userID}`)
                .then((response) => {
                    this.setState({
                        pvalue: response.data.Product.Id,
                        cvalue: response.data.Customer.Id,
                        svalue: response.data.Store.Id,
                        date: response.data.DateSold,

                    });
                })
                .catch((err) => { console.log(err); });
        }
    }

    handleInputChange(e) {
        const target = e.target;
        const val = target.type === 'checkbox' ? target.checked : target.value;
        const Name = target.name;


        this.setState({ [Name]: val });
        if (Name == 'Product') {
            this.setState({ pvalue: val });
        }
        if (Name == 'Customer') {
            this.setState({ cvalue: val });
        }
        if (Name == 'Store') {
            this.setState({ svalue: val });
        } r
    }

    handleChange(e) {
        var target = e;
        this.setState({ startDate: target });
    }

    handleSubmit(e) {
        e.preventDefault();
        const sale = {
            ProductId: this.state.Product,
            CustomerId: this.state.Customer,
            StoreId: this.state.Store,
            DateSold: this.state.startDate

        }
        const params = this.props.userID ? this.props.userID : '';
        const posturl = this.props.userID ? `/Sales/EditSale/${params}` : '/Sales/AddSale';
        axios({
            method: 'POST',
            url: posturl,
            data: sale,
        })
            .then((response) => {
                this.setState({
                    formClassName: 'success', formSuccessMessage: response.data.msg
                });
                if (!this.props.userID) {
                    this.setState({ Product: '', Customer: '', Store: '' });
                    this.props.onUserAdded(response.data);
                }
                else { this.props.onUserUpdated(params, response.data); }
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.data) {
                        this.setState({ formClassName: 'warning', formErrorMessage: err.response.data.msg });
                    }
                }
                else {
                    this.setState({ formClassName: 'warning', formErrorMessage: 'Something went wrong. ' + err });
                }
            });
    }


    render() {
        const formClassName = this.state.formClassName;
        const formSuccessMessage = this.state.formSuccessMessage;
        const formErrorMessage = this.state.formErrorMessage;

        return (
            <Form className={formClassName} onSubmit={this.handleSubmit} >
                <div>
                    <label><b>Product</b></label><br />
                    <select name='Product' value={this.state.pvalue} onChange={this.handleInputChange}>
                        <option value='Select' key='1'>--Select--</option>
                        {
                            this.state.products.map(function (item) {
                                return <option value={item.Id} key={item.Id}>{item.Name}</option>;
                            })
                        }
                    </select><br /></div>
                <div>
                    <label ><b>Customer</b></label><br />
                    <select name='Customer' value={this.state.cvalue} onChange={this.handleInputChange}>
                        <option value='Select' key='1'>--Select--</option>
                        {
                            this.state.customers.map(function (item) {
                                return <option value={item.Id} key={item.Id}>{item.Name}</option>;
                            })
                        }
                    </select><br /></div>
                <div>
                    <label><b>Store</b></label><br />
                    <select name='Store' value={this.state.svalue} onChange={this.handleInputChange}>
                        <option value='Select' key='1'>--Select--</option>
                        {
                            this.state.stores.map(function (item) {
                                return <option value={item.Id} key={item.Id}>{item.Name}</option>;
                            })
                        }
                    </select><br /></div>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} value={this.state.startDate} />

                <Message success color='green' header='Updated!' content={formSuccessMessage} />
                <Message warning color='yellow' header='Woah!' content={formErrorMessage} />
                <Button color={this.props.buttonColor} pathname={this.props.pathname} floated='right'>{this.props.buttonSubmitTitle}</Button>
                <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
            </Form>
        );
    }
}


export default SalesForm;
