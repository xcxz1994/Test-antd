import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router,hashHistory,Route } from 'react-router';
import Apply from './apply';
import Examines from './Examine';
export  class Routes extends Component{
    render(){
        console.log('Routes')
            return(
                <Router history={hashHistory}>
                    <Route path="/" component={Apply}/>
                    <Route path="/a" component={Examines}/>
                </Router>
            );
    }
}
ReactDOM.render(<Routes/>, document.getElementById('root'));