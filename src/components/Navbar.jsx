import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Card from './Card';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [search, setSearch] = useState('india');
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false); 


  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const getData = async () => {
    if (!search) return;
    setLoading(true); 
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apikey=${API_KEY}`);
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getData(); 
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <nav>
        <div className='navbar'>
          <div className='logo'>
            <h1 className='logo'>Ak<span>News</span></h1>
          </div>
          <div className='search-bar'>
            <input 
              type="text" 
              placeholder='Search news...'
            
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={getData} className='btn'>Search</button>
          </div>
<div className='sign'>
   <SignedOut>
          <SignInButton className='login'/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
</div>
        </div>
      </nav>

      <div>
       
        {loading && <h1>Loading...</h1>}
        {!loading && newsData && <Card data={newsData} />}
         {!loading && newsData &&  newsData.length === 0 && <h1>Data not found</h1>}
      </div>
    </>
  );
};

export default Navbar;
