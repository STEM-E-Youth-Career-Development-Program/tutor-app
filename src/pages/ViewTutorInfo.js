import "./ViewTutorInfo.css";

function LeftStats(){
    return <>
        <div className="tutor-stats-parent">
            <p1><b>Status: </b><p2>currently tutoring</p2></p1>
            <br></br>
            <a href="mailto:info@steme.org"><p4>CHANGE STATUS</p4></a>
            <br></br>
            <br></br>
            <b>Age: </b> 17
            <br></br>
            <br></br>
            <b>Subjects: </b> Science, Math
            <br></br>
            <br></br>
            <b>Virtual or In-Person: </b> Virtual
            <br></br>
            <br></br>
            <b>Contact Information: </b>abc@gmail.com
            <br></br>
            <a href="mailto:info@steme.org"><p3>SEND AN EMAIL</p3></a>
            <br></br>
            <br></br>
            <b>Number of Tutees: </b>3
            <br></br>
            <br></br>
            <b>Availibility </b>
        </div>
    </>
}



function ViewTutorInfo(){
    return <>
        <h1 className="view-tutor-info-h2"><p5>[Tutor Name]</p5></h1>
        <div className="view-tutor-info-box">
        <LeftStats />
        </div>
        </>


}

export default ViewTutorInfo;