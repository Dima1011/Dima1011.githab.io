
import { useParams, Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';

import AppBanner from "../appBanner/AppBanner";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage.js/ErrorMessage';
import './singleComic.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic); 
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, thumbnail, pageCount, language, price} = comic;

    return (
        <div className="comic">
            <img src={thumbnail} alt={title} className="comic__img"/>
            <div className="comic__info">
                <h2 className="comic__name">{title}</h2>
                <p className="comic__descr">{description}</p>
                <div className="comic__descr">{pageCount}</div>
                <div className="comic__descr">Language: {language}</div>
                <div className="comic__price">{price}</div>
            </div>
            <Link to="/comics" className="comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;