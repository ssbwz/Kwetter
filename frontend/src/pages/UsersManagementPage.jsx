import { useEffect, useState } from "react"
import IdentitiesServer from "../services/IdentitiesServer"
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';


function UsersManagementPage() {

    const [identities, setIdentities] = useState([]);
    const [pageNumber, setPageNumber] = useState();

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
        }).catch((err) => {
            console.log(err.stack)
        })

    }

    async function deleteIdentity(e, email) {
        e.preventDefault();
        const deleteIdentityRequest = {
            email: email
        }
        await IdentitiesServer.deleteIdentity(deleteIdentityRequest)
        getIdentities(e, pageNumber)
    }

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

export default UsersManagementPage;