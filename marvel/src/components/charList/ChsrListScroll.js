import { Component } from 'react';
import MarvelService from './../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage.js/ErrorMessage';

import './charList.scss';
class CharListScroll extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newCharListLoading: false,
        offset: 210,
        pageEnded: false,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onUpdateCharList();

        window.addEventListener('scroll', this.checkPageEnded)
        window.addEventListener('scroll', this.onUpdateCharListByScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkPageEnded)
        window.removeEventListener('scroll', this.onUpdateCharListByScroll)
    }

    checkPageEnded = () => {
        if (
            window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.offsetHeight - 30
        )  {
            this.setState( {pageEnded: true} )
            console.log(this.state.pageEnded);           
        }
    }

    onUpdateCharListByScroll = () => {
        const { pageEnded, charEnded, newCharlistLoading } = this.state;
     
        if (pageEnded) {
            this.onUpdateCharList(this.state.offset)
            console.log(this.state.offset)
            window.removeEventListener('scroll', this.checkPageEnded)
            window.removeEventListener('scroll', this.onUpdateCharListByScroll)           
        }
    }

    onUpdateCharList = (offset) => {
        this.setState({ newCharlistLoading: true })
     
        this.marvelService
          .getAllCharacters(offset)
          .then(this.onCharListLoaded)
          .catch(this.onLoadError)
    }

    onCharListLoaded = (newCharList) => {
        this.setState((prevState) => ({
            charList: [...prevState.charList, ...newCharList],
            loading: false,
            newCharListLoading: false,
            offset: prevState.offset + 9,
            charEnded: newCharList.length < 9,
            pageEnded: false
        }))
        window.addEventListener('scroll', this.checkPageEnded)
        window.addEventListener('scroll', this.onUpdateCharListByScroll)
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (                               
                <li className="char__item" 
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>        
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, offset, newCharListLoading, charEnded, pageEnded} = this.state;

        const items = this.renderItems(charList);
        
        //const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
            </div>
        )
    }
}

export default CharListScroll;