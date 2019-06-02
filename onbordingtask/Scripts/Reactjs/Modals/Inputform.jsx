import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'


class InputForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Price: '',
            Address: '',
            formClassName: '',
            formSuccessMessage: '',
            formErrorMessage: ''

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentWillMount() {
        // Fill in the form with the appropriate data if user id is provided
        console.log("componentWillMountIF: " + this.props.userID);
        const path = this.props.pathname;
        if (this.props.userID) {
            if (path == 'Product') {
                axios.get(`/Product/GetProduct/${this.props.userID}`)
                    .then((response) => {
                        this.setState({
                            Name: response.data.Name,
                            Price: response.data.Price,
                        });

                        console.log("Name:Price " + Name + Price);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            if (path == 'Customer' || path == 'Store') {
                axios.get(`/` + path + `/Get` + path + `/${this.props.userID}`)
                    .then((response) => {
                        this.setState({
                            Name: response.data.Name,
                            Address: response.data.Address,
                        });

                        console.log("Name:Address " + Name + Address);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const Name = target.name;

        this.setState({ [Name]: value });
    }

    handleSubmit(e) {
        // Prevent browser refresh
        e.preventDefault();

        const user = {
            Name: this.state.Name,
            Price: this.state.Price,
        }
        const cust = {
            Name: this.state.Name,
            Address: this.state.Address,
        }

        // Acknowledge that if the user id is provided, we're updating via PUT
        // Otherwise, we're creating a new data via POST
        const params = this.props.userID ? this.props.userID : '';
        if (this.props.pathname == 'Product') {
            const posturl = this.props.userID ? `/Product/EditProduct/${params}` : '/Product/CreateProduct';

            axios({
                method: 'POST',
                url: posturl,
                data: user,
            })
                .then((response) => {
                    this.setState({
                        formClassName: 'success',
                        formSuccessMessage: response.data.msg
                    });

                    if (!this.props.userID) {
                        this.setState({
                            Name: '',
                            Price: ''
                        });
                        this.props.onUserAdded(user);
                    }
                    else {
                        this.props.onUserUpdated(params, user);
                    }

                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.data) {
                            this.setState({
                                formClassName: 'warning',
                                formErrorMessage: err.response.data.msg
                            });
                        }
                    }
                    else {
                        this.setState({
                            formClassName: 'warning',
                            formErrorMessage: 'Something went wrong. ' + err
                        });
                    }
                });
        }
        if (this.props.pathname == 'Customer' || this.props.pathname == 'Store') {
            const posturl = this.props.userID ? '/' + this.props.pathname + '/Edit' + this.props.pathname + '/' + `${params}` : '/' + this.props.pathname + '/Add' + this.props.pathname;

            axios({
                method: 'POST',
                url: posturl,
                data: cust,
            })
                .then((response) => {
                    this.setState({
                        formClassName: 'success',
                        formSuccessMessage: response.data.msg
                    });

                    if (!this.props.userID) {
                        this.setState({
                            Name: '',
                            Address: ''
                        });
                        this.props.onUserAdded(cust);
                    }
                    else {
                        this.props.onUserUpdated(params, cust);
                    }

                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.data) {
                            this.setState({
                                formClassName: 'warning',
                                formErrorMessage: err.response.data.msg
                            });
                        }
                    }
                    else {
                        this.setState({
                            formClassName: 'warning',
                            formErrorMessage: 'Something went wrong. ' + err
                        });
                    }
                });
        }

        console.log("user" + user);

    }

    render() {

        const formClassName = this.state.formClassName;
        const formSuccessMessage = this.state.formSuccessMessage;
        const formErrorMessage = this.state.formErrorMessage;

        return (
            <Form className={formClassName} onSubmit={this.handleSubmit} >
                <Form.Input
                    label='Name'
                    type='text'
                    placeholder='Elon Musk'
                    name='Name'
                    maxLength='40'
                    required
                    value={this.state.Name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label={this.props.label}
                    type={this.props.type}
                    placeholder={this.props.PH}
                    name={this.props.label}
                    maxLength={this.props.ML}
                    required
                    value={this.state.Price || this.state.Address}
                    onChange={this.handleInputChange}
                />

                <Message
                    success
                    color='green'
                    header='Updated!'
                    content={formSuccessMessage}
                />
                <Message
                    warning
                    color='yellow'
                    header='Woah!'
                    content={formErrorMessage}
                />
                <Button color={this.props.buttonColor} pathname={this.props.pathname} floated='right'>{this.props.buttonSubmitTitle}</Button>
                <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
            </Form>
        );
    }
}

export default InputForm;