import "./ViewTutorInfo.css";

function Availability(){
    return <> 
        <div class="availability-table">
            <table>
                <tr className="day-headings">
                    <th scope="col"></th>
                    <th scope="col">Mon</th>
                    <th scope="col">Tue</th>
                    <th scope="col">Wed</th>
                    <th scope="col">Thu</th>
                    <th scope="col">Fri</th>
                    <th scope="col">Sat</th>
                    <th scope="col">Sun</th>
                </tr>
                <tr>
                    <th scope="row">Morning</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">Afternoon</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">Evening</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </>
}

function AvailabilityChart() {
    return (
        <div className="Headings">
            <div className="heading-item available">Available</div>
            <div className="heading-item unavailable">Unavailable</div>
        </div>
    );
}


function ViewTutorInfo() {
    return (
        <>
            <Availability />
            <AvailabilityChart />
        </>
    );
}

export default ViewTutorInfo;
