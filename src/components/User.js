import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
export const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  const searchUser = (e) => {
    let searchText = e.target.value.toLowerCase();
    if (searchText.length > 0) {
      if (!isNaN(searchText)) {
        console.log("Entro a numeros")
        fetch(`https://jsonplaceholder.typicode.com/todos/${searchText}`)
          .then((response) => response.json())
          .then((data) => setUsers([data]));
      } else {
        console.log("Esta en letras")
        let usersFilter = users.filter((item) => {
          return item.title.includes(searchText);
        });
        setUsers(usersFilter)
      }
    } else {
      getAllUsers();
    }

    // console.log(searchText);
  };
  return (
    <Container>
      <Form.Control type="text" placeholder="Buscador" onChange={searchUser} className="mb-4"/>
      <Row>
        {users.map((item) => {
          return (
            <Col xs={12} md={4} lg={3} key={item.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{item.id}</Card.Title>
                  <Card.Text>{item.title}</Card.Text>
                </Card.Body>
              </Card>
              {/* {`${item.id}-${item.title}`} */}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
