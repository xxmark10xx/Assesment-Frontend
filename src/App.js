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
      const studentArr = response.data
      // mutating saved api data 
        studentArr.students.forEach(student => {
          student.fullName = `${student.firstName} ${student.lastName}`
        })
        setStudentData(studentArr.students)
      })
      .catch(err => console.error(err))
  }
  
  

  useEffect(getStudentData, [])


  const handleChange = (e) => {
      setSearch(e.target.value)
  }

  const getFilteredStudent = () => {
    let searchTerm = search.toLowerCase()
    return studentData.filter(student => {
        let lowerCaseFirstName = student.fullName.toLowerCase()
        return lowerCaseFirstName.includes(searchTerm)
    })
  }

  const filteredStudent = getFilteredStudent()

  const studentList = filteredStudent.map((student, index) => {
    return <DisplayStudents student={student}  key={`student-info-${index}`}/>
  })
  
  return (
    <div className="most-outter-wrapper">
      <div className="wrapper-holder">
        <div className="search-wrapper">
          <label htmlFor="student-search"></label>
          <input
            placeholder="Search by name"
            id="student-search"
            type="text"
            value={search}
            onChange={handleChange}
          />
          {/* css for the student info card */}
        <div className="student-card-wrapper"> 
          {studentList}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
