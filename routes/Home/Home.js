import React, {Component} from 'react';
import { Layout } from '../../components/Layout';
import HomeHeader from './HomeHeader';

const path = '/';
const action = () => <Layout header={<HomeHeader />}><Home /></Layout>

class Home extends Component {
    handleClick(event) {
        event.preventDefault();
        window.location = event.currentTarget.pathname;
    }
        
    render(){
        return (
            <div>
                <h2>Popular things for your baby</h2>
                <div>
                    <a href="/a/milk" onClick={this.handleClick}>
                        <span>Milk</span>
                    </a>
                    <a href="/a/food" onClick={this.handleClick}>
                        <span>Food</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default { path, action };