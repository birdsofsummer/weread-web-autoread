const myWorker = new Worker("worker.js");
myWorker.onmessage = function(e) {
		console.log(e.data);
		console.log('Message received from worker');
}

str2worker=()=>{
    var response = "self.onmessage=function(e){postMessage('Worker: '+e.data);}";
    var blob = new Blob([response], {type: 'application/javascript'});
    var worker = new Worker(URL.createObjectURL(blob));
    //var worker = new Worker('data:application/javascript,' + encodeURIComponent(response) );
    // Test, used in all examples:
    worker.onmessage = function(e) {
        alert('Response: ' + e.data);
    };
    worker.postMessage('Test');
}



