
import config                                 from '../config/config'

function getIP(){
  return window.location.hostname
} 
function getRemoteIP(){
  return '106.55.235.66'
} 
function gethost(){
  return window.location.host
}
function getAjaxURL(){ 
   let protrol = window.location.protocol
    return `${protrol}//${getIP()}:${config.httpPort}`  
}
function getRemoteHost(){ 
  let protrol = window.location.protocol
   return `${protrol}//${'106.55.235.66'}:${config.httpPort}`  
}
var Method = {
  getIP:getIP,
  gethost:gethost,
  getAjaxURL:getAjaxURL,
  getRemoteHost:getRemoteHost,
  getRemoteIP:getRemoteIP
}

export default Method