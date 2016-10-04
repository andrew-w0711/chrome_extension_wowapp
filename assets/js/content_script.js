(function(window, jQuery) {
	/* Month List */
	var month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	/* FORMATTING NUMBER IN THOUSANDS */
	function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	/* ADD MY CUSTOM CSS TO THE GOOGLE NEW PAGE */
	$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("/assets/css/normalize.css") + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("/assets/css/demo.css") + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("/assets/css/set1.css") + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("/assets/css/app.css") + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("/assets/css/custom.css") + '" type="text/css" />');
	$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css" />');
	$('head').append('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');

	/* AD UNIT TOP ( 728 x 90 ) */
	var ad_top_script = document.createElement("script");
	ad_top_script.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
	document.head.appendChild(ad_top_script);

	/* AD UNIT TOP ADDING */
	if(window.innerWidth >= 1380){
		$('<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px;margin-top:10px" data-ad-client="ca-pub-9927721934081285" data-ad-slot="7410333858"></ins>').insertBefore($("#lga"));
	} else {
		$('<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px;margin-top:10px;margin-right:-120px" data-ad-client="ca-pub-9927721934081285" data-ad-slot="7410333858"></ins>').insertBefore($("#lga"));
	}

	/* AD UNIT RIGHT ( 728 x 90 ) */
	var ad_top_script = document.createElement("script");
	ad_top_script.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
	document.head.appendChild(ad_top_script);

	/* AD UNIT RIGHT ADDING */
	if(window.innerWidth >= 1380){
		$('<ins class="adsbygoogle" style="display:inline-block;width:300px;height:600px;position:absolute;right:10px;top:50%;margin-top:-300px" data-ad-client="ca-pub-9927721934081285" data-ad-slot="8887067058"></ins>').insertBefore($("#lga"));
	} else if((window.innerWidth >= 1300) && (window.innerWidth < 1380)){
		$('<ins class="adsbygoogle" style="display:inline-block;width:160px;height:600px;position:absolute;right:10px;top:50%;margin-top:-300px" data-ad-client="ca-pub-9927721934081285" data-ad-slot="8887067058"></ins>').insertBefore($("#lga"));
	} else {
		$('<ins class="adsbygoogle" style="display:inline-block;width:120px;height:600px;position:absolute;right:10px;top:50%;margin-top:-300px" data-ad-client="ca-pub-9927721934081285" data-ad-slot="8887067058"></ins>').insertBefore($("#lga"));
	}


	/* CHANGING CURRENT GOOGLGE LOGO  TO WOWAPP LOGO */
	$("#hplogo").attr("src",chrome.extension.getURL("/assets/img/wowapp_logo.png"));
	$("#logo-sub").remove();
	$("#hplogo").css({"padding-top" : 0, "width" : "272px","height" : "77.5px"});
	$("#lga").css("height", "128px");
	$("#mngb").remove();
	$("#most-visited").css({"margin-top" : "70px"});

	/* SEARCH BAR ADDING */
	$('<form action="https://beta-teodoru.wowapp.com/google-results.html" id="cse-search-box" target="_blank"></form>').insertBefore($('#f'));
	$('#cse-search-box').html('<div style="width: 740px;"><input type="hidden" name="cx" value="partner-pub-9927721934081285:3885764655" /><input type="hidden" name="ie" value="UTF-8" /><input type="text" name="q" class="googleInput" placeholder="Search Google or type URL"/><input type="submit" name="sa" value="Search" class="googleButton" style="display: none;"/><i class="fa fa-search" style="right: 40px;position: relative;"></i></div>');
	$("#f").remove();

	/* ADDING LOGIN WIDGET TO THE LEFT SIDE */
	$('<div id="main-widget"></div>').insertBefore($("#lga"));
	$("#main-widget").css({
		position:"absolute",
		left: "0px",
		top: "0px",
		width: "310px",
		height: "100%"
	});

	/* LOAD MAIN WIDGET FILES */
	$("#main-widget").load(chrome.extension.getURL("/assets/html/main.html"));

	/* CUSTOMIZING VIEW PARTS */
	if(window.innerWidth < 1380){
		$("#hplogo").css({
			"margin-right" : "-120px"
		});

		$("#cse-search-box div").css({
			"margin-left" : "120px"
		});

		$("#mv-tiles").css({
			"margin-left" : "120px"
		});
	}
	/* SIGN OUT MENU SHOWING / HIDING FUNCTION */
	$(document).on('click','.arrow-bottom', function (event) {
		event.stopPropagation();
		$(".signout").toggle();
	});
	$(document).on('click', function () {
		$(".signout").hide();
	});

	/* SIGN OUT */
	$(document).on('click','.signout',function () {
		chrome.extension.sendMessage({
			msg: 'remove_session'
		}, function (response) {
			console.log(response);
			$(".black-overlap").show();
			$(".sidebar").css('-webkit-filter', 'blur(5px)');
		});
	});

	$(document).on('keyup', '#password', function (e) {
			if(e.keyCode == 13){
				$('.login_button').trigger('click');
			}
	});

	$(document).on('click','.fa-search', function () {
		$(".googleButton").trigger('click');
	});
	/* ADD LOGIN FUNCTION */
	$(document).on('click','.login_button', function () {
		var loginUrl = "https://api.wowapp.com/authentication/web/signin2";
		var datar = {
			"username": $("#username").val(),
			"password": $("#password").val()
		}

		$.ajax({
	    url: loginUrl,
	    type: 'POST',
	    data: JSON.stringify(datar),
	    headers: {
	        "Content-Type": 'application/json',   //If your header name has spaces or any other char not appropriate
	        "Accept": 'application/json'  //for object property name, use quoted notation shown in second
	    },
			dataType: "json",
	    success: function (data) {
					$(".black-overlap").hide();
					$(".sidebar").css('-webkit-filter', 'inherit');
					var username = data.account.account.username;
					var avatar = 'https://api.wowapp.com/avatar/users/' + username;
					$(".avatar").attr("src", avatar);
					$(".user-network .number").text(numberWithCommas(data.networkSize));

					var network_earnings = data.accountBalance.currentEarningsBalance;
					if(parseInt(network_earnings).toString().length > 5) {
						$(".user-earnings .number").text(numberWithCommas(parseInt(network_earnings)));
					} else if(parseInt(network_earnings).toString().length == 5){
						$(".user-earnings .number").text(numberWithCommas(parseFloat(network_earnings).toFixed(1)));
					} else {
						$(".user-earnings .number").text(numberWithCommas(parseFloat(network_earnings).toFixed(2)));
					}

					if((data.networkSize > 100000) || (parseFloat(data.accountBalance.currentEarningsBalance) > 100000)){
						$(".user-network .number").css("font-size","12px");
						$(".user-earnings .number").css("font-size","12px");
					}
					$(".name").text(data.account.account.firstName + " " + data.account.account.lastName);

					var profile_link = "https://www.wowapp.com/redirect?userAccountId=" + data.account.id + '&page=' + encodeURIComponent('account/profile') +'&token=' + 	encodeURIComponent(data.token);
					var talk_link = "https://wowapp.com/combined-earnings#talk";
					var ad_link = "https://wowapp.com/combined-earnings#adme";
					var games_link = "https://wowapp.com/combined-earnings#games";
					var web_link = "https://wowapp.com/combined-earnings#web";
					var lockscreen_link = "https://wowapp.com/combined-earnings#lockscreen";
					var network_link = "https://www.wowapp.com/redirect?userAccountId=" + data.account.id + '&page=' + encodeURIComponent('earn/earnings/statistics') +'&token=' + 	encodeURIComponent(data.token);
					var invite_link = "https://www.wowapp.com/redirect?userAccountId=" + data.account.id + '&page=' + encodeURIComponent('earn/invite/tell-your-friends') +'&token=' + 	encodeURIComponent(data.token);
					var earnings_link = "https://www.wowapp.com/redirect?userAccountId=" + data.account.id + '&page=' + encodeURIComponent('earn/earnings/history') +'&token=' + 	encodeURIComponent(data.token);
					$(".profile_link").attr("href", profile_link);
					$("#talk_link").attr("href", talk_link);
					$("#ad_link").attr("href", ad_link);
					$("#games_link").attr("href", games_link);
					$("#web_link").attr("href", web_link);
					$("#lockscreen_link").attr("href", lockscreen_link);
					$("#network_link").attr("href", network_link);
					$("#invite_link").attr("href", invite_link);
					$("#earnings_link").attr("href", earnings_link);

					chrome.extension.sendMessage({
						msg: 'save_session',
						data: {
							id : data.account.id,
							token : data.token,
							username : data.account.account.username,
							displayName: data.account.account.firstName + ' ' + data.account.account.lastName
						}
					}, function (response) {
						console.log(response);
					});

					var headers = {
						"Authorization" : "WOOWAUTH:" + data.token,
						"Accept" : "application/json, text/javascript, */*; q=0.01",
						"Content-Type" : "application/json",
						"Accept-Language" : "en-US,ro-RO;q=0.8,ro;q=0.6,en;q=0.4"
					};

					var datas = {
						"accountId": data.account.id,
						"pageNumber": -1,
						"pageSize":200
					}

					$.ajax({
						url: "https://api.wowapp.com/wallet/accounts/"+ data.account.id +"/earnings/search",
						type: 'POST',
				    data: JSON.stringify(datas),
						headers: headers,
						dataType: "json",
						success: function (response) {
							var adme_array = [] , games_array = [] ,  talk_array = [] ;
							var earningDateList = [];
							for(var i = 0 ; i < parseInt(response.earnings.length); i++){
								earningDateList.push(response.earnings[i].earningDate);
								if(response.earnings[i].type == 'ADVERTISE_ME'){
									adme_array.push(response.earnings[i]);
								}

								if(response.earnings[i].type == 'GAMES'){
									games_array.push(response.earnings[i]);
								}

								if(response.earnings[i].type.indexOf('TALK') > -1){
									talk_array.push(response.earnings[i]);
								}
							}

							var latestDate = parseInt(earningDateList[0])
							for(var i = 1 ; i < earningDateList.length ; i++){
								 if(latestDate < parseInt(earningDateList[i]))
								 {
									 latestDate = parseInt(earningDateList[i]);
								 }
							}

							var date = new Date(latestDate * 1000);
							var latest_month = month_list[date.getMonth()];
							var latest_date = date.getDate();
							var latest_day = date.getDate();

							if(latest_day == 1) {
								latest_day = '1st'
							} else if(latest_day == 2) {
								latest_day = '2nd'
							} else {
								latest_day = latest_day + 'th';
							}

							$(".latest_date").text(latest_day + ' ' + latest_month);

							var adme_price = 0, games_price = 0, talk_price = 0;

							if(adme_array.length == 0){
								adme_price = 0;
							} else {
								adme_price = 0;
								for(var i = 0 ; i < adme_array.length ; i++){
									var date = new Date(parseInt(adme_array[i].earningDate) * 1000);
									var earning_month = month_list[date.getMonth()];
									var earning_date = date.getDate();
									if((latest_month == earning_month) && (latest_date == earning_date)){
										adme_price += adme_array[i].amount;
									}
								}
							}

							$(".adme .price").text(parseFloat(adme_price).toFixed(4));

							/* TALK Price */
							if(talk_array.length == 0){
								talk_price = 0;
							} else {
								talk_price = 0;
								for(var i = 0 ; i < talk_array.length ; i++){
									var date = new Date(parseInt(talk_array[i].earningDate) * 1000);
									var earning_month = month_list[date.getMonth()];
									var earning_date = date.getDate();
									if((latest_month == earning_month) && (latest_date == earning_date)){
										talk_price += talk_array[i].amount;
									}
								}
							}

							$(".talk .price").text(parseFloat(talk_price).toFixed(4));

							/* GAMES Price */
							if(games_array.length == 0){
								games_price = 0;
							} else {
								games_price = 0;
								for(var i = 0 ; i < games_array.length ; i++){
									var date = new Date(parseInt(games_array[i].earningDate) * 1000);
									var earning_month = month_list[date.getMonth()];
									var earning_date = date.getDate();
									if((latest_month == earning_month) && (latest_date == earning_date)){
										games_price += games_array[i].amount;
									}
								}
							}

							$(".games .price").text(parseFloat(games_price).toFixed(4));

							var total_price = parseFloat($(".talk .price").text()) + parseFloat($(".adme .price").text()) + parseFloat($(".games .price").text());
							$(".total_price").text(total_price.toFixed(4));

						},
						error: function (error) {
							console.log(error);
						}
					});
	    },
			error: function (data) {
				$(".alert-danger").show();
			}
		});
	});

	/* CHECK THE SESSION */
	chrome.extension.sendMessage({
		msg: 'check_session'
	},function (response) {
		var data = response.data;
		if(response.status == true){
			var profile_link = "https://www.wowapp.com/redirect?userAccountId=" + data.id + '&page=' + encodeURIComponent('account/profile') +'&token=' + 	encodeURIComponent(data.token);
			var talk_link = "https://wowapp.com/combined-earnings#talk";
			var ad_link = "https://wowapp.com/combined-earnings#adme";
			var games_link = "https://wowapp.com/combined-earnings#games";
			var web_link = "https://wowapp.com/combined-earnings#web";
			var lockscreen_link = "https://wowapp.com/combined-earnings#lockscreen";
			var network_link = "https://www.wowapp.com/redirect?userAccountId=" + data.id + '&page=' + encodeURIComponent('earn/earnings/statistics') +'&token=' + 	encodeURIComponent(data.token);
			var invite_link = "https://www.wowapp.com/redirect?userAccountId=" + data.id + '&page=' + encodeURIComponent('earn/invite/tell-your-friends') +'&token=' + 	encodeURIComponent(data.token);
			var earnings_link = "https://www.wowapp.com/redirect?userAccountId=" + data.id + '&page=' + encodeURIComponent('earn/earnings/history') +'&token=' + 	encodeURIComponent(data.token);
			$(".profile_link").attr("href", profile_link);
			$("#talk_link").attr("href", talk_link);
			$("#ad_link").attr("href", ad_link);
			$("#games_link").attr("href", games_link);
			$("#web_link").attr("href", web_link);
			$("#lockscreen_link").attr("href", lockscreen_link);
			$("#network_link").attr("href", network_link);
			$("#invite_link").attr("href", invite_link);
			$("#earnings_link").attr("href", earnings_link);

			$(".black-overlap").hide();
			$(".sidebar").css('-webkit-filter', 'inherit');

			var displayName = data.displayName;
			$(".name").text(displayName);

			var headers = {
				"Authorization" : "WOOWAUTH:" + data.token,
				"Accept" : "application/json, text/javascript, */*; q=0.01",
				"Content-Type" : "application/json",
				"Accept-Language" : "en-US,ro-RO;q=0.8,ro;q=0.6,en;q=0.4"
			};
			var netWorkUrl = 'https://api.wowapp.com//wallet/accounts/' + data.id + '/network';
			var earningUrl = 'https://api.wowapp.com//wallet/accounts/' + data.id +'/balance';
			var new_tab_increasement = 'https://api.wowapp.com/v3/user-tracking/session-track';

			/* POSTING NEW TAB INCREASEMENT */
			var json_data = {
				"type": "EXTENSION-NEW-TAB",
				"impression": 1
			};

			$.ajax({
				url: new_tab_increasement,
				type: 'POST',
				dataType: 'JSON',
				headers: headers,
				data: JSON.stringify(json_data),
				success: function (response) {
					console.log(response);
				},
				error: function (error) {
					console.log('New Tab Increasement');
					console.log(error);
				}
			});

			/* GETTING NETWORK VALUE */
			$.ajax({
          url: netWorkUrl,
          type: 'GET',
          dataType: 'json',
          headers: headers,
          success: function (result) {
						var avatar = 'https://api.wowapp.com/avatar/users/' + data.username;
						$(".avatar").attr("src", avatar);
						$(".user-network .number").text(numberWithCommas(result.totalNumber));
						if(result.totalNumber > 100000){
							$(".user-network .number").css("font-size","12px");
							$(".user-earnings .number").css("font-size","12px");
						}
          },
          error: function (error) {
              console.warn(error);
          }
      });

			/* GETTING EARNING VALUE */
			$.ajax({
          url: earningUrl,
          type: 'GET',
          dataType: 'json',
          headers: headers,
          success: function (result) {
						var network_earnings = result.currentEarningsBalance;
						if(parseInt(network_earnings).toString().length > 5) {
							$(".user-earnings .number").text(numberWithCommas(parseInt(network_earnings)));
						} else if(parseInt(network_earnings).toString().length == 5){
							$(".user-earnings .number").text(numberWithCommas(parseFloat(network_earnings).toFixed(1)));
						} else {
							$(".user-earnings .number").text(numberWithCommas(parseFloat(network_earnings).toFixed(2)));
						}

						if(parseFloat(result.currentEarningsBalance) > 100000){
							$(".user-network .number").css("font-size","12px");
							$(".user-earnings .number").css("font-size","12px");
						}
          },
          error: function (error) {
              console.warn(error);
          }
      });

			/* GETTING EARNINGS TABLES */
			var datas = {
				"accountId": data.id,
				"pageNumber": -1,
				"pageSize":200
			}

			$.ajax({
				url: "https://api.wowapp.com/wallet/accounts/"+ data.id +"/earnings/search",
				type: 'POST',
				data: JSON.stringify(datas),
				headers: headers,
				dataType: "json",
				success: function (response) {
					var adme_array = [] , games_array = [] ,  talk_array = [] ;
					var earningDateList = [];

					for(var i = 0 ; i < parseInt(response.earnings.length); i++){

						earningDateList.push(response.earnings[i].earningDate);

						if(response.earnings[i].type == 'ADVERTISE_ME'){
							adme_array.push(response.earnings[i]);
						}

						if(response.earnings[i].type == 'GAMES'){
							games_array.push(response.earnings[i]);
						}

						if(response.earnings[i].type.indexOf('TALK') > -1){
							talk_array.push(response.earnings[i]);
						}
					}

					var latestDate = parseInt(earningDateList[0])
					for(var i = 1 ; i < earningDateList.length ; i++){
						 if(latestDate < parseInt(earningDateList[i]))
						 {
							 latestDate = parseInt(earningDateList[i]);
						 }
					}

					var date = new Date(latestDate * 1000);
					var latest_month = month_list[date.getMonth()];
					var latest_date = date.getDate();
					var latest_day = date.getDate();

					if(latest_day == 1) {
						latest_day = '1st'
					} else if(latest_day == 2) {
						latest_day = '2nd'
					} else {
						latest_day = latest_day + 'th';
					}

					$(".latest_date").text(latest_day + ' ' + latest_month);

					var adme_price = 0, games_price = 0, talk_price = 0;

					if(adme_array.length == 0){
						adme_price = 0;
					} else {
						adme_price = 0;
						for(var i = 0 ; i < adme_array.length ; i++){
							var date = new Date(parseInt(adme_array[i].earningDate) * 1000);
							var earning_month = month_list[date.getMonth()];
							var earning_date = date.getDate();
							if((latest_month == earning_month) && (latest_date == earning_date)){
								adme_price += adme_array[i].amount;
							}
						}
					}

					$(".adme .price").text(parseFloat(adme_price).toFixed(4));

					/* TALK Price */
					if(talk_array.length == 0){
						talk_price = 0;
					} else {
						talk_price = 0;
						for(var i = 0 ; i < talk_array.length ; i++){
							var date = new Date(parseInt(talk_array[i].earningDate) * 1000);
							var earning_month = month_list[date.getMonth()];
							var earning_date = date.getDate();
							if((latest_month == earning_month) && (latest_date == earning_date)){
								talk_price += talk_array[i].amount;
							}
						}
					}

					$(".talk .price").text(parseFloat(talk_price).toFixed(4));

					/* GAMES Price */
					if(games_array.length == 0){
						games_price = 0;
					} else {
						games_price = 0;
						for(var i = 0 ; i < games_array.length ; i++){
							var date = new Date(parseInt(games_array[i].earningDate) * 1000);
							var earning_month = month_list[date.getMonth()];
							var earning_date = date.getDate();
							if((latest_month == earning_month) && (latest_date == earning_date)){
								games_price += games_array[i].amount;
							}
						}
					}

					$(".games .price").text(parseFloat(games_price).toFixed(4));

					var total_price = parseFloat($(".talk .price").text()) + parseFloat($(".adme .price").text()) + parseFloat($(".games .price").text());
					$(".total_price").text(total_price.toFixed(4));

				},
				error: function (error) {
				}
			});
		}
	});

	$(document).on('click','.googleButton',function () {
		chrome.extension.sendMessage({
			msg: 'check_session'
		},function (response) {
			if(response.status == true){
				var data = response.data;
				var headers = {
					"Authorization" : "WOOWAUTH:" + data.token,
					"Accept" : "application/json, text/javascript, */*; q=0.01",
					"Content-Type" : "application/json",
					"Accept-Language" : "en-US,ro-RO;q=0.8,ro;q=0.6,en;q=0.4"
				};
				var search_button_increasement = 'https://api.wowapp.com/v3/user-tracking/session-track';

				/* POSTING NEW SEARCH INCREASEMENT */
				var json_data = {
					"type": "EXTENSION-SEARCH",
					"impression": 1
				};

				$.ajax({
					url: search_button_increasement,
					type: 'POST',
					dataType: 'JSON',
					headers: headers,
					data: JSON.stringify(json_data),
					success: function (response) {
						console.log(response);
					},
					error: function (error) {
						console.log('New Search Increasement');
						console.log(error);
					}
				});
			}
		})
	});
})(window, $)
