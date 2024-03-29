import {useState, useEffect} from 'react';
//import Spinner from '../spinner/Spinner';
//import ErrorMessage from '../errorMessage.js/ErrorMessage';
import useMarvelService from './../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        //const timerId = setInterval(updateChar, 60000);

        //return () => {
        //    clearInterval(timerId)
        //}
        // eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    //const errorMessage = error ? <ErrorMessage/> : null;
    //const spinner = loading ? <Spinner/> : null;
    //const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>  
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">TRY IT</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let newName = name;
    if (name !== undefined) {
        newName = name.length > 20 ? name.slice(0, 20) + '...' : name;
    }
    //const newName = name.length > 20 ? name.slice(0, 20) + '...' : name;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain', 'height' : '155px'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{newName}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">WIKI</div>
                    </a>
                </div>
            </div>
        </div>
    )   
}

export default RandomChar;