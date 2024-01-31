
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';



interface CreateFormData{
    title: string;
    description: string;

}
export const CreateForm = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required")
    });

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, "publications");


    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate('/');
    };

    return <form className='createForm' onSubmit={handleSubmit(onCreatePost)}>
        <h1 className='createFormTitle'>Create Post</h1>
        <input className="input" placeholder="Title ..."{...register("title")} />
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea className="textarea" placeholder="Description ..."{...register("description")} />
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <button className="submitButton"type="submit">Submit</button>
    </form>
}