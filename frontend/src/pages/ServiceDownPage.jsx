import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import "./style/ServiceDownPage.css"
export default function ServiceDownPage() {

    const navigate = useNavigate()
    const isServiceAvailable = useGlobalState();

    if (isServiceAvailable.apiGatewayService && isServiceAvailable.identityService) {
        navigate("/")
        return
    } else {
        return <>
        <div className="serviceDownPage-body">
            <article id="serviceDownPage">
                <h1>We&rsquo;ll be back soon!</h1>
                <div>
                    <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you can always <a href="mailto:Saeed0code@gmail.com">contact us</a>, otherwise we&rsquo;ll be back online shortly!</p>
                    <p>&mdash; Kwetter team</p>
                </div>
            </article>
            </div>
        </>
    }
}