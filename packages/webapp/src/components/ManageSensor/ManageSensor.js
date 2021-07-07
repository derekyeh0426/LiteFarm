import React, { Component } from 'react';
import { Button, Form, ModalBody, Modal, Col, Row, Container } from 'react-bootstrap';
import client from '../../API/api';

export class ManageSensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      fields: [],
      selectFarm: null,
      farms: [],
      sensors: [],
      selectField: null,
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
    let farmId = e.target.value.id;
    this.setState({ selectFarm: e.target.value.name });
    client.sensorClient.getSensorById(farmId).then((res) => {
      this.setState({ fields: res.data });
    });
  };

  setField = (e) => {
    this.setState({ selectField: e.target.value.name });
    client.field.getFieldsByFarmId(farmId).then((res) => {
      this.setState({ fields: res.data });
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
                  <option key={farm.id} value={farm} data-key={farm.name}>
                    {farm.name}
                  </option>
                );
              })}
            </Form.Control>
            <br />
            <Form.Control onClick={this.setFarm} as="select" single>
              <option>Select your farm</option>
              {this.state.fields.map((field) => {
                return (
                  <option key={field.id} value={farm} data-key={field.name}>
                    {field.name}
                  </option>
                );
              })}
            </Form.Control>
            {this.state.fields.map((post, index) => {
              if (!this.state.filterTopic || this.state.filterTopic == post.topic.name) {
                return (
                  <div>
                    <Row>
                      <Col sm={8}>{toTitleCase(post.title)}</Col>
                      <Col sm={2}>
                        <UpdatePostModalForm post={post} />
                      </Col>
                      <Col sm={2}>
                        <Button
                          onClick={(e) => {
                            this.handleDelete(e, index);
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
              }
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
