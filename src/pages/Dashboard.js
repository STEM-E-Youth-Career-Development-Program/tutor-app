import "./Dashboard.css"

function Statistics(){
    return <div className="stats-parent">
        <div>
            <h1>
                10 Unmatched Students<br />15 Avaliable Tutors
            </h1>    
        </div>
    </div>
}

function ViewButton(){
    return(
        <button>
            Test
        </button>
    );
}

function ViewBody() {
    return(
        <div className="view-parent">
            <ViewButton />
            <ViewButton />
        </div>
    );
}

export default function Dashboard() {
    return(
        <div className="top">
            <Statistics />
            <ViewBody />
        </div>
    );
}







