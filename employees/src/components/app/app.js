import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

// function App() { 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 800, increase: false, like: true, id: 1},
                {name: 'Alex Conor', salary: 3000, increase: true, like: false, id: 2},
                {name: 'Carl Woody', salary: 5000, increase: false, like: false, id: 3}
            ],
            term: ''
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        //console.log(`Like this ${id}`);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })  
        }))
    } 

    /* onToggleIncrease = (id) => {
        //console.log(`Increase this ${id}`);
        //this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id)

            //const old = data[index];
            //const newItem = {...old, increase: !old.increase};
            //const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            //return {
            //    data: newArr
            //}

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })  
        }))
    }

    onToggleLike = (id => {
        //console.log(`Like this ${id}`);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, like: !item.like}
                }
                return item;
            })  
        }))
    }) */

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    render() {
        const {data, term} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.searchEmp(data, term)

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}                
                //onToggleIncrease={this.onToggleIncrease}
                //onToggleLike={this.onToggleLike}
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
