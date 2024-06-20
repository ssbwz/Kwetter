import { useEffect, useState } from "react"
import IdentitiesServer from "../services/IdentitiesServer"
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import { useGlobalState, useGlobalStateUpdate } from '../GlobalState'


function UsersManagementPage() {

    const [identities, setIdentities] = useState([]);
    const [pageNumber, setPageNumber] = useState();
    const isServiceAvailable = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [areNeededServersDown, setAreNeededServersDown] = useState(false);

    useEffect(() => {
        getIdentities(null, 1)
    }, [])

    function getIdentities(e, pageNum) {
        if (e)
            e.preventDefault();

        const getAllIdentitiesRequest = {
            pageNumber: pageNum
        }
        IdentitiesServer.getAllIdentities(getAllIdentitiesRequest).then((res) => {
            if (res.data.identities.length === 0) {
                getIdentities(e, pageNumber)
                return
            }
            setIdentities(res.data.identities)
            setPageNumber(getAllIdentitiesRequest.pageNumber)
            if (!isServiceAvailable.tweetService ||
                !isServiceAvailable.profileService ||
                !isServiceAvailable.identityService ||
                !isServiceAvailable.apiGatewayService) {
                setAreNeededServersDown(true)
            } else
                setAreNeededServersDown(false)
        }).catch((error) => {
            if (error.response.status === 502) {
                setGlobalState({
                    identityService: false,
                    profileService: true,
                    tweetService: isServiceAvailable.tweetService,
                    apiGatewayService: isServiceAvailable.apiGatewayService,
                })
                setAreNeededServersDown(true)
            }
        })

    }

    async function deleteIdentity(e, email) {
        e.preventDefault();
        const deleteIdentityRequest = {
            email: email
        }



        if (isServiceAvailable.tweetService &&
            isServiceAvailable.profileService &&
            isServiceAvailable.identityService &&
            isServiceAvailable.apiGatewayService) {
            await IdentitiesServer.deleteIdentity(deleteIdentityRequest).catch(error => {
                if (error.response.status === 502) {
                    setGlobalState({
                        identityService: false,
                        profileService: true,
                        tweetService: isServiceAvailable.tweetService,
                        apiGatewayService: isServiceAvailable.apiGatewayService,
                    })
                    setAreNeededServersDown(true)
                }
            })
        } else {
            setAreNeededServersDown(true)
            alert("Sorry this feature is not available at this momment")
        }


        getIdentities(e, pageNumber)
    }


    const identitiesRows = areNeededServersDown ? <>
        {identities.map((item, index) => (
            <tr id="userrow" key={index}>
                <td> {item.id}</td>
                <td> {item.email}</td>

                <td>{item.registerMethod}</td>
                <td>{item.role}</td>
                <td>
                    <MDBBtn disabled onClick={e => deleteIdentity(e, item.email)} color='link' rounded size='sm'>
                        Delete
                    </MDBBtn>
                </td>
            </tr>
        ))}

    </> : <>
        {identities.map((item, index) => (
            <tr id="userrow" key={index}>
                <td> {item.id}</td>
                <td> {item.email}</td>

                <td>{item.registerMethod}</td>
                <td>{item.role}</td>
                <td>
                    <MDBBtn onClick={e => deleteIdentity(e, item.email)} color='link' rounded size='sm'>
                        Delete
                    </MDBBtn>
                </td>
            </tr>
        ))}

    </>

    if (isServiceAvailable.identityService === true) {
        return <>
            <Container>
                <MDBTable>
                    <MDBTableHead>
                        <tr id="userheader">
                            <th scope='col'>Id</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Register Method</th>
                            <th scope='col'>Role</th>
                            <th scope='col'></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {identitiesRows}
                    </MDBTableBody>
                </MDBTable>


                <nav aria-label='Page navigation example' className=" d-flex justify-content-center" >
                    <MDBPagination className='mb-0'>
                        <MDBPaginationItem>
                            <MDBPaginationLink onClick={e => getIdentities(e, pageNumber - 1)}>Previous</MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                            <MDBPaginationLink >{pageNumber}</MDBPaginationLink>
                        </MDBPaginationItem>
                        <MDBPaginationItem>
                            <MDBPaginationLink onClick={e => getIdentities(e, pageNumber + 1)}>Next</MDBPaginationLink>
                        </MDBPaginationItem>
                    </MDBPagination>
                </nav>
            </Container>
        </>
    }
    else if (isServiceAvailable.identityService === false) {
        return <>
            Sorry this feature is temporarily unavailable
        </>
    }
    else if (identities.length === 0) {
        return <>
            loading
        </>
    }

}

export default UsersManagementPage;