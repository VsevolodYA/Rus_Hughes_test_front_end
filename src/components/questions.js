import React, { Component } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      value: ''
    };
  }

  async componentWillMount() {
    try {
      const res = await fetch('/api/questions/', { method: 'GET' });
      const questions = await res.json();
      this.setState({ questions: questions });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleOnClick(event) {
    event.preventDefault();

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: this.state.value })
      });
      const q = await res.json();

      const { questions } = this.state;

      questions.push(q);

      this.setState({ questions });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="type your question"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
              <InputGroup.Button>
                <Button type="submit" onClick={this.handleOnClick.bind(this)}>
                  add
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          <FormGroup />
        </Form>
        <ListGroup>
          {questions.map(questions => (
            <Link to={`/${questions.id}`} key={questions.id}>
              <ListGroupItem>{questions.content}</ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      </div>
    );
  }
}
