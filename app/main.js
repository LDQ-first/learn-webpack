/*
const greeter = require('./Greeter.js')
document.getElementById('root').appendChild(greeter())*/
/*import './lib/vendor.dll.js'*/
import React from 'react'
import {render} from 'react-dom'
import Greeter from './js/com/Greeter'
import './css/main.css'
/*import './css/iconfont.css'*/
import './sass/main.scss'
import $ from 'jquery'


render(<Greeter />, document.getElementById('root'))