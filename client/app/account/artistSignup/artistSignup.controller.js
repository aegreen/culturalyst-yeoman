'use strict';

class ArtistSignupController {
  //start-non-standard
  user = {
    //catalyst: true,
    //creative: true
  };
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $log, $scope, $http, $timeout, MediaList) {
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
    this.$scope.currentUser = this.Auth.getCurrentUser();
    this.$timeout = $timeout;
    this.MediaList = MediaList;
    this.$scope.list = [];
    this.$scope.rewards = this.showRewards() || [];
    this.$scope.newReward = {};
    this.$scope.mediaList = this.MediaList.getMediaList();
  }

  //currentUser() {
  //  return this.Auth.getCurrentUser;
  //}

  loadSubMediums(medium) {
    this.$scope.selectedMedium = medium.name;
    this.$scope.submedia = medium.submedia;
  };

  // go to content
  register() {
    let context = this;

    this.$http.put('/api/users/' + this.$scope.currentUser._id + '/updateArtistInfo', {
      bio: context.$scope.bio,
      medium: context.$scope.selectedMedium,
      submedium: context.$scope.selectedSubmedium
    });

    this.$state.go('artistSignupContent');
    //.then(() => {
    //  context.$timeout(this.$state.go('artistSignupContent'), 1000);
    //  //this.$state.go('main');
    //});

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('artistSignupContent');
    //  });

    //this.$state.go('artistSignupContent');

  }

  // go to rewards
  content() {

    // refactor to grab from the html forms
    //this.Auth.updateUserInfo({
    //    name: this.user.name
    //    //what properties do we need to grab from
    //  })
    //  .then(() => {
    //    this.$state.go('artistSignupRewards');
    //  });

    this.$state.go('artistSignupRewards');

  }

  //list(){}

  addField() {
    this.$log.log('this was called');
    this.list.push({});
  };

  showRewards() {
    let context = this;
    this.Auth.getCurrentUser(function(user) {
      context.$http.get('api/rewards/myRewards/' + user._id)
      .then(function(res) {
        context.$scope.rewards = res.data;
        console.log(context.$scope.rewards);
      })
    })
  }

  // go to main
  saveReward() {
    let context = this;
    console.log(context.$scope.newReward);

    this.$http.post('/api/rewards/newReward/' + context.$scope.currentUser._id, context.$scope.newReward).then(function(res) {
      context.$scope.rewards.push(context.$scope.newReward);
      context.$scope.newReward = {};
    })
    
  }

  deleteReward() {
    console.log("DELETING!")
    // this.$http.delete('/api/rewards/' + id).then(function(res) {
    //   console.log(res);
    // }
  }

  done() {
    this.state.go('main');
  }
}

angular.module('culturalystApp')
  .controller('ArtistSignupController', ArtistSignupController);
