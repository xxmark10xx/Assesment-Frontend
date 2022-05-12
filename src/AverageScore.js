export default function AverageScore ({studentScores}) {
    let total = 0;

    studentScores.map((grades, index) => {
        return <p key={`{grade-$index}`}>{total += Number(grades)}</p>
    })
    
    let avg = total/studentScores.length

    
    return (
        <div className="info-container">
            <div className="student-info">
                <p className="content">Average: {avg}%</p>
            </div>
        </div>
    )
}