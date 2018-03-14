import React, { Component } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  FormControl,
  InputGroup,
  PageHeader
} from 'react-bootstrap';

export default class Answers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      value: '',
      question: ''
    };
  }

  async componentWillMount() {
    const { match: { params: { id } } } = this.props;

    try {
      const res = await fetch(`/api/questions/${id}/answers`, {
        method: 'GET'
      });
      const answers = await res.json();
      this.setState({ answers });
    } catch (e) {
      console.log(e);
    }

    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'GET'
      });
      const question = await res.json();
      this.setState({ question: question.content });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleOnClick(event) {
    const { match: { params: { id } } } = this.props;
    event.preventDefault();

    try {
      const res = await fetch(`/api/questions/${id}/answers`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: this.state.value })
      });
      const a = await res.json();

      const { answers } = this.state;

      this.setState({ answers });
      answers.push(a);

      this.setState({ answers });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { answers } = this.state;
    return (
      <React.Fragment>
        <PageHeader>{this.state.question}</PageHeader>
        <Form>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="type your answer"
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
          {answers &&
            answers.length > 0 &&
            answers.map(answer => (
              <ListGroupItem className="answers" key={answer.id}>
                {answer.content}
              </ListGroupItem>
            ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}
