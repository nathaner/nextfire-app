import Link from "next/link"

export default function Navbar() {
    const user = true;
    const username = true;

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>

                {
                    username && (
                        <>
                            <li>
                                <Link href="/admin">
                                    <button className="push-left">Write post</button>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${username}`}>
                                    <img src={user?.photoUrl} />
                                </Link>
                            </li>
                        </>
                    )
                }
                {
                    !username && (
                        <li>
                            <Link href="/enter">
                                <button className="btn-blue">Log in</button>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}