(function(window, jQuery){

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

		switch(request.msg) {
			case "save_session":
				var data = request.data;
				localStorage.setItem('id', data.id);
				localStorage.setItem('token', data.token);
				localStorage.setItem('username', data.username);
				localStorage.setItem('displayName', data.displayName);
				sendResponse({
					msg : "Successfully Saved"
				});
				break;
			case "check_session":
				var id = localStorage.getItem("id");
				var token = localStorage.getItem("token");
				var username = localStorage.getItem('username');
				var displayName = localStorage.getItem('displayName');
				if(id == undefined){
					sendResponse({
						status: false
					});
				} else {
					sendResponse({
						status: true,
						data: {
							id: id,
							token: token,
							username: username,
							displayName : displayName
						}
					});
				}
				break;
			case "remove_session":
				localStorage.removeItem("id");
				localStorage.removeItem("token");
				localStorage.removeItem('username');
				localStorage.removeItem('displayName');
				sendResponse({
					msg: 'Removed successfully'
				})
				break;
			default:
				break;
		}
	});

})(window, $);
