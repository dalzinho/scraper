var Team = function(options){
  this.rank = parseInt(options.rank);
  this.name = options.name;
  this.p = parseInt(options.p);
  this.ow = parseInt(options.ow);
  this.od = parseInt(options.od);
  this.ol = parseInt(options.ol);
  this.of = parseInt(options.of);
  this.oa = parseInt(options.oa);
  this.hw = parseInt(options.hw);
  this.hd = parseInt(options.hd);
  this.hl = parseInt(options.hl);
  this.hf = parseInt(options.hf);
  this.ha = parseInt(options.ha);
  this.hgd = "";
  this.hpts = "";
  this.aw = parseInt(options.aw);
  this.ad = parseInt(options.ad);
  this.al = parseInt(options.al);
  this.af = parseInt(options.af);
  this.aa = parseInt(options.aa);
  this.agd = "";
  this.apts = "";
  this.gd = parseInt(options.gd);
  this.pts = parseInt(options.pts);


  this.setGoalDifference();
  this.setPoints();
  this.setAverages();
};

Team.prototype = {


  setGoalDifference: function(){
    this.hgd = this.hf - this.ha;
    this.agd = this.af - this.aa;
  },

  setPoints: function(){
    this.hpts = (3*this.hw) + this.hd;
    this.apts = (3*this.aw) + this.ad;
  },

  setAverages: function(){
    this.ppg = parseFloat((this.pts / this.p).toFixed(2));
    this.gdpg =  parseFloat((this.gd / this.p).toFixed(2));
    this.poss = 66 - ( 3 * this.ol) - (2 * this.od);
  },

  setScore: function(score, stPoss, stGDPG, stPPG){
    this.stPoss = stPoss;
    this.stGDPG = stGDPG;
    this.stPPG = stPPG;
    this.score = score;
    
  }


}

module.exports = Team;

// var Team = function(rank, name, p, hw, hd, hl, hf, ha, aw, ad, al, af, aa){
