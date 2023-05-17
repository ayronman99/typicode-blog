import { create } from "zustand";
import axios from 'axios';

interface IStoreData {
    postData: TypiCodeSchema[],
    postUsers: TypiCodeUser[],
    fetchPosts: () => void,
    fetchUsers: () => void,
    addPost: (newPost: TypiCodeSchema) => void,
    updatePost: (id: number, title: string, body: string) => void,
    deletePost: (id: number) => void
}

const updatePost = (posts: TypiCodeSchema[], id: number, title: string, body: string): TypiCodeSchema[] =>
    posts.map((post) => ({
        ...post,
        title: post.id === id ? title : post.title,
        body: post.id === id ? body : post.body
    }));

const postArr: TypiCodeSchema[] = [];
const userArr: TypiCodeUser[] = [];

const zustStore = create<IStoreData>((set) => ({
    postData: postArr,
    postUsers: userArr,
    fetchPosts: () => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => set({ postData: res.data }))
            .catch(e => console.error(e))
    },
    fetchUsers: () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => set({ postUsers: res.data }))
            .catch(e => console.error(e))
    },
    addPost: (newPost: TypiCodeSchema) => set((state) => ({ postData: [...state.postData, newPost].sort((a, b) => b.id - a.id) })),
    updatePost: (id, title, body) => set((state) => ({ postData: updatePost(state.postData, id, title, body) })),
    deletePost: (id) => set((state) => ({ postData: state.postData.filter(post => post.id !== id) }))
}))

export default zustStore;