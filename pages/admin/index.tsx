import AuthCheck from "../../components/AuthCheck";

export default function AdminPostsPage(props) {
    return (
        <main>
            <AuthCheck>
                Hi
            </AuthCheck>
        </main>
    )
}
