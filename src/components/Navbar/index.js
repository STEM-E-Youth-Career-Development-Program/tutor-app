import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    const exampleStudentId = "leFaNrKmmcXWjr6RvIPb";

    return <>
        <nav className="navbar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/view-tutors">Tutor List</Link></li>
                <li><Link to="/view-students">Student List</Link></li>
                {/*<img src = 'https://media.discordapp.net/attachments/814358449386160158/1224176088578789396/image.png?ex=661c89d3&is=660a14d3&hm=b0c4e075f28108bf49ce36b41364da96435185b9e5936f2a86d55d655a851e63&=&format=webp&quality=lossless&width=429&height=172' alt='STEM-E logo'></img>*/}
                {user && 
                    <li className="float-right" onClick={() => {
                        setUser(undefined)
                        navigate("/")
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url
                    }}><a href="javascript:void(0)">Logout</a></li>
                }
            </ul>
        </nav>
    </>
}

