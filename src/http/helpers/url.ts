/**
 * 
 * @string url url地址
 * @any params 参数 (可选)
 */
 import {isDate,isPlainObject, isURLSearchParams} from './util';

 interface URLOrigin{
     protocol:string,
     host: string,
 }
 
 
 function encode(val: string) : string {
     return encodeURIComponent(val)
     .replace(/%40/g,'@')
     .replace(/%3A/ig,':')
     .replace(/%24/g,'$')
     .replace(/%2C/ig,',')
     .replace(/%20/g,'+')
     .replace(/%5B/ig,'[')
     .replace(/%5D/g,']')
 }
 
 export function buildURL(url: string, params?: any, paramsSerializer?:(params:any) => string):string {
     if(!params) return url;
 
     let serializedParams;
 
     if(paramsSerializer) {
         serializedParams = paramsSerializer(params);
     } else if(isURLSearchParams(params)){
         serializedParams = params.toString()
     }else {
         const parts:string[] = []; 
 
         Object.keys(params).forEach((key) => {
             const val = params[key];
             if(val === null || typeof val === 'undefined') {
                 return
             }
             let values = [];
             if(Array.isArray(val)) {
                 values = val;
                 key += '[]';
             }else {
                 values = [val];
             }
             values.forEach((val) => {
                 if(isDate(val)){
                     val = val.toISOString();
                 }else if(isPlainObject(val)) {
                     val = JSON.stringify(val);
                 }
                 parts.push(`${encode(key)}=${encode(val)}`);
             })
         })
         serializedParams = parts.join('&');
     }
 
     if(serializedParams) {
         const markIndex = url.indexOf('#');
         if(markIndex !== -1) {
             url = url.slice(0,markIndex);
         }
         url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
 
     }
     return url;
 }
 
 export function isAbsoluteURL(url:string|undefined): boolean {
     if(url==undefined)return false;
     return /(^[a-z][a-z\d\+\-\.]*:])?\/\//i.test(url)
 }
 
 export function combineURL(baseURL:string, relativeURL?:string):string {
     return relativeURL ? baseURL.replace(/\/+$/,'') + '/' +relativeURL.replace(/^\/+/, ''): baseURL
 }
 
 export function isURLsameOrigin(requestURL: string):boolean {
     const parseOrigin = resolverURL(requestURL);
     return (parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host)
 }
 
 const urlParsingNode = document.createElement('a');
 const currentOrigin = resolverURL(window.location.href);
 
 
 function resolverURL(url: string): URLOrigin {
     urlParsingNode.setAttribute('href',url);
  
     const {protocol,host} = urlParsingNode;
 
     return {
         protocol,
         host,
     }
 }