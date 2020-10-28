const express = require("express");
var http = require('http');
var https = require('https');
const qs = require('querystring');
const crypto = require('crypto');
const fs = require("fs");
const base = require('./base771.json')
const promo = require('./promo771.json')
const {VK} = require('vk-io'); 
const {Keyboard} = require('vk-io');
const vk = new VK(); 
const {updates, api, snippets} = vk; 
const groups = require('./groups771.json')
var cors = require('cors')

var request = require("request");

function getRandomInRange(min, max) { 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}; //Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð²Ñ‹Ð±Ð¾Ñ€Ð° Ñ€Ð°Ð½Ð´Ð¾Ð¼Ð½Ð¾Ð³Ð¾ Ñ‡Ð¸ÑÐ»Ð°

var privateKey  = fs.readFileSync('jopaslona.ml.key', 'utf8');
var certificate = fs.readFileSync('jopaslona.ml.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

setInterval(function(){ 
        fs.writeFileSync("./base771.json", JSON.stringify(base, null, "\t")) 
}, 100); // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…

setInterval(function(){ 
        fs.writeFileSync("./promo771.json", JSON.stringify(promo, null, "\t")) 
}, 100); // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…

setInterval(function(){ 
        fs.writeFileSync("./groups771.json", JSON.stringify(groups, null, "\t")) 
}, 100); // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…



/* vk.setOptions({ // Ð£ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÐ¼ Ñ‚Ð¾ÐºÐµÐ½ Ð¸ Ð¸Ð´ Ð³Ñ€ÑƒÐ¿Ð¿Ñ‹
token: "",
apiMode: "parallel",
pollingGroupId:  
}); */

const app = express(credentials);

var httpsServer = https.createServer(credentials, app);

app.use(cors())

const validateAppUrl = (url, secret_key) => {
//console.log(url)
    // достаем параметры из url
    const query_params = url.slice(url.indexOf("?") + 1).split("&").reduce((a, x) => {
        const data = x.split("=");
        a[data[0]] = data[1];
        return a;
    }, {});
    // выбираем нужные (с приставкой "vk_") и сортируем их
    const sign_params = {};
    Object.keys(query_params).sort()
        .forEach((key) => {
            if(!key.startsWith("vk_")) return;
            sign_params[key] = query_params[key];
        });
    // образуем строку вида param1=value1&param2=value2...
    const sign_str = Object.keys(sign_params).reduce((a, x) => {
        a.push(x + "=" + sign_params[x]);
        return a;
    }, []).join("&");
    // подписываем
    let sign = require("crypto").createHmac("sha256", secret_key).update(sign_str);
    sign = sign.digest("binary");
    sign = require("buffer").Buffer.from(sign, "binary").toString("base64");
    sign = sign.split("+").join("-");
    sign = sign.split("/").join("_");
    sign = sign.replace(/=+$/, '');
    // сравниваем подпись с оригинальной. если все окей, то возвращаем id пользователя, если нет - null

    //console.log(sign)
    let status = sign === query_params["sign"]; 
    //console.log(status);
    let statu = {
status: status,
sign: sign,
vk: query_params['sign']
    };

    return statu;//sign === query_params["sign"] ? query_params["vk_user_id"] : null;
};

function getUrlVars(url) {
var hash;
var myJson = {};
var hashes = url.slice(url.indexOf('?') + 1).split('&');
for (var i = 0; i < hashes.length; i++) {
hash = hashes[i].split('=');
myJson[hash[0]] = hash[1];
// If you want to get in native datatypes
// myJson[hash[0]] = JSON.parse(hash[1]);
}
return myJson;
}

app.get("/app/createUser/",  (req, res) => { 
  let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
  if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    //console.log(req.headers.referer)

if (query.name && query.uid && query.photo) {

            let reg = 0
          if (!base[query.uid]) {
            reg = 1
            base[query.uid] = {
              balance: 0,
              mine: 0,
              progress: 0,
              rubli: 0,
              click: 0.0001,

              click1: 0.002000,
              click2: 0.010000,
              click3: 0.015000,
              click4: 8,
              click5: 10,

              mine1: 0.002000,
              mine2: 0.010000,
              mine3: 0.015000,
              mine4: 0.020000,
              mine5: 0.050000,
              mine6: 0.090000,
              mine7: 0.150000,
              mine8: 5,
              mine9: 10,
              mine10: 18,

              gold: 0,
              limit: 10000,
              second: 0,
              verify: false,
              reason: '',
              ban: false,
              ref: null,
              transfers: [],
              photo: query.photo,
              name: query.name,
              online: false,
              apikey: "api_rand",
              score: 0,
              adban: false,
              payban: false,
              admin: false,
              scorecost: 10,
              pole1: 0,
              pole2: 0,
              line1: 0,
              line2: 0,
              line3: 0,
              line4: 0,
              line5: 0,
              line6: 0,
              line7: 0,
              line8: 0,
              line9: 0,
              line10: 0,
              line11: 0,
              line12: 0,
              line13: 0,
              line14: 0,
              line15: 0,
              donepmiss1: 0,
              donepmiss2: 0,
              donepmiss3: 0,
              donepmiss4: 0,
              donepmiss5: 0,
              donemiss1: 0,
              donemiss2: 0,
              donemiss3: 0,
              donemiss4: 0,
              donemiss5: 0,
              donemiss6: 0,
              playedsec: 0,
              playedmin: 0,
              playedhour: 0,
              playedday: 0,
              vip: false,
              caswin: 0,
              caslose: 0,
              caschance: false,
              allclick: 0,
              vip: false,
            }
          }

            base[query.uid].ip = req.ip.replace('::ffff:', '')
            
          res.json({ response: [{id: query.uid, reason: base[query.uid].reason, mine1: base[query.uid].mine1, mine2: base[query.uid].mine2, mine3: base[query.uid].mine3, mine4: base[query.uid].mine4, mine5: base[query.uid].mine5, mine6: base[query.uid].mine6, mine7: base[query.uid].mine7, mine8: base[query.uid].mine8, mine9: base[query.uid].mine9, mine10: base[query.uid].mine10, click1: base[query.uid].click1, click2: base[query.uid].click2, click3: base[query.uid].click3, click4: base[query.uid].click4, click5: base[query.uid].click5, gold: base[query.uid].gold, second: base[query.uid].second, rubli: base[query.uid].rubli, reg: 0, balance: base[query.uid].balance, ban: base[query.uid].ban, transfers: base[query.uid].transfers, mine: base[query.uid].mine, click: base[query.uid].click, pole1: base[query.uid].pole1, pole2: base[query.uid].pole2, score: base[query.uid].score, allclick: base[query.uid].allclick, playedsec: base[query.uid].playedsec, playedmin: base[query.uid].playedmin, playedhour: base[query.uid].playedhour, playedday: base[query.uid].playedday}]} );
let params = getUrlVars(req.headers.referer)
let group = params.vk_group_id

if (params.vk_group_id) {
            if (!groups[group]) {
              vk.api.call("groups.getById", {
            group_id: group,
            fields: "members_count"
          }).then((x) => {
              //console.log(x)
        groups[group] = {
                name: x[0].name,
                photo: x[0].photo_100,
                members: x[0].members_count,
                balance: 0
              }
            })
            }
            vk.api.call("groups.getById", {
            group_id: group,
            fields: "members_count"
          }).then((a) => {
            groups[group].name = a[0].name
            groups[group].photo = a[0].photo_100
            groups[group].members = a[0].members_count

            groups[group].balance += base[query.uid].click
          })
          }
        
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
        
    
});

app.get("/app/mine/", async (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
  if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   if (req.headers.referer === 'https://bucks-c.space/') return
  
    if(query.uid && query.name) {
   
        
           if (base[query.uid].ban) {
  res.json({ response: [{"status": "ÍÀÕÓÉ ÈÄÈ"}]});

return
}
          base[query.uid].balance += base[query.uid].mine
          base[query.uid].playedsec += 1
          if(base[query.uid].playedsec > 59)
        	{
          base[query.uid].playedsec = 0
          base[query.uid].playedmin += 1
        	}
        	if(base[query.uid].playedmin > 59)
        	{
          base[query.uid].playedmin = 0
          base[query.uid].playedhour += 1
        	}
        	if(base[query.uid].playedhour > 23)
        	{
          base[query.uid].playedhour = 0
          base[query.uid].playedday += 1
        	}
base[query.uid].ip = req.ip.replace('::ffff:', '')
let params = getUrlVars(req.headers.referer)
let group = params.vk_group_id
if (params.vk_group_id) {
            if (!groups[group]) return;
            groups[group].balance += base[query.uid].mine
          }
//console.log(group)
          res.json({ response: [{id: query.uid, balance: base[query.uid].balance, transfers: base[query.uid].transfers, click: base[query.uid].click, mine: base[query.uid].mine}]});
//console.log(query.cordy)
  base[query.uid].ip = req.ip.replace('::ffff:', '')
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
   }
    
});


app.get("/app/online/",  (req, res) => {
 let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`}); 
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
   if (req.headers.referer === 'https://vk.com/') return
        
                       if (base[query.uid].ban) {
  res.json({ response: [{"status": "ÍÀÕÓÉ ÈÄÈ"}]});

return
}
/* for (e in base) {
    if (base[e].ip == req.ip) {
        if (e != query.uid) {
            
        base[e].ban = true
        base[e].reason = '[Нарушение правил] Вы были забанены за мульти-аккаунт'
        base[query.uid].ban = true
        base[query.uid].reason = '[Нарушение правил] Вы были забанены за мульти-аккаунт'
        vk.api.messages.send({user_id: 298845865 && 140933159, message: `» *id${e} и *id${query.uid} были забанены за мульти-аккаунт. IP: ${req.ip}`})
        return
        }
    } 
} */
          base[query.uid].online = true
          // base[query.uid].cordy = query.cordy
         // base[query.uid].coorx = query.cordx
  base[query.uid].ip = req.ip.replace('::ffff:', '')
  let online = 0
  for (r in base) {
      if (base[r].online) online += 1
  }
          res.json({ response: [{ online: online }]});
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    } 
    
});

app.get("/app/click/", async  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  const axios = require('axios');
  let now = new Date();
  let hour = now.getHours()

  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
   
        
                       if (base[query.uid].ban) {
  res.json({ response: [{"status": "ÍÀÕÓÉ ÈÄÈ"}]});

return
}

          base[query.uid].balance += base[query.uid].click
          base[query.uid].pole1 += 0.0005
          base[query.uid].allclick += 1
let params = getUrlVars(req.headers.referer)
let group = params.vk_group_id
if (params.vk_group_id) {
            if (!groups[group]) return;
            groups[group].balance += base[query.uid].click
          }

          
          res.json({ response: [{id: query.uid, balance: base[query.uid].balance, transfers: base[query.uid].transfers, click: base[query.uid].click, mine: base[query.uid].mine}]});
          base[query.uid].group = group
          base[query.uid].second += 1
          
//console.log(query.cordy)
  base[query.uid].ip = req.ip.replace('::ffff:', '')
  base[query.uid].photo = query.photo
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    } 
    
    
});

app.get("/app/adBonus/", async  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  const axios = require('axios');
  let now = new Date();
  let hour = now.getHours()

  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
   
        
                       if (base[query.uid].ban) {
  res.json({ response: [{"status": "ÍÀÕÓÉ ÈÄÈ"}]});

return
}

          var random = getRandomInRange(1,3);
          base[query.uid].limit += 1
          if(random == 1)
          {
			       base[query.uid].gold += 0.005
             base[query.uid].score += 0.002
          }
          if(random == 2)
          {
          	 base[query.uid].gold += 0.0005
             base[query.uid].score += 0.004
          }
          if(random == 3)
          {
          	 base[query.uid].gold += 0.001
             base[query.uid].score += 0.006
          }


          res.json({ response: [{id: query.uid, balance: base[query.uid].balance, transfers: base[query.uid].transfers, click: base[query.uid].click, mine: base[query.uid].mine}]});
          
          
//console.log(query.cordy)
  base[query.uid].ip = req.ip.replace('::ffff:', '')
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    } 
});

app.get("/app/getTop/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  const pos = 1
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let a = 0
    let query = req.body;
   
    let top = []
    let topme = [] // ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¼Ð°ÑÐ¸Ð²Ð°
    let users = []

    for (let i in base){// Ð¿ÐµÑ€ÐµÐ±Ð¾Ñ€ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…
          top.push({
            id: i,
            verify: base[i].verify,
            name: base[i].name,
            photo: base[i].photo,
            balance: base[i].balance
        })
          }
     top.sort(function(a, b) { 
         
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0


}); //Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ°

let text = ""
res.json({"users": top, "me": 1})

});

app.get("/app/getSpeedTop/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  const pos = 1
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let a = 0
    let query = req.body;
   
    let top = []
    let topme = [] // ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¼Ð°ÑÐ¸Ð²Ð°
    let users = []

    for (let i in base){// Ð¿ÐµÑ€ÐµÐ±Ð¾Ñ€ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…
          top.push({
            id: i,
            verify: base[i].verify,
            name: base[i].name,
            photo: base[i].photo,
            balance: base[i].click
        })
          }
     top.sort(function(a, b) { 
         
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0


}); //Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ°

let text = ""
res.json({"users": top, "me": 1})

});

app.get("/app/getScoreTop/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  const pos = 1
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let a = 0
    let query = req.body;
   
    let top = []
    let topme = [] // ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¼Ð°ÑÐ¸Ð²Ð°
    let users = []

    for (let i in base){// Ð¿ÐµÑ€ÐµÐ±Ð¾Ñ€ Ð±Ð°Ð·Ñ‹ Ð´Ð°Ð½Ð½Ñ‹Ñ…
          top.push({
            id: i,
            verify: base[i].verify,
            name: base[i].name,
            photo: base[i].photo,
            balance: base[i].pole1
        })
          }
     top.sort(function(a, b) { 
         
if (b.pole1 > a.pole1) return 1 
if (b.pole1 < a.pole1) return -1 
return 0


}); //Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²ÐºÐ°

let text = ""
res.json({"users": top, "me": 1})

});


app.get("/app/userTranfer/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    if(!Number(query.to) || !Number(query.sum) || query.sum == null || query.sum == NaN) {
      res.json({ response: [{status: 'error', error_code: 9, error_description: `Увы, но такое больше не выйдет. :) `}] });
        return
    }
    if(query.uid && query.name && query.from && query.to && query.sum) {
        
      if (query.from === query.to) {
        res.json({ response: [{status: 'error', error_code: 3, error_description: 'Вы не можете перевести сами себе!'}] });
        return
      }
      else if (!base[query.to]) {
        res.json({ response: [{status: 'error', error_code: 4, error_description: `Игрок с ID: ${query.to} не зарегестрирован с сервисе.`}] });
        return
      } else if (query.sum > base[query.uid].balance) {
        res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств'}] });
        return
      } else if (query.sum < 1) {
        res.json({ response: [{status: 'error', error_code: 5, error_description: 'Сумма не может быть меньше 1 EC'}] });
        return
      } else {
        let key = getRandomInRange(100000, 999999)

        base[query.uid].balance -= Number(query.sum)
        base[query.to].balance += Number(query.sum)

        base[query.to].transfers.push({
          operation: 'in',
          sum: query.sum,
          from_id: query.uid,
          key: key
        })

        base[query.uid].transfers.push({
          operation: 'to',
          sum: query.sum,
          to_id: query.to,
          key: key
        })
      res.json({ response: [{status: 'ok'}] });
    }
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }  
});

app.get("/app/getHistory/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
 
        
    let his = []

    for (i in base[query.uid].transfers) {
      if (base[query.uid].transfers[i].operation == 'in') {
        his.unshift({
          operation: 'in',
          sum: base[query.uid].transfers[i].sum,
          from_id: base[query.uid].transfers[i].from_id,
          key: base[query.uid].transfers[i].key,
          from_name: base[base[query.uid].transfers[i].from_id].name,
          from_photo: base[base[query.uid].transfers[i].from_id].photo
        })
      }

      if (base[query.uid].transfers[i].operation == 'to') {
        his.unshift({
          operation: 'to',
          sum: base[query.uid].transfers[i].sum,
          to_id: base[query.uid].transfers[i].to_id,
          key: base[query.uid].transfers[i].key,
          to_name: base[base[query.uid].transfers[i].to_id].name,
          to_photo: base[base[query.uid].transfers[i].to_id].photo
        })
      }
  }

      res.json({ response: [{status: 'ok', history: his}] });

});

app.get("/app/second/",  (req, res) => {
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        base[query.uid].playedsec += 1
        if(base[query.uid].playedsec > 60)
        {
          base[query.uid].playedsec = 0
          base[query.uid].playedmin += 1
        }
        if(base[query.uid].playedmin > 60)
        {
          base[query.uid].playedmin = 0
          base[query.uid].playedhour += 1
        }
        if(base[query.uid].playedhour > 24)
        {
          base[query.uid].playedhour = 0
          base[query.uid].playedday += 1
        }
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'Произошла ошибка. Очистите кеш и перезагрузите приложение!'}] });
      
    }
    
});

app.get("/app/click1/",  (req, res) => {
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        if (base[query.uid].balance < base[query.uid].click1) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].click += 0.000100
        base[query.uid].balance -= base[query.uid].click1

        base[query.uid].click1 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/click2/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    if(query.uid && query.name) {
        if (base[query.uid].balance < base[query.uid].click2) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].click += 0.000200
        base[query.uid].balance -= base[query.uid].click2

        base[query.uid].click2 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/click3/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
  
    if(query.uid && query.name) {
        if (base[query.uid].balance < base[query.uid].click3) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].click += 0.001000
        base[query.uid].balance -= base[query.uid].click3

        base[query.uid].click3 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
        
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
});

app.get("/app/click4/",  (req, res) => {
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    
    if(query.uid && query.name) {
        if (base[query.uid].gold < base[query.uid].click4) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].click += 0.050000
        base[query.uid].gold -= base[query.uid].click4

        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
         
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/click5/",  (req, res) => {
 let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`}); 
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        if (base[query.uid].gold < base[query.uid].click5) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].click += 0.070000
        base[query.uid].gold -= base[query.uid].click5


        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
         
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/score1/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].gold < 10) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки опыта!'}] });
        return
        }
        base[query.uid].score += 1
        base[query.uid].gold -= 10

        res.json({ response: [{status: 'ok', description: 'Успешно!'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mine1/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].balance < base[query.uid].mine1) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 10) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 10 опыта'}] });
        return
        }
        base[query.uid].mine += 0.00010
        base[query.uid].balance -= base[query.uid].mine1

        base[query.uid].mine1 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/playedmission1/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].playedmin < 1) {
        	if(base[query.uid].playedhour == 0)
        	{
        		if(base[query.uid].playedday == 0)
        		{
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
    }
    }
}
if(base[query.uid].donepmiss1 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 15
        base[query.uid].donepmiss1 += 1
        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/playedmission2/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].playedmin < 45) {
        	if(base[query.uid].playedhour == 0)
        	{
        		if(base[query.uid].playedday == 0)
        		{
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
    }
    }
}
if(base[query.uid].donepmiss2 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 150
        base[query.uid].donepmiss2 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/playedmission3/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].playedmin < 60) {
        	if(base[query.uid].playedhour == 0)
        	{
        		if(base[query.uid].playedday == 0)
        		{
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
    }
    }
        }
        if(base[query.uid].donepmiss3 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 200
        base[query.uid].donepmiss3 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/playedmission4/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].playedhour < 3) {
        	if(base[query.uid].playedday == 0)
        	{
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
           return
       }
        }
        if(base[query.uid].donepmiss4 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 1000
        base[query.uid].donepmiss4 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/playedmission5/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].playedhour < 24) {
        	if(base[query.uid].playedday == 0)
        	{
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
    }
        }
        if(base[query.uid].donepmiss5 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 10000
        base[query.uid].donepmiss5 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission1/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 1500) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss1 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 4000
        base[query.uid].donemiss1 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission2/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 5000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss2 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 7500
        base[query.uid].donemiss2 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission3/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 10000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss3 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 15000
        base[query.uid].donemiss3 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission4/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 20000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss4 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 25000
        base[query.uid].donemiss4 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission5/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 50000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss5 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].balance += 100000
        base[query.uid].donemiss5 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mission6/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
       
        if (base[query.uid].allclick < 100000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Не все условия задания выполнены.'}] });
        return
        }
        if(base[query.uid].donemiss6 == 1)
{
	res.json({ response: [{status: 'error', error_code: 5, error_description: 'Награда уже была получена.'}] });
	return
}
        base[query.uid].gold += 30
        base[query.uid].donemiss6 += 1

        res.json({ response: [{status: 'ok', description: 'Награда получена.'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mine2/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
       
        if (base[query.uid].balance < base[query.uid].mine2) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 15) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 15 опыта'}] });
        return
        }
        base[query.uid].mine += 0.000500
        base[query.uid].balance -= base[query.uid].mine2

        base[query.uid].mine2 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
        
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mine3/",  (req, res) => {
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    
    if(query.uid && query.name) {
        
        if (base[query.uid].balance < base[query.uid].mine3) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 20) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 20 опыта'}] });
        return
        }
        base[query.uid].mine += 0.001000
        base[query.uid].balance -= base[query.uid].mine3

        base[query.uid].mine3 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
          
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mine4/",  (req, res) => {
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        
        if (base[query.uid].balance < base[query.uid].mine4) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 40) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 40 опыта'}] });
        return
        }
        base[query.uid].mine += 0.001500
        base[query.uid].balance -= base[query.uid].mine4

        base[query.uid].mine4 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/mine5/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {

        if (base[query.uid].balance < base[query.uid].mine5) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 60) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 60 опыта'}] });
        return
        }
        base[query.uid].mine += 0.00250
        base[query.uid].balance -= base[query.uid].mine5

        base[query.uid].mine5 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
        
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/mine6/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
    
    if(query.uid && query.name) {
        
        if (base[query.uid].balance < base[query.uid].mine6) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 80) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 80 опыта'}] });
        return
        }
        base[query.uid].mine += 0.005000
        base[query.uid].balance -= base[query.uid].mine6

        base[query.uid].mine6 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/mine7/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
      
        if (base[query.uid].balance < base[query.uid].mine7) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        if (base[query.uid].pole1 < 100.0000) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'Покупка данного улучшения откроется при достижении 100 опыта'}] });
        return
        }
        base[query.uid].mine += 0.007500
        base[query.uid].balance -= base[query.uid].mine7

        base[query.uid].mine7 *= 2
        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
         
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/mine8/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        
        if (base[query.uid].gold < base[query.uid].mine8) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].mine += 0.050000
        base[query.uid].gold -= base[query.uid].mine8


        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
         
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/mine9/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
   
    if(query.uid && query.name) {
        
        if (base[query.uid].gold < base[query.uid].mine9) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки данного ускорения!'}] });
        return
        }
        base[query.uid].mine += 0.120000
        base[query.uid].gold -= base[query.uid].mine9

        res.json({ response: [{status: 'ok', description: 'Вы купили ускорение!'}] });
    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    
    }
});

app.get("/app/mine10/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
        if (base[query.uid].gold < base[query.uid].scorecost) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно средств для покупки опыта!'}] });
        return
        }
        base[query.uid].pole1 += 10
        base[query.uid].gold -= 10

        
        res.json({ response: [{status: 'ok', description: 'Успешно!'}] });
    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});


app.get("/app/container/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
        if (base[query.uid].pole1 < 10) {
           res.json({ response: [{status: 'error', error_code: 5, error_description: 'У вас недостаточно ES для покупки контейнера!'}] });
        return
        }
        base[query.uid].pole1 -= 10
        base[query.uid].pole2 += 1

        
        res.json({ response: [{status: 'ok', description: 'Успешно!'}] });
    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/opencontainer/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;

    if(query.uid && query.name) {
        if (base[query.uid].pole2 == 0) {
           res.json({ response: [{status: 'error', error_code: 10, error_description: 'Недостаточно контейнеров для открытия.'}] });
        return
        }
        	base[query.uid].pole2 -= 1
        	var random = getRandomInRange(1,6);
        	if(random == 1)
        	{
				base[query.uid].balance += 2500
				res.json({ response: [{status: 'ok', description: 'Вам выпало 2500 EC'}] });
        	}
        	if(random == 2)
        	{
				base[query.uid].balance += 4000
				res.json({ response: [{status: 'ok', description: 'Вам выпало 4000 EC'}] });
        	}
        	if(random == 3)
        	{
				base[query.uid].balance += 4500
				res.json({ response: [{status: 'ok', description: 'Вам выпало 4500 EC'}] });
        	}
        	if(random == 4)
        	{
				base[query.uid].balance += 5000
				res.json({ response: [{status: 'ok', description: 'Вам выпало 5000 EC'}] });
        	}
        	if(random == 5)
        	{
				base[query.uid].balance += 6000
				res.json({ response: [{status: 'ok', description: 'Вам выпало 6000 EC'}] });
        	}
        	if(random == 6)
        	{
        		var chance = getRandomInRange(1,2);
        		if(chance == 1)
        		{
					base[query.uid].balance += 7000
					res.json({ response: [{status: 'ok', description: 'Вам выпало 7000 EC'}] });
        		}
        		if(chance == 2)
        		{
					base[query.uid].gold += 5
					res.json({ response: [{status: 'ok', description: 'Поздравляем! Вам выпало 5 эмеральдов!'}] });
        		}
        	}

    
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
    
});

app.get("/app/promo/",  (req, res) => { 
   let prov = validateAppUrl(req.headers.referer, "N3BooIF6Os9e5OaeZkul"); 
if(!prov) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
let params = getUrlVars(req.headers.referer)
let user = params.vk_user_id;
if(user != req.query.uid) return res.status(500).json({error:`Если ты это читаешь, ты пидорасина. :)`});
  let now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let timeString = hour + ":" + minutes;
    let hash = req.params.hash;
    let query = req.query;
  
    if(query.uid && query.name && query.promo) {
       
        let activate = 0 
        let promocode = false
        let id = null
        //console.log(promo)
        for (i in promo) {
          if (promo[i].code == query.promo) { 
            promocode = true
            id = i
            if (promo[i].activate.includes(query.uid)) {
              activate = 1
            }
          }
          //console.log(promo[i].code)
        }

        if (!promocode) {
           res.json({ response: [{status: 'error', error_code: 3, error_description: 'Данного промокода не существует!'}] });
        return
        }

        if (activate == 1) {
           res.json({ response: [{status: 'error', error_code: 3, error_description: 'Вы уже активировали этот промокод!'}] });
        return
        }
                        promo[i].activate.push(query.uid)
                        if(promo[id].type == "balance")
                        {
                        base[query.uid].balance += promo[id].sum
                        }
                        if(promo[id].type == "donate")
                        {
                          base[query.uid].gold += promo[id].sum
                        }
                
            
           res.json({ response: [{status: 'ok', description: 'Промокод активирован!'}] });

        
    } else {
      res.json({ response: [{status: 'error', error_code: 2, error_description: 'One of parameter is missing!'}] });
      
    }
});


app.get("/api/bot.hahaban",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].ban = true
  var banneduserid = base[query.id];
  base[query.id].reason = "Аккаунт заблокирован администрацией."
  res.json({ response: [{status: 'ok'}] });

});

app.get("/api/bot.unbanhaha",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].ban = false
  res.json({ response: [{status: 'ok'}] });


});

app.get("/api/bot.setbalance",  (req, res) => { // API: users.ban
let query = req.query;

 
  base[query.id].balance = Number(query.sum)
  res.json({ response: [{status: 'ok', balance: base[query.id].balance}] });

});


app.get("/api/bot.addbalance",  (req, res) => { // API: users.ban
let query = req.query;

 
  base[query.id].balance += Number(query.sum)
  res.json({ response: [{status: 'ok', balance: base[query.id].balance}] });

});

app.get("/api/bot.addescore",  (req, res) => { // API: users.ban
let query = req.query;

 
  base[query.id].pole1 += Number(query.sum)
  res.json({ response: [{status: 'ok', score: base[query.id].pole1}] });

});

app.get("/api/bot.unaddbalance",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].balance -= Number(query.sum)
  res.json({ response: [{status: 'ok', balance: base[query.id].balance}] });


});

app.get("/api/bot.unaddemer",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].gold -= Number(query.sum)
  res.json({ response: [{status: 'ok', gold: base[query.id].gold}] });


});

app.get("/api/bot.addemer",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].gold += Number(query.sum)
  res.json({ response: [{status: 'ok', gold: base[query.id].gold}] });


});

app.get("/api/bot.addemer",  (req, res) => { // API: users.ban
let query = req.query;

  base[query.id].playedsec += 1
  res.json({ response: [{status: 'ok', playedSeconds: base[query.id].playedsec}] });


});

app.get("/api/bot.getBalance",  (req, res) => { // API: users.ban
let query = req.query;

  let adBonus = base[query.id].limit - 10000;
  res.json({"balance":base[query.id].balance,"score":base[query.id].pole1,"second":base[query.id].mine,"click":base[query.id].click});


});


app.get("/api/admin.changeKey",  (req, res) => { // API: users.ban
let query = req.query;
let newkey = query.key;

  base[query.id].apikey = newkey
  res.json({ response: [{status: 'ok'}] });


});

app.get("/api/api.balance",  (req, res) => { // API: users.ban
let query = req.query;
let key = query.token;

  if(key == base[query.id].apikey)
  {
res.json({ response: [{status: 'ok', balance: base[query.id].balance}] });
  }


});

app.get("/api/api.getHistory",  (req, res) => { // API: users.ban
let query = req.query;
let key = query.token;

  if(key == base[query.uid].apikey)
  {
let his = []

    for (i in base[query.uid].transfers) {
      if (base[query.uid].transfers[i].operation == 'in') {
        his.unshift({
          operation: 'in',
          sum: base[query.uid].transfers[i].sum,
          from_id: base[query.uid].transfers[i].from_id,
          key: base[query.uid].transfers[i].key,
          from_name: base[base[query.uid].transfers[i].from_id].name,
          from_photo: base[base[query.uid].transfers[i].from_id].photo
        })
      }

      if (base[query.uid].transfers[i].operation == 'to') {
        his.unshift({
          operation: 'to',
          sum: base[query.uid].transfers[i].sum,
          to_id: base[query.uid].transfers[i].to_id,
          key: base[query.uid].transfers[i].key,
          to_name: base[base[query.uid].transfers[i].to_id].name,
          to_photo: base[base[query.uid].transfers[i].to_id].photo
        })
      }
  }

      res.json({ response: [{status: 'ok', history: his}] });
  }


});

app.get("/api/api.transfer",  (req, res) => { // API: users.ban
let query = req.query;
let key = query.token;
let sum = query.sum;
let toid = query.toid;
let fromid = query.fromid;
let tobalance = parseInt(base[query.toid].balance) + parseInt(sum);

  if(key == base[query.fromid].apikey)
  {
    if(!Number(query.toid) || !Number(query.fromid) || toid == fromid || !Number(query.sum) || query.sum == null || query.sum == NaN) {
      res.json({ response: [{status: 'error', code: 1}] });
    } else {
      if(base[query.fromid].balance > sum)
      {
         base[query.fromid].balance -= Number(query.sum)
         base[query.toid].balance = tobalance
         res.json({ response: [{status: 'ok', to_id: toid, sum: sum}] });
      } else
      {
        res.json({ response: [{status: 'error', code: 2}] });
      }
    }
  } else
  {
    res.json({ response: [{status: 'error', code: 3}] });
  }


});


setInterval(() => {
  for (k in base) {
    if (base[k].second == 0) {
      base[k].online = false;
    }
  }
}, 5000)
setInterval(() => {
  for (k in base) {
    if (base[k].second > 25) {
      base[k].ban = true
      base[k].reason = 'Аккаунт был заблокирован за использование автокликера.'
    }
    base[k].second = 0
  }
}, 1000)
httpsServer.listen(9090)
console.log("коен");