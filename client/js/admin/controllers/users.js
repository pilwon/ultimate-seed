/*
 * client/js/admin/controllers/users.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('UsersCtrl', function ($scope, user) {

    $scope.minDate = Date.now();
    $scope.opened = false;
    $scope.procedure = 'save';
    $scope.countUser = 0;
    $scope.sortCourse = 1;
    $scope.sortField = 'email';
    $scope.limitList = [10, 20, 30];
    $scope.limit = $scope.limitList[0];
    $scope.page = 1;

    $scope.currentUser = {};

    $scope.userList = [];

    var User = user;

    $scope.goChange = function(item) {
      $scope.currentUser = item;
      $scope.procedure = 'modify';
    };

    $scope.goDelete = function(item) {
      $scope.currentUser = item;
      $scope.procedure = 'delete';
    };

    $scope.goList = function(sortField) {
      if ($scope.sortField === sortField) {
        $scope.sortCourse = $scope.sortCourse * -1;
      } else {
        $scope.sortField = sortField;
        $scope.sortCourse = 1;
      }
      $scope.UserList();
    };

    $scope.removeRole = function(role) {
      $scope.currentUser.roles = _.without($scope.currentUser.roles, role);
    };

    $scope.addRole = function(role) {
      $scope.currentUser.roles.push(role);
    };

    $scope.openDatepicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.getClassBan = function (dt) {
      dt = new Date(dt).getTime()
      return dt <= $scope.minDate ? 'label-default' : 'label-danger';
    }

    $scope.UserSave = function(tmodel) {
      User.save({
          role : 'admin'
        },
        {
          email : user.email
        },
        function() {
          $scope.user._id = null;
          $scope.user.testfield = null;
          $scope.UserList();
        },
        function(errResp) {
          console.log(errResp);
        }
      );
    };

    $scope.UserPut = function(user) {
      User.modify({
          role : 'admin',
          _id : user._id
        }, user,
        function() {
          $scope.user._id = null;
          $scope.user.testfield = null;
          $scope.UserList();
        },
        function(errResp) {
          console.log(errResp);
        }
      );
    };

    $scope.UserDelete = function(user) {
      User.remove({
          role : 'admin',
          _id : user._id
        },
        function() {
          $scope.UserList();
        },
        function(errResp) {
          console.log(errResp);
        }
      );
    };

    $scope.UserList = function() {
      User.get({
          role : 'admin',
          sortfield : $scope.sortField,
          sortcourse : $scope.sortCourse,
          limit : $scope.limit,
          page : $scope.page-1
        },
        function(data) {
          $scope.countUser = data.result.count;
          $scope.userList = data.result.list;
        },
        function(errResp) {
          console.log(errResp);
        }
      );
    };

    $scope.UserList();

  });
};
