import React, { useEffect, Component } from 'react';
import axios from "axios";
import './App.css';
const URL = "http://localhost:5000/api/things"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: [],
      isAdd: false,
      current: "",
      editIndex: null,
      title: "Add",
      loading: true
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className={this.state.loading ? "loading" : "hidden"}>
            Loading
          </div>
          <div className={this.state.loading ? "hidden" : ""}>
            <h1>List of things</h1>
            <span className="control control-add" onClick={ () => this.add()}>
              {this.state.title}
            </span>
            <div className={this.state.isAdd  ? "add-input" : "add-input hidden"}>
              <label>Name:</label>
              <input type="text"
                value={this.state.current}
                onChange={e => this.onChange(e.target)}/>
              <button onClick={ () => this.send()}>Send</button>
            </div>
            <ul>
              {this.state.things.map((thing, index) => <li key={index}>
                <span>{thing.name}</span>
                <span className="control control-delete" onClick={ () => this.delete(index)}>X</span> 
                <span className="control control-edit" onClick={ () => this.edit(index)}>Edit</span> 
              </li>)}
            </ul>
          </div>
        </header>
      </div>
    );
  }

  componentDidMount() {
    this.getData()
  }

  async getData () {
    const { data } = await axios.get(URL);
    const things = data.things
    console.log(things)
    this.setState({ things, loading: false, isAdd: false })
  }
  add() {
    this.setState({isAdd: !this.state.isAdd, title: "Add", current: "", editIndex: null })
  }

  edit(index) {
    const thing = this.state.things[index]
    this.setState({current: thing.name, title: "Cancel", editIndex: index, isAdd: true })
  }

  async delete(index) {
    const thing = this.state.things[index]
    console.log(thing)
    await axios.delete(`${URL}/${thing._id}`)
    const things = [...this.state.things]
    things.splice(index, 1)
    this.setState({ things })
  }

  onChange({ value }) {
    this.setState({current: value});
  }

  send() {
    if (this.state.editIndex === null) {
      axios.post("http://localhost:5000/api/things", {
        name: this.state.current
      }).then(res => {
        console.log("success")
      })
      .catch(err => console.log(err))
    } else {
      const thing = this.state.things[this.state.editIndex]
      thing.name = this.state.current
      axios.put(`${URL}/${thing._id}`, thing)
    }

    this.getData();
  }
}

export default App;
