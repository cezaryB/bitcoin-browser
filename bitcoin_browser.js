import React, { Component } from 'react';

export class Search extends Component {
    constructor(props){
        super(props);
        this.state = {hash: ''};
    }

    handleHashChange(hash) {
        this.props.sendHash(hash);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Your hash is ' + this.state.hash);
    };

    render() {
        return (
            <div>
                <p className="App-intro">
                    To get started, enter the code/hash of your bitcoin transaction and click 'Search'.
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.hash} onChange={this.handleHashChange} placeholder="enter the code/hash here"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export class Results extends Component {

        constructor(props) {
            super(props);
            this.state = {
                addresses : [],
                block_hash: '',
                size: '',
            };
        }

        componentDidMount(){


            fetch('https://api.blockcypher.com/v1/btc/main/txs/' + this.props.hash)
                .then(r => r.json())
                .then(data => {
                    this.setState({
                        block_hash: data.block_hash,
                        size: data.size,
                    });
                });
        }
        render(){


            return (
                <div>
                    <h1>{this.state.block_hash}</h1><br/>

                    <h1>{this.state.size}</h1><br/>
                </div>
             )
        }
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            hash: ""
        };
    }

    changeHash = (hash) => {
        this.setState({
            hash: hash
        })
    };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bitcoin Browser</h1>
        </header>
        <Search sendHash = {this.changeHash}/>
          <Results hash={this.state.hash}/>
      </div>
    );
  }
}

export default App;