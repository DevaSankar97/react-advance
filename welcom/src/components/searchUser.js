import { useEffect, useState } from "react"
import SampleUsers from '../utils/users.json'

function SearchUsers() {
    const [allUsers] = useState([...SampleUsers])
    const [users, setUsers] = useState([...SampleUsers])
    const [searchData,setSearchData] = useState('')
    // const handleInput = (e) => { 
    //     setSearchData(e.target.value);
    //  }
    const handleSearch = (e) => {
        const filterData = searchData ==='' ?  allUsers : allUsers.filter(user=>{ return user.name.toLowerCase().includes(searchData.toLowerCase())})
        setUsers(filterData)
     }
    const handleEidt = (e) => { }
    const handleDelete = (e) => { }
    useEffect(()=>{
        handleSearch();
    },[searchData])
    return (
        <>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-space-between align-items-center mb-3">
                            <input className="form-control" name="search" onChange={(e) => {setSearchData(e.target.value) }} placeholder="Search By Name" />
                            {/* <button className="btn btn-primary ms-2" onClick={(e)=>{handleSearch(e)}}>Search</button> */}
                        </div>
                        {
                            users && <>
                                <table className="table table-bordered align-middle">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user,i) => (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={()=>{handleEidt(user.id)}}><i className="bi bi-pencil"></i></button>
                                                    <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(user.id)}}><i className="bi bi-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUsers;