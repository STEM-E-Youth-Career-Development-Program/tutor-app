function Availability({ availability }){
    const isAvailable = (day, time) => {
        return availability[3*day+time];
    }

    const getClassName = (day, time) => {
        return isAvailable(day, time) ? "available" : "unavailable";
    }

    return <> 
        <div className="availability-table">
            <table>
                <thead>
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
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Morning</th>
                        <td className={getClassName(1,0)}></td>
                        <td className={getClassName(2,0)}></td>
                        <td className={getClassName(3,0)}></td>
                        <td className={getClassName(4,0)}></td>
                        <td className={getClassName(5,0)}></td>
                        <td className={getClassName(6,0)}></td>
                        <td className={getClassName(0,0)}></td>
                    </tr>
                    <tr>
                        <th scope="row">Afternoon</th>
                        <td className={getClassName(1,1)}></td>
                        <td className={getClassName(2,1)}></td>
                        <td className={getClassName(3,1)}></td>
                        <td className={getClassName(4,1)}></td>
                        <td className={getClassName(5,1)}></td>
                        <td className={getClassName(6,1)}></td>
                        <td className={getClassName(0,1)}></td>
                    </tr>
                    <tr>
                        <th scope="row">Evening</th>
                        <td className={getClassName(1,2)}></td>
                        <td className={getClassName(2,2)}></td>
                        <td className={getClassName(3,2)}></td>
                        <td className={getClassName(4,2)}></td>
                        <td className={getClassName(5,2)}></td>
                        <td className={getClassName(6,2)}></td>
                        <td className={getClassName(0,2)}></td>
                    </tr>
                </tbody>
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

export default function AvailabilityTable({ availability }) {
    return <>
        <Availability availability={availability} />
        <AvailabilityChart />
    </>
}