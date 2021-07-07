import React, { Component } from 'react';
import { Button, Form, ModalBody, Modal } from 'react-bootstrap';
import client from '../../API/api';

export class AddSensorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      lat: null,
      lng: null,
      id: null,
      field_id: null,
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  setId = (e) => {
    this.setState({ id: e.target.value });
  };

  setLatitude = (e) => {
    this.setState({ lat: e.target.value });
  };

  setLonitutude = (e) => {
    this.setState({ lng: e.target.value });
  };

  setFieldId = (e) => {
    this.setState({ field_id: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: this.state.name,
      id: this.state.id,
      lat: this.state.lat,
      lng: this.state.lng,
      field_id: this.state.field_id === null ? this.props.field.field_id : this.state.field_id,
    };
    client.sensor.addSensor(payload).then((res) => {
      this.handleClose();
    });
  };

  render() {
    return (
      <div>
        <Button variant="outline-secondary" className="left-button" onClick={this.handleShow}>
          Add
        </Button>
        <Modal show={this.state.show} size="lg" onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sensor</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form.Group controlId={'sensor name'}>
              <Form.Control type="text" onChange={this.setName} />
            </Form.Group>
            <FormGroup>
              <Form.Control type="text" onChange={this.setId} />
            </FormGroup>
            <FormGroup>
              <Form.Control type="text" onChange={this.setLatitude} />
            </FormGroup>
            <FormGroup>
              <Form.Control type="text" onChange={this.setLonitutude} />
            </FormGroup>
            <FormGroup>
              <Form.Control
                type="text"
                onChange={this.setFieldId}
                defaultValue={this.props.field.field_id}
              />
            </FormGroup>
            <Button
              variant="outline-secondary"
              className={'left-button'}
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Close
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddSensorForm;
