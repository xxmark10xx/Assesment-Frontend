import "./App.css"
import AverageScore from "./AverageScore"
 
export default function DisplayStudents(props) {
    const studentList = props.students.map((student, i) => {
        return(
            <div className="studentInfo-container" key={`studentData-${i}`}>
                <div className="image-container">
                    <img className="image" src={student.pic} alt="profile-pic"/>
                </div>
                <div className="info-container">
                    <h1 className="studentName">{student.firstName}</h1>
                    <h1 className="studentName">{student.lastName}</h1>
                    <p className="studentInfo">Email: {student.email}</p>
                    <p className="studentInfo">Company: {student.company}</p>
                    <p className="studentInfo">Skill: {student.skill}</p>
                    <AverageScore studentScores={student.grades} />
                </div>
            </div>
        )
    })
    return(
        <>
            <ul>
                {studentList}
            </ul>
        </>
    )
}