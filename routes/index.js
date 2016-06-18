var express = require('express');
var router = express.Router();
var request=require('request'),
    jsdom = require('node-jsdom');

/* GET home page. */
router.get('/:currency?', function(req, res, next) {
  request.get({url:`http://m.minfin.com.ua/currency/banks/${req.params.currency}/`,
                headers:{Host:"m.minfin.com.ua",
                    "User-Agent":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
                    Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language":"en-US,en;q=0.5",
                    //"Accept-Encoding":"gzip, deflate",
                    "encoding": "text/html;charset='charset=utf-8'",
                    Connection:"keep-alive",
                "Cache-Control":"max-age=0"}},
      (err,headers,body)=>{
          jsdom.env(body, (err,window)=>{
              // thead=window.document.querySelector('#smTable thead').innerHTML;
              var tbl= window.document.getElementById('smTable');
              // while (tbl.getElementById('smTable').nextSibling)
              //   tbl.removeChild(tbl.getElementById('smTable').nextSibling)
              tbody=tbl.outerHTML;
              // tbody=tbl.childNodes[3].innerHTML
              css = Array.from(window.document.querySelectorAll('link[rel="stylesheet"]'))
                  .map(x=>{
                      if (/^\//.test(x.getAttribute('href')))
                          x.setAttribute('href',`http://m.minfin.com.ua${x.getAttribute('href')}`);
                      return x.outerHTML})
                  .join('');
              res.send(`<!DOCTYPE html>
              <html>
              <head>
              ${css}
              <link rel='stylesheet' href='/stylesheets/style.css'>
              <script src='javascripts/filter.js'></script>
              </head>
              <body>
              <h4>средний курс</h4>
              <div class='col-2-top'>
                <div class='col-1'>в кассах банков<br>
                    <div class='col-2' id='buyB'>покупка<br></div>
                    <div class='col-2' id='sellB'>продажа<br></div>
                </div>
              </div>  
              <div class='col-2-top'>
                <div class='col-1'>при оплате картой<br>
                    <div class='col-2' id='buyC'>покупка<br></div>
                    <div class='col-2' id='sellC'>продажа<br></div>
                </div>
              </div>
              ${tbody}
              </body>
              </html>`);
              window.close();
          });
          
  });


});

module.exports = router;
