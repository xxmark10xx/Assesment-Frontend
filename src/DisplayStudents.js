import { useState } from "react"
import "./App.css"
import AverageScore from "./AverageScore"
import GradeList from "./GradeList"
 
export default function DisplayStudents({student}) {
  const [ open, setOpen ] = useState(false)

  const handleOnClick = () => {
    setOpen(!open)
  }
  return(
    <>
      <div> 
          <div onClick={handleOnClick} className='outter-container'>
            <div className='student-container'>
              <div className="img-and-name">
                <div>
                  <img className='img' src={student.pic} alt={`student-portrait-${student.firstName}`} />
                </div>
                <div className='fullname-container'>
                  <div className="name-conatiner">
                    <h2 className='firstName'>{student.firstName}</h2>
                    <h2 className='lastName'>{student.lastName}</h2>
                  </div> 
                  <div className='wrapper-inner-container'>
                    <p className='content'>Email: {student.email}</p>
                    <p className='content'>Company: {student.company}</p>
                    <p className='content'>Skill: {student.skill}</p>
                    <AverageScore studentScores={student.grades} />
                    <div className="test-scores">
                      {open ? <GradeList grades={student.grades}/> : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="open-wrapper">
                  <div className="line-horizontal"></div>
                  {open ? <div className="line-vertical" style={{visibility: 'hidden'}}></div>  : <div className="line-vertical"></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}