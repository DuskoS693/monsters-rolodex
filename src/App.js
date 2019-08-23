import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import { CardList } from "./components/card-list/card-list-component";
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component{

    constructor(){
        super(); //calls constructor method on component class

        this.state  = {
            monsters: [],
            searchField: ''
        };

        /*this.handleChange = this.handleChange.bind(this);
        Ovo iznad se stavlja da bi funkcija ispod mogla da se koristi
        handleChange (e){
            this.setState({searchField: e.target.value});
        };*/
    }
//componentDidMount - calls fetxh after all of the components are rendered
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ monsters: users}))
    }
    //na ovaj nacin ispod ne mora da se binduje
    handleChange = e =>{
        this.setState({searchField: e.target.value});
    };

    render(){
        const { monsters, searchField } = this.state;
        //destructuring- levo se stavlja ono sto treba da se destruktuira, a desno je "odakle", nakon toga moze zasebno
        //da se pristupa propertijima objekta, da ne bi pisali ovo ispod
        // const monsters = this.state.monsters;
        // const searchFIeld = this.state.searchField;
        const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
        <div className="App" >
            <h1> Monsters Rolodex </h1>
            <SearchBox
            placeholder='search monsters'
            handleChange={this.handleChange}
            />
            <CardList monsters = {filteredMonsters}></CardList>
        </div>
        );
    }

}

export default App;
