var Twit = require('twit');
var config = require('./config');
// console.log(config);
var T = new Twit(config);
var fs = require('fs')
var exec = require('exec');

function getTweet(){
	var params = {
		q: 'coding',
		count:2
	}
	T.get('search/tweets', params, gotData);

	function gotData(err,data,response) {
	// body...
	var tweets = data.statuses;
	for (var i = 0;i<tweets.length;i++){

		console.log(tweets[i].text);
	}
	// console.log(data);
};
}

//setting up user stream
var stream  =T.stream('user');

	// stream.on('follow',followed);

	// function followed(eventMsg){
	// 	var name = eventMsg.source.name;
	// 	var screenName = eventMsg.source.screen_name;
	// 	tweetIt('.@' + screenName + 'hey thanks for connecting!');
	// }

stream.on('tweet',tweetEvent);

function tweetEvent(){
	// when someone tweets you this event is triggred and all
	// data goes to json file

	// var json = JSON.stringify(eventMsg,null,2);
	// fs.writeFile("tweet.json",json);

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.screenName;

	if (replyto === "traviconn18"){
		var newtweet = '@' + from + 'I,ll get back to you';
		tweetIt(newtweet);
	}

}

//20 seconds
// setInterval(tweetIt,1000*20)

// tweetIt();
// function tweetIt(txt){
	// var cmd =  
	// exec(cmd,processing); 

processing();
	function processing(){
		var filename = './ic_movie.png';
		var params = {
			encoding: 'base64'
		}
		var b64 = fs.readFileSync(filename, params);
		
		T.post('media/upload', { media_data: b64 }, uploaded);
		
		function uploaded(err, data, response){
			var id = data.media_id_string;
			var tweet = {
				status : '#coding live with images:',
				media_ids: [id]
			}
			T.post('statuses/update', tweet, tweeted);
		}
		
	
	// var r = Math.floor(Math.random()*100);

	// array1 = ["abh","asdas","asdasd"]

	// for (var i =0;i<array1.length;i++){

function tweetIt(txt){
	var tweet = {
		// you can't tweet same tweet at multiple time
		// status: 'here is random array ' + array1[i] + 'with random number' + r +' #coding is must'
		status: txt
	}
	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err){
			console.log(err);
		}else {
			console.log("it worked!");
		}
	}

}
// }

