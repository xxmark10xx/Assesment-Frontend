 import './App.css';
import React, { useState, useEffect } from "react"
import DisplayStudents from "./DisplayStudents"
import axios from "axios"


// getting data from api and setting it to a variable
const apiData = "https://api.hatchways.io/assessment/students"

function App() {
  // Setting the state to pass data as props
  const [ studentData, setStudentData ] = useState([])
  const [ search, setSearch ] = useState("")
  const [ tag, setTag ] = useState([])
  const [ tagSearch, setTagSearch ] = useState("")

  // fetching data from api
  const getStudentData = () => {
    axios.get(apiData)
    .then(response => {
      const studentArr = response.data
      // mutating saved api data for fullname and tag
        studentArr.students.forEach(student => {
          student.fullName = `${student.firstName} ${student.lastName}`
          student.tag = []
        })
        setStudentData(studentArr.students)
      })
      .catch(err => console.error(err))
  }

  // rendering the fetch once
  useEffect(getStudentData, [])

  // adding the tag to tag array in the studentData
  const addTag = (str, index) => {
    const studentTag = [...studentData]
    studentTag[index].tag.push(str)
  }

  // handling search by name
  const handleChange = (e) => {
      setSearch(e.target.value)
  }
  // handling search by tag
  const handleTagChange = (e) => {
    setTagSearch(e.target.value)
  }

  // filtering students by name
  const getFilteredStudent = () => {
    let searchTerm = search.toLowerCase()
    return studentData.filter(student => {
        let lowerCaseFirstName = student.fullName.toLowerCase()
        return lowerCaseFirstName.includes(searchTerm)
    })
  }

  // filtering students by tag
  const getFilteredStudentTag = () => {
    let searchTerm = tagSearch.toLowerCase()
    let searchArray = []
    let exsitingTag = false

    studentData.forEach(student => {
      student.tag.forEach(tag => {
        if(tag.toLowerCase().includes(searchTerm)) {
          exsitingTag = true
        }
      })
      if(!searchTerm || exsitingTag) {
        searchArray.push(student)
      }
    })
    return searchArray
  }

  // variables for calling filtered students and tag function, and array
  const filteredStudent = getFilteredStudent()
  const filteredTag = getFilteredStudentTag()
  const studentNameAndTag = []

  // fill the new array based on filter
  filteredStudent.forEach((student) => {
    if(filteredTag.includes(student)) {
      studentNameAndTag.push(student)
    }
  })

  // mapping student filtered array to pass down as props
  const studentList = studentNameAndTag.map((student, index) => {
    return <DisplayStudents student={student} index={index} tag={tag} setTag={setTag} addTag={addTag} key={`student-info-${index}`}/>
  })
  
  return (
    <div className="most-outter-container">
      <div className="container-holder">
        <div className="search-container">
          <label htmlFor="student-search"></label>
          <input
            placeholder="Search by name"
            id="student-search"
            type="text"
            value={search}
            onChange={handleChange}
          />
        </div>
          
        <div className='search-container'>
          <label htmlFor="student-search"></label>
          <input
            placeholder="Search by tag"
            id="student-search"
            type="text"
            value={tagSearch}
            onChange={handleTagChange}
          />
        </div>

        {/* css for the student info card */}
        <div className="student-card-container"> 
          {studentList}
        </div>
      </div>
    </div>
  );
}

export default App;
