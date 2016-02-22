'use strict';
  angular.module('cherukuwadaApp')
  .factory('UserFactory', function() {
    var o = {
      currentUser: {}
    };
    o.data = [
      {name: 'Raghu Varma R', userName: 'Raghu', password: 'raghuvarma', mobile: '9949474544', isAdmin: true, imageUrl: '../img/user_male.png'},
      {name: 'Ashok Raju M', userName: 'Ashok', password: 'familymember', mobile: '9059821134', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Bangar Raju M', userName: 'Bangaram', password: 'familymember', mobile: '9663349900', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Bharathi M', userName: 'Bharathi', password: 'familymember', mobile: '9640691983', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'Kiran Mayi', userName: 'Kiran', password: 'familymember', mobile: '7093599249', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'P S R A Raju', userName: 'Anji', password: 'familymember', mobile: '9000630789', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Pujitha', userName: 'Pujitha', password: 'familymember', mobile: '9731247686', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'Renuka', userName: 'Renuka', password: 'familymember', mobile: '9885480785', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'Maheswari K', userName: 'Maheswari', password: 'familymember', mobile: '9666485417', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'Sai M', userName: 'Sai', password: 'familymember', mobile: '9885549966', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Bharath M', userName: 'Nani', password: 'familymember', mobile: '9945143489', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Sindhu', userName: 'Sindhu', password: 'familymember', mobile: '9989947733', isAdmin: false, imageUrl: '../img/user_female.png'},
      {name: 'Sudheer G', userName: 'Sudheer', password: 'familymember', mobile: '9441881902', isAdmin: false, imageUrl: '../img/user_male.png'},
      {name: 'Vaishnavi M', userName: 'Vaishnavi', password: 'familymember', mobile: '8008823577', isAdmin: false, imageUrl: '../img/user_female.png'}
    ];
    o.updateUser = function(data) {
      o.data.splice(0,0,data);
    }
    o.saveCurrentUser = function(data) {
      o.currentUser = data;
    };
    return o;
  })