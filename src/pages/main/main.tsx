import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../config/firebase';
import {useEffect, useState} from 'react';
import {Post} from './posts';


export interface Post{
    id: string,
    userId: string,
    description: string,
    title: string,
    username: string,
}

export const Main = () => {

    const [posts, setPosts] = useState<Post[] | null >(null);
    const postRefs = collection(db, 'publications');

    const getPosts = async () => {
        const data = await getDocs(postRefs);
        const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[];
        setPosts(posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts?.map((post) => (<Post post={post}/> ))};
        </div>
    )
   }