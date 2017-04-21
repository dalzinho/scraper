var math = require('mathjs');

var Table = function(){
  this.teams = [];
}

Table.prototype = {
  addTeam: function(team){
    this.teams.push(team);


  },

  setAveragePPG: function(){
    var totalPPG = 0;
    
    this.teams.forEach(function(team){
      totalPPG += parseFloat(team.ppg);
    });

    this.avPPG = totalPPG / this.teams.length;
  },

  setAverageGDPG: function(){
    var totalGDPG = 0;

    this.teams.forEach(function(team){
      totalGDPG += parseFloat(team.gdpg);
    });

    this.avGDPG = totalGDPG / this.teams.length;
  },

  setAveragePoss: function(){
    var totalPoss = 0;

    this.teams.forEach(function(team){
      totalPoss += parseFloat(team.poss);
    })

    this.avPoss = totalPoss / this.teams.length;
  },

  setAverages: function(){
    this.setAveragePPG();
    this.setAverageGDPG();
    this.setAveragePoss();
  },

  setSdPPG: function(){
    var ppg = this.teams.map(function(team){
      return team.ppg;
    })

    this.sdPPG = math.std(ppg, 'uncorrected').toFixed(3);
  },

  setSdGDPG: function(){
    var gdpg = this.teams.map(function(team){
      return team.gdpg;
    });
    this.sdGDPG = math.std(gdpg, 'uncorrected').toFixed(3);
  },

  setSdPoss: function(){
    var poss = this.teams.map(function(team){
      return team.poss;
    });
    this.sdPoss = math.std(poss, 'uncorrected').toFixed(3);
  },

  setSDevs: function(){
    this.setSdPPG();
    this.setSdGDPG();
    this.setSdPoss();
  },

  setScores: function(){
    var avPPG = this.avPPG;
    var sdPPG = this.sdPPG;
    var avGDPG = this.avGDPG;
    var sdGDPG = this.sdGDPG;
    var avPoss = this.avPoss;
    var sdPoss = this.sdPoss;

    this.teams.forEach(function(team){
      var rawPPG = (team.ppg - avPPG) / sdPPG;
      var rawGDPG = (team.gdpg - avGDPG) / sdGDPG;
      var rawPoss = (team.poss - avPoss) / sdPoss;

      var ppgScore = parseFloat(rawPPG.toFixed(4));
      var gdpgScore = parseFloat(rawGDPG.toFixed(4));
      var possScore = parseFloat(rawPoss.toFixed(4));

      var rawStandard = (ppgScore + (0.2 * gdpgScore) + (0.2 * possScore)) / 3;      

      var teamScore = Math.floor(500 + (200 * rawStandard));
      team.setScore(teamScore, possScore, gdpgScore, ppgScore);
    });
  },

  setStats: function(){
    this.setAverages();
    this.setSDevs();
    this.setScores();
  }
}


module.exports = Table;