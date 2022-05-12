export default function GradeList ({grades}) {
    const getGrades = grades.map((grade, index) => {
        return (
            <div className="grade-wrapper" key={`grades-${index}`}>
                <p className="test-grade">Test {index + 1}</p>
                <p className="grade-percent">{grade}%</p>
            </div>
        )
    })
    return (
        <>
            {getGrades}
        </>
    )
}