import React from "react";
import { Form, Button, Row, Col, CardGroup, Card } from 'react-bootstrap';
import '../profile-view/profile-view.scss';

function UpdateInfo({  updateUserData, userObject, changeHandler }) {

    const { Username, Password, Email, Birthday } = userObject;

    return (
        <>
            <Row className="m-2 mx-auto">
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title className="title">Update your information:</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder='Enter your desired username'
                                            value={Username}
                                            onChange={(e) => changeHandler({ ...userObject, Username: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder='Your password must be 8 or more characters long'
                                            minLength={8}
                                            onChange={(e) => changeHandler({ ...userObject, Password: e.target.value })}
                                        />

                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={Email}
                                            placeholder='Enter your email address' 
                                            onChange={(e) => changeHandler({ ...userObject, Email: e.target.value })}
                                            />
                                    </Form.Group>

                                    <Form.Group controlId="updateBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="birthday"
                                            value={Birthday}
                                            onChange={(e) => changeHandler({ ...userObject, Birthday: e.target.value })}
                                            />

                                    </Form.Group>
                                    <Button className="button-profile" type="button" onClick={updateUserData}>Update Info</Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </>)
}

export default UpdateInfo;