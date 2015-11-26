/* globals angular, moment, screenfull */

'use strict';
angular.module('clapperboard', ['hmTouchEvents','ngStorage'])
  .config(function($localStorageProvider){
    $localStorageProvider.setKeyPrefix('clapperboard');
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

    $scope.fullscreen = function(){
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    };

  })
  .directive('clapper',function(){
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="clapper"><div class="top"></div><div class="bottom"></div>'
    };
  })
  .directive('timer',function(){
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="timer"><span></span></div>',
      link: function(scope,element){
        var interval;
        var paused = true;
        var span = element.find('span');
        var update = function(){
          span.text(moment().format('hh:mm:ss.SS'));
          interval = window.requestAnimationFrame(update);
        };
        scope.pause = function(){{
          window.cancelAnimationFrame(interval);
          paused = true;
        }};
        scope.resume = function(){{
          interval = window.requestAnimationFrame(update);
          paused = false;
        }};
        span.text(moment().format('hh:mm:ss.SS'));
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

