import React from "react";

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';


function UserInfo({ email, username }) {

    return (
            <Row className="m-2 mx-auto">
                <Col>
                    <Card>
                        <Card.Title className="m-2 mx-auto">Your Info</Card.Title>
                        <Card.Body>
                            <Card.Text>
                                <b> Username:</b> {username}
                            </Card.Text>
                            <Card.Text>
                                <b> Email:</b> {email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    )
}

export default UserInfo;