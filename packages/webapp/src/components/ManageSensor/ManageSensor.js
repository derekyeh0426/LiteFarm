import React, { Component } from 'react';
import { Button, Form, ModalBody, Modal, Col, Row } from 'react-bootstrap';
import client from '../../API/api';

export class ManageSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectFarm: null,
      farms: [],
      sensors: [],
    };
  }

  handleShow = () => {
    this.setState({ show: true, selectFarm: null });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    client.farm.getMyFarms().then((res) => {
      this.setState({ farms: res.data });
    });
  }

  setFarm = (e) => {
    let farmId = e.target.value.farm_id;
    this.setState({ selectFarm: e.target.value.farm_name });
    client.sensorClient.getSensorsByFarmId(farmId).then((res) => {
      this.setState({ sensors: res.data });
    });
  };

  handleDelete = (e, id, index) => {
    e.preventDefault();
    let newSensors = this.state.sensors;
    client.sensor.deleteSensorById(id).then((res) => {
      newSensors.splice(index, 1);
      this.setState({ sensors: newSensors });
    });
  };

  render() {
    return (
      <div>
        <Button variant="light" onClick={this.handleShow}>
          <text style={{ color: 'darkgrey' }}> Manage Sensors</text>
        </Button>
        <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Manage Your Sensors</Modal.Title>
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
            {this.state.sensors.map((sensor, index) => {
              return (
                <div>
                  <Row>
                    <Col sm={8}>Field: {sensor.field_id}</Col>
                    <Col sm={2}>
                      <ManageSensorForm sensor={sensor} />
                    </Col>
                    <Col sm={2}>
                      <Button
                        onClick={(e) => {
                          this.handleDelete(e, sensor.sensor_id, index);
                        }}
                        variant={'outline-danger'}
                      >
                        {' '}
                        Delete
                      </Button>
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

export default ManageSensor;
