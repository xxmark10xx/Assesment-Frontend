export default function AverageScore ({studentScores}) {
    let total = 0;

    studentScores.map((grades, i) => {
        return total += Number(grades)
    })
    
    let avg = total/studentScores.length

    
    return (
        <div className="info-container">
            <p className="studentInfo">Average: {avg}</p>
        </div>
    )
}