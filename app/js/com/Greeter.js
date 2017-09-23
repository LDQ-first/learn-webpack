/*const config = require('./config.json')

module.exports = () => {
    const greet = document.createElement('div')
    greet.textContent = config.greetText
    return greet
}*/
import React, {Component} from 'react'
import config from '../../json/config.json'
import greeter from '../../css/Greeter.css'
import Img from './img'

console.log($('#root'))
console.log(echarts)
export default class Greeter extends Component {
    render() {
        return (
            <div className={greeter.main}>
                {config.greetText}
                <Img/>
            </div>
        )
    }
}
