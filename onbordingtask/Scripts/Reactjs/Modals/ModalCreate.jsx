import React, { Component } from 'react';
import { Button, Modal, } from 'semantic-ui-react';
import { labelPostion } from 'semantic-ui-css';

import InputForm from '../Modals/Inputform.jsx';

class ModalCreate extends Component {

    render() {
        return (
            <Modal
                trigger={<Button color={this.props.buttonColor}><i className={this.props.buttonIcon}></i>{this.props.buttonTriggerTitle}</Button>}
                size='tiny'
                closeIcon='close'>
                <Modal.Header>{this.props.headerTitle}</Modal.Header>
                <Modal.Content>
                    <InputForm
                        buttonSubmitTitle={this.props.buttonSubmitTitle}
                        buttonColor={this.props.buttonColor}
                        userID={this.props.userID} pathname={this.props.pathname}
                        onUserAdded={this.props.onUserAdded}
                        onUserUpdated={this.props.onUserUpdated}
                        server={this.props.server}
                        socket={this.props.socket} label={this.props.label}
                        type={this.props.type}
                        name={this.props.label}
                        ML={this.props.ML}
                    />
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModalCreate;