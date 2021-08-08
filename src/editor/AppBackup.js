import React, { Component } from 'react';
import './App.css';
import '../node_modules/normalize.css/normalize.css';
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const list = [{
  title: 'React',
  url: 'https://reactjs.org',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0
},
{
  title: 'Redux',
  url: 'https://redux.js.org',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1
}
];

function isSearched(searchTerm){
  return function(item){
    const searchTermStr = String(searchTerm).toLowerCase();
    if(searchTermStr.length === 0){
      return true;
    }

    const keys = ['title', 'url', 'author', 'num_comments', 'points'];
    for(const key of keys){
      const objValue = String(item[key]).toLowerCase();
      if(objValue.includes(searchTermStr.toLowerCase())){
        return true;
      }
    }
    return false;
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: list,
      searchTerm: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id){
    this.setState({
      list: this.state.list.filter(item => item.objectID !== id)
    });
  }

  render(){
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <SearchBar
            value={searchTerm}
            onChange={this.onSearchChange}
           >Awesome Book</SearchBar>
         </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
         />
      </div>
    );
  }
}

function MyButton({onClick, intent, className = '', children}){
  return(<Button onClick={onClick} intent={intent} text={children}></Button>);
}

function SearchBar({ value, onChange, children }){
  return(
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>{children}</Navbar.Heading>
        <input
        className="bp3-input"
        placeholder="Search Authors..."
        type="text"
        value={value}
        onChange={onChange}/>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  );
}

function Table({ list, pattern, onDismiss }){
  const largeColumn = {
    width: '40%'
  }

  const midColumn = {
    width: '40%'
  }

  const smallColumn = {
    width: '40%'
  }

  return(
    <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            <MyButton intent="danger" onClick={() => onDismiss(item.objectID)}>dismiss</MyButton>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
