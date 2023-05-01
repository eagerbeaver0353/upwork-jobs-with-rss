import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import "../../scss/main.css";
import { signOut } from "../../actions/authActions";

class LogOutModal extends Component {

    render() {
        return (
            <>
            <Modal show={this.props.show} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="h3 font-weight-normal">{this.props.title}</Modal.Title>
                </Modal.Header> 
                <Modal.Body className="text-muted">
                    {this.props.content}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-primary text-white" onClick={this.props.signOut}>Sign Out</Button>
                    <Button variant ="secondary" className="text-white" onClick={this.props.toggleModal}>Close</Button>
                </Modal.Footer>
          </Modal> 
          </> 
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(signOut()) };
};

export default connect(null, mapDispatchToProps) (LogOutModal);
