import './Planner.css';
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ComputingSystemsPlanner from "./ComputingSystemsPlanner"
import BasicTable from "./BasicTable.js";

function Planner() {
  const [reviews, setReviews] = useState([])
  const [specialization, setSpecialization] = useState('')
  const [chosenCourseList, setChosenCourseList] = useState([]);

  const addToCourseList = (row) => {
    if (chosenCourseList.find(course => course.id === row.id)) {
      setChosenCourseList(chosenCourseList.filter(course => course.id !== row.id))
    } else {
      setChosenCourseList(chosenCourseList.concat(row))
    }
  }
  
  const fetchReviews = () => {
    fetch("https://www.omscentral.com/_next/data/RbJpKU_7gp7Gm26pP9748/index.json")
    .then(response => response.json())
    .then(data => setReviews(data?.pageProps?.courses))
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div className="Planner">
      <h2>Pick a specialization to begin:</h2>
      <Form.Select size="lg" onChange={(event) => setSpecialization(event.target.value)}>
        <option>Choose your specialization</option>
        <option value="Computation Perception & Robotics">Computation Perception & Robotics</option>
        <option value="Computing Systems">Computing Systems</option>
        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
        <option value="Interactive Intelligence">Interactive Intelligence</option>
        <option value="Machine Learning">Machine Learning</option>
      </Form.Select>
      { specialization === "Computing Systems" && <ComputingSystemsPlanner courses={reviews} addToCourseList={ addToCourseList } /> }
      <h1>Chosen Course Plan:</h1>
      <BasicTable rows={ chosenCourseList } />
    </div>
  );
}

export default Planner;