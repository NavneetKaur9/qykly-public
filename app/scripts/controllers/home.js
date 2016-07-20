'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce, $window) {
	// var url = api.addr();
	// $scope.alert = '<img src="assets/images/ajax-loader.gif"/>' + ' loading.........';
	// $scope.alerts = $sce.trustAsHtml($scope.alert);
	// $scope.closeAlert = function(argument) {
	// 	$scope.alert = false;
	// };
	// // $scope.parseSmsResult = {
	// // 	"output": [{
	// // 		"EKARTL": 345
	// // 	}],
	// // 	"smsdata": [{
	// // 			"smstext": "Out for Delivery: Corsair Apple Mac Seri... with tracking ID FMPC0127902385 will be delivered today before 7pm by Inderpal (09643806045). Request you to keep 3099.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear AdityaBhardwaj ,Ranz M003 Wireless Opt...  from flipkart.com with tracking ID FMPC0127930039 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \nClick here: http://ekrt.it/PWW23uuuuN .Not too happy? Click here: http://ekrt.it/PW~5wuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear Saket Sengar ,Honor Holly 2 Plus  from flipkart.com with tracking ID FMPC0118496577 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \nClick here: http://ekrt.it/bjbFpNNNNN .Not too happy? Click here: http://ekrt.it/sML61uuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear SohaibZeeshan ,American Tourister Cod...  from flipkart.com with tracking ID FMPP0049618531 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/EEtDUNNNNN .Not too happy? Click here: http://ekrt.it/99VTauuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear MANASPURKAIT ,SAMSUNG Guru E1200  from flipkart.com with tracking ID FMPP0053924556 has been successfully delivered. We are extremely glad to have s",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear MANASPURKAIT ,Samsung  Battery - EB4...  from flipkart.com with tracking ID FMPP0048377100 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/jp8d!uuuuN .Not too happy? Click here: http://ekrt.it/jpZ2CuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Zebronics Headphone wi... from flipkart.com  with tracking ID FMPC0535963852 will be delivered today before 7pm by Jitender (07056666304). Request you to keep 180.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Zebronics Headphone wi... with tracking ID FMPC0535963852 has been successfully delivered to your family member manika. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear VINOD JAIN ,LeEco Le 1s Eco+1 more items  from flipkart.com with tracking ID FMPC0132294032 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/wCkbRNNNNN .Not too happy? Click here: http://ekrt.it/BdMdPuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Sandisk Cruzer Blade 1... from flipkart.com  with tracking ID FMPP4040744449 will be delivered today before 9pm by Mohd. Jawed Ali (dial 01139595329 with pin 111).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Sandisk Cruzer Blade 1... with tracking ID FMPP4040744449 has been successfully delivered to your friend rajni,9266600768. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Samsung Galaxy S4 with tracking ID FMPC2142514408 has been successfully delivered to Sudeep Shrotriya,9871908584. Happy with the delivery? Click here: http://fkrt.it/uch1GNNNNN .  \nNot too happy? Click here: http://fkrt.it/Nf~NEuuuuN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Seagate Expansion 500 ... from flipkart.com  with tracking ID FMPP0054808310 will be delivered today before 7pm by Nitin Ganpat (dial 02233836083 with pin 113).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Roadster Men Blue  Off... from Myntra  with tracking ID MYNC0005570255 will be delivered today before 7pm by Sanjay Kumar (07056666450). Request you to keep 415.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Dear KaranMakwana ,Seagate Expansion 500 ...  from flipkart.com with tracking ID FMPP0054808310 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/yHYuxNNNNN .Not too happy? Click here: http://ekrt.it/Ar4UHuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Roadster Men Blue  Off... with tracking ID MYNC0005570255 has been successfully delivered to Naresh arora,8880133366. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Roadster Blue Slim Fit... from Myntra  with tracking ID MYNC0005569256 will be delivered today before 7pm by Sanjay Kumar (07056666450). Request you to keep 635.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Roadster Blue Slim Fit... from Myntra with tracking ID MYNC0005569256 has been successfully delivered to Naresh arora,8880133366. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Letv Le 1S from flipkart.com  with tracking ID FMPC4166772003 will be delivered today before 7pm by Selvaraj S (dial 08039511256 with pin 104). Request you to keep 10999.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Letv Le 1S from flipkart.com  with tracking ID FMPC4166772003 will be delivered today before 7pm by Mohan Kumar N (dial 08039511256 with pin 127). Request you to keep 10999.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Letv Le 1S from flipkart.com  with tracking ID FMPC4166772003 will be delivered today before 7pm by Ravi Kumar (dial 08039511256 with pin 126). Request you to keep 10999.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Letv Le 1S from flipkart.com  with tracking ID FMPP1295598124 will be delivered today before 9pm.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Letv Le 1S from flipkart.com  with tracking ID FMPC4166772003 will be delivered today before 7pm by Selvaraj S (dial 08039511256 with pin 106). Request you to keep 10999.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Kenneth Cole Men Navy ... from myntra.com  with tracking ID MYNP0001750337 will be delivered today before 7pm by Sanjay Kumar (07056666450).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Kenneth Cole Men Navy ... with tracking ID MYNP0001750337 has been successfully delivered Anurag Arora.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: INVICTUS Blue Slim Fit... from Myntra  with tracking ID MYNC0006141564 will be delivered today before 7pm by Anil Kumar (07056666459). Request you to keep 2519.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for INVICTUS Blue Slim Fit... with tracking ID MYNC0006141564 has been successfully delivered to Anurag Arora,8880133366.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Canary London Navy Pri... from Myntra  with tracking ID MYNC0006704387 will be delivered today before 7pm by Sanjay Kumar (07056666450). Request you to keep 2435.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Canary London Navy Pri... with tracking ID MYNC0006704387 has been successfully delivered Anurag Arora. Happy with the delivery? Click here: http://fkrt.it/aEOZkuuuuN .  \nNot too happy? Click here: http://fkrt.it/O91!gNNNNN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear Badal Kumar ,Asus Zenfone Max  from flipkart.com with tracking ID FMPP0049456226 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \nClick here: http://ekrt.it/xOaSbNNNNN .Not too happy? Click here: http://ekrt.it/kaxgPuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Speed High Speed 2.5 i... with tracking ID FMPP3739036202 will be delivered today before 7pm.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Philips HD 9306 1.5 L ... with tracking ID FMPP0641462108 will be delivered today before 7pm by Harish (08447240605).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear TarunSatiya ,Dr.Chen Flip Cover for...  from flipkart.com with tracking ID FMPP0049655123 has been successfully delivered. We are extremely glad to ",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Philips All in One Hea... from flipkart.com  with tracking ID FMPP0054206855 will be delivered today before 7pm by Satish K (dial 08033",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Dear Sandeep Nair ,Philips All in One Hea...  from flipkart.com with tracking ID FMPP0054206855 has been successfully delivered. We are extremely glad to",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Hilex HE PL 6616 8 Wal... with tracking ID FMPP2076686406 will be delivered today before 7pm by Manjunatha Reddyh P (dial 08039511256 with pin 139).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Hilex HE PL 6616 8 Wal... with tracking ID FMPP2076686406 has been successfully delivered to your neighbor AbhishekDashora,9874285756. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Ambrane P-1310 13000 mAh with tracking ID FMPP3192445367 will be delivered today before 7pm by Prakash A (dial 08039511256 with pin 120).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Ambrane P-1310 13000 mAh with tracking ID FMPP3192445367 has been successfully delivered to your friend arsha. We are extremely",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Schwarzkopf Profession... from flipkart.com  with tracking ID FMPP0047894348 will be delivered today before 7pm by ADARSH B.R (dial 08039511256 with pin 120).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Dear AbhishekDashora ,Schwarzkopf Profession...  from flipkart.com with tracking ID FMPP0047894348 has been successfully delivered to your security  babu . We are extremely glad to have served you. Happy with the delivery?  \nClick here: http://ekrt.it/zJunMuuuuN .Not too happy? Click here: http://ekrt.it/zJwxVuuuuN .",
	// // 			"pattern": "Dear\\s(.*)\\s,(.*)\\sfrom\\s(.*)\\s\\with\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\sto\\syour\\s",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T13:03:08.710Z"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Joddaram Oil Joddaram Oil from flipkart.com  with tracking ID FMPC0403422586 will be delivered today before 7pm by Pranit Prabhakar Tamboli (dial 02233836083 with pin 108). Request you to keep 140.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Joddaram Oil Joddaram Oil from flipkart.com  with tracking ID FMPP3602702911 will be delivered today before 7pm by Pranit Prabhakar Tamboli (dial 02233836083 with pin 108).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Joddaram Oil Joddaram Oil from flipkart.com with tracking ID FMPC0403422586 has been successfully delivered to Dilip,9930069101. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Joddaram Oil Joddaram Oil from flipkart.com with tracking ID FMPP3602702911 has been successfully delivered to Dilip,9930069101. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Yuvanika Printed Mysor... from flipkart.com  with tracking ID FMPC0249718756 will be delivered today before 7pm by Pranit Prabhakar Tamboli (dial 02233836083 with pin 104). Request you to keep 334.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Yuvanika Printed Mysor... with tracking ID FMPC0249718756 has been successfully delivered to your family member Nitu Jain.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: GRITSTONES Solid Mens ... from flipkart.com  with tracking ID FMPC3206786006 will be delivered today before 7pm by Anup SankarLaminate_CI (dial 02233836083 with pin 108). Request you to keep 422.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Fastway Pouch for Appl... from flipkart.com  with tracking ID FMPC1849264099 will be delivered today before 7pm by Anup SankarLaminate_CI (dial 02233836083 with pin 111). Request you to keep 240.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Fastway Pouch for Appl... with tracking ID FMPC1849264099 has been successfully delivered to your family member sapna jain.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: People Candy Crush Gir... from Myntra  with tracking ID MYNP0001727575 will be delivered today before 7pm by Suresh V P  (dial 08039511256 with pin 120).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for People Candy Crush Gir... with tracking ID MYNP0001727575 has been successfully delivered to your security debojit. Happy with the delivery? Click here: http://fkrt.it/b!!MpNNNNN/happy .  \r\nNot too happy? Click here: http://fkrt.it/b!!MpNNNNN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Klamotten Women Blue M... from Myntra  with tracking ID MYNP0001735056 will be delivered today before 7pm by Suresh V P  (dial 08039511256 with pin 121).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Citrine Navy Printed T... from Myntra  with tracking ID MYNP0001735532 will be delivered today before 7pm by Suresh V P  (dial 08039511256 with pin 121).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Klamotten Women Blue M... with tracking ID MYNP0001735056 has been successfully delivered to your family member KABERI. Happy with the delivery? Click here: http://fkrt.it/Ky93IuuuuN/happy .  \r\nNot too happy? Click here: http://fkrt.it/Ky93IuuuuN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Citrine Navy Printed T... with tracking ID MYNP0001735532 has been successfully delivered to your family member KABERI. Happy with the delivery? Click here: http://fkrt.it/KyaBwuuuuN/happy .  \r\nNot too happy? Click here: http://fkrt.it/KyaBwuuuuN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear Madhvendra ,Moto X Play(With Turbo...  from flipkart.com with tracking ID FMPP0046883714 has been successfully delivered. We are extremely glad to have served you.",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear Madhvendra ,Moto X Play(With Turbo...  from flipkart.com with tracking ID FMPP0047170500 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://fkrt.it/K~6a2uuuuN .Not too happy? Click here: http://fkrt.it/K~mr7uuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Sennheiser Momentum M2... from flipkart.com  with tracking ID FMPP0049730890 will be delivered today before 7pm by Shopkart (dial 01139595329 with pin 145).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear MADHVENDRA ,Sennheiser Momentum M2...  from flipkart.com with tracking ID FMPP0049730890 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/C8cB4NNNNN .Not too happy? Click here: http://ekrt.it/dvFmcuuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Nikon D5200 (Body with... from flipkart.com  with tracking ID FMPC3376174246 will be delivered today before 7pm by AJMERI AZHARUDDIN JIYAUDDIN_Princy (dial 07930447040 with pin 126). Request you to keep 25399.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Nikon D5200 (Body with... from flipkart.com with tracking ID FMPC3376174246 has been successfully delivered to Saurabh Kiri,8866880956. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear Harish PratapSingh ,SMbros Platinum Swarov...  from flipkart.com with tracking ID FMPP0046950620 has been successfully delivered. We are extremely glad to have served you.",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear Harish PratapSingh ,Transcend Slim Portabl...  from flipkart.com with tracking ID FMPC0121435604 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/CoDs8NNNNN .Not too happy? Click here: http://ekrt.it/Co4wbNNNNN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Dear Harish Pratap Singh ,Huawei E8231/E8231s-1 ...  from flipkart.com with tracking ID FMPC0128814356 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/~XRfXNNNNN .Not too happy? Click here: http://ekrt.it/~Xe69NNNNN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: RDSTR Blue Sweater:Swe... with tracking ID MYNC0002871652 will be delivered today before 7pm by Hiren Bhikhubhai Patel (09712960588). Request you to keep 1436.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear Harish PratapSingh ,Ranbhi RQ5 Wired  Wire...  from flipkart.com with tracking ID FMPC0127720651 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \r\nClick here: http://ekrt.it/Q69tYNNNNN .Not too happy? Click here: http://ekrt.it/4oOq1uuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: INVICTUS Navy Sweater:... with tracking ID MYNC0002872054 will be delivered today before 7pm by Hiren Bhikhubhai Patel (09712960588). Request you to keep 3987.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for INVICTUS Navy Sweater:... with tracking ID MYNC0002872054 has been successfully delivered to your family member Rohan Khoja. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for RDSTR Blue Sweater:Swe... with tracking ID MYNC0002871652 has been successfully delivered to your family member Rohan Khoja. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Sanwara Burgundy Embro... with tracking ID MYNP0001479782 will be delivered today before 7pm by Jatinbhai Ramanbhai Patel (08758798079).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Sanwara Burgundy Embro... with tracking ID MYNP0001479782 has been successfully delivered to Rohan Khoja,9909894321. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: MR BUTTON Purple Slim ... with tracking ID MYNP0001479326 will be delivered today before 7pm by Jatinbhai Ramanbhai Patel (08758798079).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for MR BUTTON Purple Slim ... with tracking ID MYNP0001479326 has been successfully delivered to Rohan Khoja,9909894321. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: INVICTUS Charcoal Grey... with tracking ID MYNP0001501292 will be delivered today before 7pm by Sujit Thakorbhai Patel (09712987098).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for INVICTUS Charcoal Grey... with tracking ID MYNP0001501292 has been successfully delivered to Rohan Khoja,9909894321. We are extremely glad to have served you and hope to serve you better in the future.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: 2go ACTIVE GEAR USA Gr... from myntra.com  with tracking ID MYNC0005962090 will be delivered today before 7pm by Jatinbhai Ramanbhai Patel (08758798079). Request you to keep 1064.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for 2go ACTIVE GEAR USA Gr... with tracking ID MYNC0005962090 has been successfully delivered Rohan Khoja.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Redmi 2 Prime+1 more items from flipkart.com  with tracking ID FMPC2823849402 will be delivered today before 7pm by Hiren Bhikhubhai Patel (dial 07930447040 with pin 131). Request you to keep 6999.0/- in cash or card ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Redmi 2 Prime+1 more items with tracking ID FMPC2823849402 has been successfully delivered to your family member lela khoja.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Prestige PIC 1.0 Mini ... with tracking ID FMPC1863104622 will be delivered today before 9pm by Arun Kumar (dial 01139595329 with pin 136). Request you to keep 1599.0/- in cash ready.",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear SohaibZeeshan ,American Tourister Cod...  from flipkart.com with tracking ID FMPP0049618531 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?   Click here: http://ekrt.it/EEtDUNNNNN .Not too happy? Click here: http://ekrt.it/99VTauuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Lenovo Tab 2 A7-20 from flipkart.com  with tracking ID FMPP1973618167 will be delivered today before 7pm by Sivaram U (dial 04439592059 with pin 103).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\sfrom\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\stoday\\sbefore",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-31T12:02:52.288Z"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Lenovo Tab 2 A7-20 with tracking ID FMPP1973618167 has been successfully delivered to your family member sinduja.",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Out for Delivery: Speedo Monogram Aquash... from flipkart.com  with tracking ID FMPP0052881296 will be delivered today before 7pm by Rohit Singh Sarvajit Singh (dial 02233836083 with pin 144).",
	// // 			"pattern": "Out\\sfor\\sDelivery:\\s(.*)\\swith\\stracking\\sID\\s(.*)\\swill\\sbe\\sdelivered\\s(.*)\\sbefore\\s(.*).",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Dear SumitGupta ,Speedo Monogram Aquash...  from flipkart.com with tracking ID FMPP0052881296 has been successfully delivered. We are extremely glad to have served you. Happy with the delivery?  \nClick here: http://ekrt.it/~EgLzNNNNN .Not too happy? Click here: http://ekrt.it/P9tDluuuuN .",
	// // 			"pattern": "Dear\\s(?s).*,(.*)\\sfrom\\sflipkart.com\\swith\\stracking\\sID\\s(.*)\\shas\\sbeen\\ssuccessfully\\sdelivered.",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for VK Jewels Alloy Jewel Set with tracking ID FMPC4089902939 has been successfully delivered to your friend Lalu kr Yadav. Happy with the delivery? Click here: http://fkrt.it/U3CPDuuuuN .  \r\nNot too happy? Click here: http://fkrt.it/IpaIjNNNNN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for A R Enterprises 54 Key... with tracking ID FMPP0045754685 has been successfully delivered AmanJain. Happy with the delivery? Click here: http://fkrt.it/3DrsbNNNNN .  \r\nNot too happy? Click here: http://fkrt.it/3DraRNNNNN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL"
	// // 		}, {
	// // 			"smstext": "Delivered: Your order for Femeie Apparel Cotton ... with tracking ID FMPC0114827375 has been successfully delivered to your family member lalu Jain. Happy with the delivery? Click here: http://ekrt.it/J!!XMuuuuN .  \r\nNot too happy? Click here: http://ekrt.it/YTTlYNNNNN .",
	// // 			"pattern": "Delivered:\\sYour\\sorder\\sfor\\s(.*)\\swith\\stracking\\sID\\s([a-zA-Z0-9+]*)\\shas\\sbeen\\ssuccessfully\\sdelivered\\s(?:.)*",
	// // 			"shortcode": "EKARTL",
	// // 			"dateModified": "2016-05-12T17:09:30.183000"
	// // 		}

	// // 	]
	// // };

	// $scope.sortType = 'saveTime';
	// $scope.sortReverse = false;
	// $scope.order = function(sortType) {
	// 	$scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
	// 	$scope.sortType = sortType;
	// };
});