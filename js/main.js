/* globals angular, moment */

'use strict';
angular.module('clapperboard', ['hmTouchEvents','ngStorage'])
  .config(function(){
    moment.locale('zh-cn');
  })
  .controller('clapperboardCtrl',function($scope, $localStorage){

    $scope.$storage = $localStorage.$default({
      production: '',
      director: '',
      chapter: '',
      camera: 1,
      take: 1
    });

    $scope.date = moment().format('YYYY 年 MM 月 DD 日');

    $scope.up = function(key){
     if($scope.$storage[key] < 0 ){
       $scope.$storage[key] = 0;
     }else{
       $scope.$storage[key] ++;
     }

    };

    $scope.down = function(key){
      if($scope.$storage[key] <= 0 ){
        $scope.$storage[key] = 0;
      }else{
        $scope.$storage[key] --;
      }
    };

  })
  .directive('clapper',function(){
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="clapper"><div class="top"></div><div class="bottom"></div></clapper>',
      link:function(element, scope){
        // console.log(scope);
      }
    };
  })
  .directive('timer',function(){
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="timer"></div>',
      link: function(scope,element){
        var update = function(){
          var string = moment().format('hh:mm:ss.SS');
          element.text(string);
        };
        var interval;
        var paused = true;
        scope.pause = function(){{
          clearInterval(interval);
          paused = true;
        }};
        scope.resume = function(){{
          interval = setInterval(update,10);
          paused = false;
        }};
        update();
        element.on('click',function(){
          if(paused){
            scope.resume();
          }else{
            scope.pause();
          }
        });
      }
    };
  });

