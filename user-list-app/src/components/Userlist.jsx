import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, incrementPage, resetUsers, setSortField, setFilterGender, setFilterCountry } from '../config/userSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, page, hasMore, sortField, filterGender, filterCountry, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(resetUsers());
    dispatch(fetchUsers(1));
  }, [sortField, filterGender, filterCountry, dispatch]);

  const fetchMoreData = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(incrementPage());
    }
  };

  const handleSort = (field) => {
    dispatch(setSortField(field));
  };

  const handleFilterGender = (event) => {
    dispatch(setFilterGender(event.target.value));
  };

  const handleFilterCountry = (event) => {
    dispatch(setFilterCountry(event.target.value));
  };

  const sortedAndFilteredUsers = users
    .filter(user => (filterGender ? user.gender === filterGender : true))
    .filter(user => (filterCountry ? user.country === filterCountry : true))
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-4 flex space-x-4 items-center">
        <label>
          Sort by:
          <select onChange={(e) => handleSort(e.target.value)} className="ml-2">
            <option value="">Select</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </label>
        <label>
          Filter by Gender:
          <select onChange={handleFilterGender} className="ml-2">
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Filter by Country:
          <select onChange={handleFilterCountry} className="ml-2">
            <option value="">All</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
          </select>
        </label>
      </div>
      <InfiniteScroll
        dataLength={sortedAndFilteredUsers.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/12 py-2 px-3">ID</th>
              <th className="w-2/12 py-2 px-3">Image</th>
              <th className="w-2/12 py-2 px-3">Full Name</th>
              <th className="w-2/12 py-2 px-3">Demography</th>
              <th className="w-3/12 py-2 px-3">Designation</th>
              <th className="w-2/12 py-2 px-3">Location</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedAndFilteredUsers.map((user) => (
              <tr key={user.id} className="bg-gray-100">
                <td className="py-2 px-3">{user.id}</td>
                <td className="py-2 px-3"><img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-10 h-10 rounded-full" /></td>
                <td className="py-2 px-3">{user.firstName} {user.lastName}</td>
                <td className="py-2 px-3">{user.gender}/{user.age}</td>
                <td className="py-2 px-3">{user.company.title}</td>
                <td className="py-2 px-3">{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
