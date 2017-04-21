var assert = require('assert');
var Table = require('../Table');
var Team = require('../Team');

describe('table', function(){

  var table;
  var team;

  beforeEach(function(){
    table = new Table();
    
    team1 = new Team({
      p: 5,
      pts: 15,
      gd: 10,
      ol: 0,
      od: 0
    });

    team2 = new Team({
      p: 6,
      pts: 6,
      gd: 0,
      ol: 0,
      od: 6
    });

  });

  it('instantiates empty', function(){
    assert.equal(table.teams.length, 0);
  });

  it('can add teams', function(){
    table.addTeam(team1);
    assert.equal(table.teams.length, 1);
  });

  it('can calculate average ppg', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setAveragePPG();
    assert.equal(table.avPPG, 2);
  });

  it('can calculate average gdpg', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setAverageGDPG();
    assert.equal(table.avGDPG, 1);
  });

  it('can calculate average possible', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setAveragePoss();
    assert.equal(table.avPoss, 63);
  });

  it('automatically sets averages when team is added', function(){
    table.addTeam(team1);
    assert.equal(table.avPPG, 3);
    assert.equal(table.avGDPG, 2);
    assert.equal(table.avPoss, 66);
    table.addTeam(team2);
    assert.equal(table.avPPG, 2);
    assert.equal(table.avGDPG, 1);
    assert.equal(table.avPoss, 63);
  });

  it('can get stdev of ppg', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setSdPPG();
    assert.equal(table.sdPPG, 1.414);
  });

  it('can get stdev of gdpg', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setSdGDPG();
    assert.equal(table.sdGDPG, 1.414);
  });

  it('can get stdev of possible', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setSdPoss();
    assert.equal(table.sdPoss, 4.243);
  });

  it('automatically sets SDs when team is added', function(){
    table.addTeam(team1);
    assert.equal(table.sdPPG, 0);
    assert.equal(table.sdGDPG, 0);
    assert.equal(table.sdPoss, 0);
    table.addTeam(team2);
    assert.equal(table.sdPPG, 1.414);
    assert.equal(table.sdGDPG, 1.414);
    assert.equal(table.sdPoss, 4.243);
  });

  it('can set the score variable of held teams', function(){
    table.addTeam(team1);
    table.addTeam(team2);
    table.setScores();
    assert.equal(table.teams[0].score, 594);
    assert.equal(table.teams[1].score, 311);
  });


})