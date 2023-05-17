import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PostFeed from './pages/PostFeed'
import PostItem from './pages/PostItem'
import zustStore from './contexts/zustStore'
import { useEffect } from "react";

function App() {
  const fetchPost = zustStore(state => state.fetchPosts)
  const fetchUsers = zustStore(state => state.fetchUsers)

  useEffect(() => {
    fetchPost()
    fetchUsers()
  }, [fetchPost])

  return (

    <div className="App bg-slate-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<PostFeed />} />
        <Route path="/post/:id" element={<PostItem />} />
      </Routes>
    </div>

  )
}

export default App
