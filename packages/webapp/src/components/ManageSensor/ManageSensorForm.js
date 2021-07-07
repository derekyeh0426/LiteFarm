import React, { Component } from 'react';
import { Button, Form, ModalBody, Modal, FormGroup } from 'react-bootstrap';
import client from '../../API/api';

export class ManageSensorForm extends Component {
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
      name: this.state.name === '' ? this.props.sensor.sensor_name : this.state.name,
      id: this.state.id === null ? this.props.sensor.sensor_id : this.state.id,
      lat: this.state.lat === null ? this.props.sensor.sensor_lat : this.state.lat,
      lng: this.state.lng === null ? this.props.sensor.sensor_lng : this.state.lng,
      field_id: this.state.field_id === null ? this.props.sensor.field_id : this.state.field_id,
    };
    if (
      payload.name === this.props.sensor.sensor_name &&
      payload.id === this.props.sensor.sensor_id &&
      payload.lat === this.props.sensor.sensor_lat &&
      payload.lng === this.props.sensor.sensor_lng &&
      payload.field_id === this.props.sensor.field_id
    ) {
      alert('nothing changed');
      this.handleClose();
    } else {
      client.sensor.updateSensorById(payload).then((res) => {
        this.handleClose();
      });
    }
  };

  render() {
    return (
      <div>
        <Button variant="outline-secondary" className="left-button" onClick={this.handleShow}>
          Update
        </Button>
        <Modal show={this.state.show} size="lg" onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Sensor</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form.Group controlId={'sensor name'}>
              <Form.Control
                type="text"
                onChange={this.setName}
                defaultValue={this.props.sensor.sensor_name}
              />
            </Form.Group>
            <FormGroup>
              <Form.Control
                type="text"
                onChange={this.setId}
                defaultValue={this.props.sensor.sensor_id}
              />
            </FormGroup>
            <FormGroup>
              <Form.Control
                type="text"
                onChange={this.setLatitude}
                defaultValue={this.props.sensor.sensor_lat}
              />
            </FormGroup>
            <FormGroup>
              <Form.Control
                type="text"
                onChange={this.setLonitutude}
                defaultValue={this.props.sensor.sensor_lng}
              />
            </FormGroup>
            <FormGroup>
              <Form.Control
                type="text"
                onChange={this.setFieldId}
                defaultValue={this.props.sensor.field_id}
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

export default ManageSensorForm;
