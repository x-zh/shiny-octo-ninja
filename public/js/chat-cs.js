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
    var tab = $scope.findTab(data.gid);
    if(tab){
      $scope.tabs[i].messages.push(data.content);
    }
    else{
    console.log("new guest, new tab");
    $scope.tabs.push({gid:data.gid, messages:[data.content],toSendMessage:""});
    }
});

$scope.findTab = function(guestId){
    for(i in $scope.tabs){
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
