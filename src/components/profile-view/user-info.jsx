import React from "react";
import propTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';


function UserInfo({ email, username, birthday }) {

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
                        <Card.Text>
                            <b> Birthday:</b> {birthday}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default UserInfo;

UserInfo.propTypes = {
    username: propTypes.string,
    email: propTypes.string,
    birthday: propTypes.string
}