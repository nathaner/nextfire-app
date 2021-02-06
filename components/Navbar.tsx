import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "../lib/context"

export default function Navbar() {
    const { user, username } = useContext(UserContext)

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