import { useEffect, useState } from 'react'
import axios from 'axios';

const UserData = () => {

    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
            setUserData(response.data);
            setFilteredData(response.data);
        }

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1)
        if (e.target.value === '') {
            setFilteredData(userData)
        } else {
            setFilteredData(userData.filter(user => user.title.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.length > 0) {
            setFilteredData(userData.filter(user => user.title.toLowerCase().includes(searchTerm.toLowerCase())))
        } else {
            setFilteredData(userData);
        }

        setCurrentPage(1)
    }

    return (
        <div className='container mx-auto px-4'>
            <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 m-4 p-4 bg-gray-100'>
                <input value={searchTerm} type="text" placeholder='search here..' className='w-[70%] rounded-lg p-3' onChange={handleSearchChange} />
                <button type='submit' className='bg-gray-400 cursor-pointer p-3 px-4 rounded-lg'>Search</button>
            </form>
            <table className='min-w-full divide-y divide-gray-200 mt-4'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Id</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>userId</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Completed</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {
                        currentItems.map((user) => (
                            <tr key={user.id}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.userId}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.title}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{JSON.stringify(user.completed)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex items-center justify-between py-4">

                <button className='bg-red-600 p-4 cursor-pointer rounded-lg px-6 disabled:cursor-auto disabled:opacity-80' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button className='bg-green-600 p-4 cursor-pointer rounded-lg px-6 disabled:cursor-auto disabled:opacity-80' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default UserData