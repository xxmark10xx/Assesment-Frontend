 import './App.css';
import React, { useState, useEffect } from "react"
import DisplayStudents from "./DisplayStudents"
import axios from "axios"


// getting data from api and setting it to a variable
const apiData = "https://api.hatchways.io/assessment/students"

function App() {
  // Setting the state to pass data as props{
  const [ studentData, setStudentData ] = useState([])

  const [ search, setSearch ] = useState("")


  const getStudentData = () => {
    axios.get(apiData)
    .then(response => {
      const studentArr = response.data.students 
      // mutating saved api data 
        studentArr.forEach(student => {
          student.fullName = `${student.firstName} ${student.lastName}`
        })
        setStudentData(studentArr)
      })
      .catch(err => console.error(err))
  }

  console.log(studentData)

  useEffect(getStudentData, [])


  const handleChange = (e) => {
      setSearch(e.target.value)
  }

  const getFilteredStudentsFirst = () => {
    let searchTerm = search.toLowerCase()
    return studentData.filter(student => {
        let lowerCaseFirstName = student.fullName.toLowerCase()
        return lowerCaseFirstName.includes(searchTerm)
    })
  }
 
  const filteredFirstName = getFilteredStudentsFirst()
  
  return (
    <div className="App">
      <div>
        <DisplayStudents students={filteredFirstName} />
      </div>
      <div className="info-container">
        <input
          placeholder="Search by name"
          className="student-search"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
