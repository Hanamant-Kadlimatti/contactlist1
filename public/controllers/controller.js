function AppCtrl($scope, $http) {
console.log(" Hello World From Controller");

var refresh = function() {

var ff = function(){
    var f = function(){
        console.log("Hi");
    }();
};
$http.get('/contactlist').success(function(response) {
   console.log("I get the data I requested");
   $scope.contactlist = response;
   $scope.contact="";
});
};
refresh();
$scope.addContact = function() {

console.log($scope.contact)//this is going to send to the console, the information in the  input box
//below line sense input data to server
$http.post('/contactlist', $scope.contact).success(function(response) {
console.log(response);
refresh();

});
};
$scope.remove = function(id) {
console.log(id);
$http.delete('/contactlist/' + id).success(function(response){
refresh();
});

};
$scope.edit = function(id) {
console.log(id);
$http.get('/contactlist/' + id).success(function(response) {
$scope.contact = response;
});
};
$scope.update= function() {
console.log($scope.contact._id);
$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
refresh();
});
};
$scope.deselect = function() {
$scope.contact="";
}
}