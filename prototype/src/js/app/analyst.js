import u from 'updeep'
import _ from 'lodash'


function cacheData(url, data){
  var cache = localStorage.getItem("_analystCache")
  var insertObj = {}
  insertObj[`${url}_${data.timestamp}`] = data;
  const result = u(insertObj,JSON.parse(cache));
  localStorage.setItem("_analystCache", JSON.stringify(result));
}

function removeCache(url, data){
  var cache = localStorage.getItem("_analystCache")
  cache = JSON.parse(cache);
  if(_.isObject(cache) && _.keys(cache).length > 0 && cache[`${url}_${data.timestamp}`]){
    delete cache[`${url}_${data.timestamp}`];
    localStorage.setItem("_analystCache",JSON.stringify(cache));
  }
}

function removeAllCache(){
  var cache = localStorage.setItem("_analystCache","{}");
}

function logEvent(url, appId, tags, meta, timestamp, isCache){
  const data = {
    appId,
    tags,
  }

  if(meta) data.meta = meta;
  if(timestamp){
    data.timestamp=timestamp;
  }else{
    data.timestamp=Date.now();
  }

  cacheData(url, data);
}

function send(url, data){
  fetch(url,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(response){
    if (response.ok) {
      console.log("logged event");
      removeCache(url,data);
    } else {
      console.log(new Error("cannot talk to server:"+response.statusText))
    }
  },
  function(err){
    console.log(err)
  })
}


function sendAll(url, datas){

  let body = {
    data: datas
  }

  fetch(url,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response){
    if (response.ok) {
      console.log("logged event count:"+datas.length);
      removeAllCache();
    } else {
      console.log(new Error("cannot talk to server:"+response.statusText))
    }
  },
  function(err){
    console.log(err)
  })
}


function retry(){
  setInterval(function(){
    if(localStorage.getItem("_analystCache")){
      var cache = localStorage.getItem("_analystCache");
      if(_.isString(cache) && _.isObject(JSON.parse(cache))){
        cache = JSON.parse(cache);
        let cacheList = [];
        for(var k in cache){
          cacheList.push(cache[k]);
        }
        if(cacheList.length > 0) sendAll('/bsl-daq/api/v1/records/batch',cacheList);
        // send one method
        // _.mapKeys(cache,function(record,key){
        //   const partials = key.split('_');
        //   send(partials[0],record);
        // })
      }
    }
  },10000)
}

retry()
export default logEvent;
