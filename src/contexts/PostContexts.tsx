
// import axios from 'axios';
// import { createContext, PropsWithChildren, useEffect, useState } from 'react'

// export const ContextPost = createContext<TypiCodeSchema[] | unknown>(null);

// function PostContexts({ children }: PropsWithChildren) {

//     const [fetchData, setFetchData] = useState<TypiCodeSchema[] | undefined>();
//     const [fetchUsers, setFetchUsers] = useState<TypiCodeUser[] | undefined>();

//     const filterPosts = (id: number) => {
//         setFetchData((prevPosts) => {
//             return prevPosts?.map(item => item).filter(post => post.id !== id)
//         })
//     }

//     const addPost = (newPost: TypiCodeSchema) => {
//         setFetchData((prevPosts) => [newPost, ...prevPosts])
//     }
//     useEffect(() => {
//         axios.get("https://jsonplaceholder.typicode.com/posts")
//             .then(res => setFetchData(res.data))
//             .catch(e => console.error(e))

//         axios.get("https://jsonplaceholder.typicode.com/users")
//             .then(res => setFetchUsers(res.data))
//             .catch(e => console.error(e))
//     }, [])

//     return (
//         <ContextPost.Provider value={{ fetchData, fetchUsers, filterPosts, addPost }}>
//             {children}
//         </ContextPost.Provider>
//     )
// }

// export default PostContexts;