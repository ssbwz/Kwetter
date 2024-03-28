import { useEffect } from "react";
import { useCookies } from "react-cookie";

function HomePage() {
    const [cookies, setCookie] = useCookies(['token'])

    if (cookies.token) {
        return <>
            {cookies.token}
        </>
    } else
        return <> login pls</>
}

export default HomePage;