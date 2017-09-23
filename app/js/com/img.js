import React, {Component} from 'react'
import img from '../../sass/img.scss'
import icon from '../../css/iconfont.css'
import classNames from 'classnames/bind'

const ic = classNames.bind(icon)

export default class main extends Component {
    constructor(){
        super()
        this.state = {
            title:['001.gif', 'infoq.jpg', 'modules.png', 'webpack.svg'] 
        }
    }    

    render() {
        let {title} = this.state

        let imgLi = title.map((item, index) => {
            return (
                <li key={index}>
                    <img src={require(`../../img/${item}`)} alt={item} title={item}/>
                    <h3>{item.replace(/\.[A-z]*$/, '')}</h3>
                    <i className={ic( { iconfont: true, 'icon-xiaohuojian': true })}></i>
                </li>
            )
        }) 

        return (
            <ul className={img.main}>
                {imgLi}
            </ul>
        )
    }
}