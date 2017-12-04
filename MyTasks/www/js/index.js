/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

    var taskText = document.getElementById("task");
    var showtasks = document.getElementById("showtasks");
    
    
    function save(task) {

    // Get a reference to the database service
    var firebaseRef = firebase.database().ref();
     task = taskText.value;
        
    firebaseRef.child("MyTasks/").push().set({
        Task: task,
        
        
    });
    
    display();
    console.log("save successful");
   
    
}

 function display() {
        
    var eventRef = firebase.database().ref("MyTasks/");
    
    showtasks.innerHTML= "";
    
    eventRef.orderByChild("Task").on("child_added", function(data) {
        
        showtasks.innerHTML += "<div class='panel-heading br' id='" +data.val().Task +"' >" + data.val().Task + " <i class='fa fa-times pull-right fa-2x' aria-hidden='true' id='"+ data.key +"' onclick='deleteTask(this.id)'></i><i class='fa fa-check pull-right fa-2x name' id='" +data.val().Task +"'  onclick='strikeThrough(this.id)' aria-hidden='true'></i></div>";
        console.log(data.val().Task);
        console.log(data.key);
        
    });
    
         
    
}
 
 function deleteTask(id) {
     
     taskName = showtasks.textContent;
     
     var eventRef = firebase.database().ref("MyTasks/" + id);
     
     eventRef.remove();   
     display();
     
 }
 
 function strikeThrough(id) {
     
     
     var element = document.getElementById(id);
  element.classList.toggle("done");
 }



app.initialize();