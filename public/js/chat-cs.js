var app = angular.module('chatCS', ['ui.bootstrap','btford.socket-io']);
app.factory('socket', function(socketFactory){ return socketFactory(); });

app.controller('chatCtrl', function ($scope, socket) {
    $scope.tabs = []; 
    //$scope.tabs = [{gid:'2', messages:['afeaf','af','aaaaaa'],toSendMessage:""},{gid:'1', messages:['123','222','333333'],toSendMessage:""}];
    $scope.toSendMessage = '';


    socket.on('connect', function(){
        socket.emit('cs connected', $('#uid').val());
    });

    socket.on('message', function(data){
        var index = $scope.findTab(data.gid);
        if(index){
          $scope.tabs[index].messages.push(data.content);
        }
        else{
        console.log("new guest, new tab");
        $scope.tabs.push({gid:data.gid, messages:[data.content],toSendMessage:""});
        }
    });

    socket.on('guest disconnect', function(gid){
        var index = $scope.findTab(gid);
        $scope.tabs[index].messages.push("guest disconnected");
        console.log("guest dics"+gid);
    });

    $scope.findTab = function(guestId){
        for(var i in $scope.tabs){
            if($scope.tabs[i].gid==guestId) 
            {
                return i;
            }
        }
        return null;
    };

    $scope.sendMessage = function(guestId){
        var tab = $scope.tabs[$scope.findTab(guestId)];
        socket.emit('message', {content: tab.toSendMessage, gid:guestId, from:1});
        tab.messages.push(tab.toSendMessage);
        tab.toSendMessage='';
    };

    $scope.closeTab = function(guestId){
        var index = $scope.findTab(guestId);
        $scope.tabs.splice(index,1);
    };
  
});
