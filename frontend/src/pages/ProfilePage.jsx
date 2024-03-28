import { useEffect, useState } from "react";
import profilesServer from "../services/ProfilesServer"

function ProfilePage() {
    const [profile, setProfile] = useState()

    useEffect(() => {
        profilesServer.getUserById(1).then((res) => {
            setProfile(res.data)
        }).catch((err) => {
            console.log(err.stack)
        })

    }, [])

    if (!profile) {
        return <>loading...</>
    } else {
        return <>
            id: {profile.id}, Name: {profile.name}, Description: {profile.description},
        </>
    }
}

export default ProfilePage;