import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Doughnut } from "react-chartjs-2";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.isOutdoor === true ? "Outdoor" : "Indoor"}</td>
    <td>{props.exercise.duration} mins</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>
        <FontAwesomeIcon
          icon={faEdit}
          className="custom-icon edit-icon"
        ></FontAwesomeIcon>
      </Link>
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="custom-icon delete-icon"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      ></FontAwesomeIcon>
    </td>
  </tr>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [], usernumber: 0, exercisenumber: 0 };
  }

  componentDidMount() {
    console.log(process.env.PORT);
    axios
      .get(":80/exercises/")
      .then(res => {
        let outdoorCount = res.data.filter(item => item.isOutdoor === true)
          .length;
        this.setState({
          exercises: res.data,
          exercisenumber: res.data.length,
          outdoorCount: outdoorCount
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(":80/users/")
      .then(res => {
        this.setState({ usernumber: res.data.length });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    var answer = window.confirm("Are you sure want to delete this item?");
    if (answer) {
      axios.delete(":80/exercises/" + id).then(res => console.log(res.data));

      this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id)
      });
    }
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    const hi = {
      labels: ["Indoor", "Outdoor"],
      datasets: [
        {
          backgroundColor: ["#93B53C", "#5D95F5"],
          hoverBackgroundColor: ["#617727", "#395d9a"],
          data: [
            this.state.exercisenumber - this.state.outdoorCount,
            this.state.outdoorCount
          ]
        }
      ]
    };
    return (
      <div>
        <Row>
          <Col lg={3} className="left-col">
            <h4>Statistic</h4>
            <br />
            <h5>Users count: {this.state.usernumber}</h5>
            <h5>Exercises count: {this.state.exercisenumber}</h5>
            <br />
            <Doughnut
              data={hi}
              width={250}
              height={250}
              options={{ responsive: false }}
            ></Doughnut>
          </Col>
          <Col className="right-col">
            <h4>Exercises List</h4>
            <br />
            <Table responsive hover>
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Gerne</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.exerciseList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}
