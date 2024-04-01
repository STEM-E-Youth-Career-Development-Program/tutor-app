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

function ViewButton1(){
    return(
        <button>
            View Tutors
        </button>
    );
}

function ViewButton2(){
    return(
        <button>
            View Students
        </button>
    );
}

function ViewBody() {
    return(
        <div className="view-parent">
            <ViewButton1 />
            <ViewButton2 />
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







