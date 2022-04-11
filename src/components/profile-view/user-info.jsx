import React from "react";

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';


function UserInfo({ email, username }) {

    return (
        <Row className="m-2 mx-auto">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="title">Your Info</Card.Title>
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