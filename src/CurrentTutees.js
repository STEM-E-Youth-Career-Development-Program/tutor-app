import "./currenttutees.css";

function TuteesTable() {
    return <>
        <div class="grey-container">
            <h2>Current Tutees</h2>
            <div class="table-container">
                <table>
                    <tr>
                        <th>STUDENT NAME</th>
                        <th>STUDENT AGE</th>
                        <th class="highlight">STUDENT GRADE LEVEL</th>
                        <th>SUBJECTS TUTORED</th>
                    </tr>
                    <tr>
                        <td>David</td>
                        <td>12</td>
                        <td>7</td>
                        <td>Math</td>
                    </tr>
                    <tr>
                        <td>Sally</td>
                        <td>13</td>
                        <td>7</td>
                        <td>Science, English</td>
                    </tr>
                    <tr>
                        <td>Emma</td>
                        <td>13</td>
                        <td>8</td>
                        <td>Math, English</td>
                    </tr>
                </table>
            </div>
            <a href="#">Edit Tutees</a>
            <p>(enables the option to add and remove tutees)</p>
        </div>
    </>
}

export default CurrentTutees;
