import "./index.css"

export default function NavBar() {
    return <>
        <nav className="navbar">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/">Tutor List</a></li>
                <li><a href="/">Student List</a></li>
                {/*<img src = 'https://media.discordapp.net/attachments/814358449386160158/1224176088578789396/image.png?ex=661c89d3&is=660a14d3&hm=b0c4e075f28108bf49ce36b41364da96435185b9e5936f2a86d55d655a851e63&=&format=webp&quality=lossless&width=429&height=172' alt='STEM-E logo'></img>*/}
            </ul>
        </nav>
    </>
}