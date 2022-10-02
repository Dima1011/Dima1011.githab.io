//import {Component} from 'react';

import './employees-list-item.css';

/* const EmployeesListItem = ({name, salary, increase}) => { */
/* class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            like: false
        }
    }

    onIncrease = () => {
        this.setState(({increase}) => ({
            increase: !increase
        }))
    }

    onLike = () => {
        this.setState(({like}) => ({
            like: !like
        }))
    } */
    
    const EmployeesListItem = (props) => {

    //render() {
        const {name, salary, onDelete, onToggleProp, increase, like} = props; //this.props;
        //const {increase, like} = this.state;
        let classNames = "list-group-item d-flex justify-content-between";

        if (increase) {
            classNames += ' increase';
        }

        if (like) {
            classNames += ' like'
        }

        return (
            <li className={classNames}>
                <span className="list-group-item-label" onClick={onToggleProp} data-toggle="like">{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        //onClick={onToggleIncrease}
                        onClick={onToggleProp}
                        data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    //}   
}

export default EmployeesListItem;