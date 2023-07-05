import React from 'react';
import {logo} from './assets';
import {logox} from './assets';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import { Home, CreatePost} from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex text-bold justify-between bg-white items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <div className='flex'>
            <img src={logox} alt="logo" className='w-10 object-contain float:left' />
            <div className='float:left'>
              <h2 className='px-4 py-4 text-bold'>DALL-E 2.0</h2>
            </div>
          </div>
        </Link>
        <Link to="/create-post" className='font-inter font-medium bg-[#2D4356] text-white px-4 py-2 rounded-md'>+ New Post</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/create-post' element={<CreatePost/>} ></Route>
        </Routes>
      </main>
    </BrowserRouter>

  )
}

export default App
