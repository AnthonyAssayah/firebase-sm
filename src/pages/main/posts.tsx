import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import {Post as IPost} from './main'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost
}

interface Like{ 
    userId: string,
    likeId: string,
}

export const Post = (props: Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like [] | null>();
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {userId: user?.uid , postId: post.id})
            if (user){
                setLikes((prev) => 
                prev 
                ? [...prev, {userId: user?.uid, likeId: newDoc.id}] 
                : [{userId: user?.uid, likeId: newDoc.id}]);
            }    
        } catch (error) {
            console.log(error);
        }    
    };

    const removeLike = async () => {
        try {

            const likeToDeleteQuery = query(
                likesRef, 
                where("userId", "==", user?.uid), 
                where("postId", "==", post.id)); 
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeToDelete = likeToDeleteData.docs[0].id;
            const likeId = likeToDeleteData.docs[0].id;
            await addDoc(likesRef, {userId: user?.uid , postId: post.id})
            if (user){
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }    
        } catch (error) {
            console.log(error);
        }    
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
     
    useEffect(() => {
        getLikes();
    }, []);

    return <div>
        <div className='title'>
            <h1>{post.title}</h1>
        </div>
        <div className='body'>
            <p>{post.description}</p>
        </div>
        <div className='footer'>
            <p>@{post.username}</p>
            <button onClick={hasUserLiked ? removeLike : addLike}>
                 {hasUserLiked ? <>&#128078;</>: <>&#128077;</>}
            </button>
            {likes && <p>Likes: {likes.length}</p>}
        </div>
    </div>}