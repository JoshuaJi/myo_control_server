// myo
var Myo = require('myo');
var request = require('request');
var sleep = require('sleep');
require('./flex.myo.js');
require('./snap.myo.js');
require('./hardtap.myo.js');

var lights_or_tv = 1;

Myo.connect();

Myo.on("connected", function(data, timestamp) {
  console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
});
Myo.on('fist', function(){
    console.log('fist gesture');
    if(lights_or_tv){
        request.post('http://192.168.2.41:3000/wemo', {json:{'state':'off'}});
        request.put('http://192.168.2.13/api/newdeveloper/groups/0/action', {json:{'on':false}});
    }else{
    	request.post('http://192.168.2.41:3000/chromecast', {json:{'state':'pause'}});
        // this.vibrate();
    }

});

Myo.on('fingers_spread', function(){
    console.log('finger spread gesture');
    // this.vibrate();

});

Myo.on('snap', function(){
    console.log('snap gesture');
    if (lights_or_tv){
    request.post('http://192.168.2.41:3000/wemo', {json:{'state':'on'}});
    request.put('http://192.168.2.13/api/newdeveloper/groups/0/action', {json:{'on':true}});
}else{
	request.post('http://192.168.2.41:3000/chromecast', {json:{'state':'play'}});
}
    sleep.sleep(1);
    // this.vibrate();
});

Myo.on('hard_tap', function(){
    console.log('hard tap');
    lights_or_tv = !lights_or_tv;
    sleep.sleep(1);
    // this.vibrate();
});