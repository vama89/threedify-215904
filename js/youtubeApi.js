//50 is the max search result

function start() {
// Initializes the client with the API key and the Translate API.
	gapi.client.init({
		'apiKey': 'AIzaSyAaqw2jRnJbARzDf9tKjgz85LvysqeNNog',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
	}).then(function() {
// Executes an API request, and returns a Promise.
// The method name `language.translations.list` comes from the API discovery.
		return gapi.client.youtube.search.list({
			'part': 'snippet',
			'maxResults': '25',
			'q': 'surfing'
		});
	}).then(function(response) {
		console.log(searchTerm);
		console.log(response);
		}, function(reason) {
		console.log('Error: ' + reason.result.error.message);
		});
}

// Loads the JavaScript client library and invokes `start` afterwards.
function triggerYoutubeSearch(){
	gapi.load('client', start);
}
