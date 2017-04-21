var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

const writeToFile = (data, filename) => {
  fs.writeFile(path.join('../../cacheData/' +filename), data, (error) => {
    if(error){ console.log('Error:', error)}
      else {console.log(filename, 'successfully written to', __dirname)}
  } )
}

var cacheHtml = function(){
  // get HTML from remote site
  request('http://www.nonleaguematters.co.uk/divisions/162/', function(err, res, html){

  //catch any errors in http request
    if(err){
      console.log(err);
      return;
    }

  // use cheerio to select required info from from requested html
    $ = cheerio.load(html);
    var leagueTable = $('table.league');
    var results = $('div.resultsmonth');
    var forthcoming = $('div.fixturesmonth');

  // save selected html to disk
    writeToFile(leagueTable, 'cacheLeagueData.html');
    writeToFile(results, 'cacheResults.html');
    writeToFile(forthcoming, 'cacheForthcoming.html');


  });
}


cacheHtml();