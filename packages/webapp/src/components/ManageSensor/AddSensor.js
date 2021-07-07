import React, { Component } from 'react';
import { Button, Form, ModalBody, Modal, Col, Row } from 'react-bootstrap';
import client from '../../API/api';
import AddSensorForm from './AddSensorForm';

export class AddSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectFarm: null,
      farms: [],
      fields: [],
    };
  }

  handleShow = () => {
    this.setState({ show: true, selectFarm: null });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  setFarm = (e) => {
    let farmId = e.target.value.farm_id;
    this.setState({ selectFarm: e.target.value.farm_name });
    client.field.getFieldsByFarmId(farmId).then((res) => {
      this.setState({ fields: res.data });
    });
  };

  componentDidMount() {
    client.farm.getMyFarms().then((res) => {
      this.setState({ farms: res.data });
    });
  }

  render() {
    return (
      <div>
        <Button variant="light" onClick={this.handleShow}>
          <text style={{ color: 'darkgrey' }}> Add Sensors</text>
        </Button>
        <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Sensors</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form.Control onClick={this.setFarm} as="select" single>
              <option>Select your farm</option>
              {this.state.farms.map((farm) => {
                return (
                  <option key={farm.farm_id} value={farm} data-key={farm.farm_name}>
                    {farm.farm_name}
                  </option>
                );
              })}
            </Form.Control>
            <br />
            {this.state.fields.map((field) => {
              return (
                <div>
                  <Row>
                    <Col sm={8}>Field Name: {field.field_name}</Col>
                    <Col sm={8}>Field Id: {field.field_id}</Col>
                    <Col sm={2}>
                      <AddSensorForm field={field} />
                    </Col>
                  </Row>
                  <br />
                </div>
              );
            })}
          </ModalBody>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Exit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddSensor;
