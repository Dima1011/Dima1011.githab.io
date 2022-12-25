import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage.js/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
//import thor from '../../resources/img/thor.jpeg';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() =>{
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();       
        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char); 
        setLoading(loading => false);
    }

    const onCharLoading = () => {
        setLoading(loading => true);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )   
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const newName = name.length > 32 ? name.slice(0, 32) : name;
    let btnsStyle = {'margin-top' : '37px'};
    let imgStyle = {'objectFit' : 'cover'};
            if (newName.length > 16) {
                btnsStyle = {'margin-top' : '12px'};
            }

            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{newName}</div>
                    <div className="char__btns" style={btnsStyle}>
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'No comics'}
                {
                    comics.map((item, i) => {
                        //eslint-disable-next-line
                        if (i > 9) return//{
                            //return null;
                        //}

                        //if (i === 0) {
                        //    return (
                        //        <li className="char__comics-item">
                        //            No comics
                        //       </li>
                        //    )
                        //}

                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;