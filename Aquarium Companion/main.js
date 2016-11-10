// Aquarium Companion App// Written for CS160 Fall 2016// Team 13: Magnetic Magikarpsimport { feed_screen_template } from "feed_screen";import { tank_screen_template } from "tank_screen";import { data_screen_template } from "data_screen";
import { data_edit_screen_template } from "data_edit_screen";import { schedule_screen_template } from "schedule_screen";// Skinslet whiteSkin = new Skin({ fill:"white" });let blueSkin = new Skin({ fill: "#3a89fb" });let transparentSkin = new Skin({ fill: "transparent" });// Styleslet titleStyle = new Style( { font: "30px", color:"white" } );let buttonStyle = new Style({font: '16px', color: 'white'});// Variableslet deviceURL = "";let filterStatus = 0;let foodStatus = 0;// Main screen navigation buttonslet feed_button = new Container({	top: 15, height: 50, width: 100, skin: transparentSkin,	contents: [		new Picture({height:50,url:"assets/feed_button.png", active:true, 			behavior: Behavior({				onTouchBegan(picture) {					picture.url = "assets/clicked_feed_button.png";				},				onTouchEnded(picture) {					picture.url = "assets/feed_button.png";					application.distribute("onFeedOpen"); 				}			})		})	],});let tank_button = new Container({	top: 8, height: 50, width: 100, skin: transparentSkin,	contents: [		new Picture({height:50,url:"assets/tank_button.png", active:true, 			behavior: Behavior({				onTouchBegan(picture) {					picture.url = "assets/clicked_tank_button.png";				},				onTouchEnded(picture) {					picture.url = "assets/tank_button.png";					application.distribute("onTankOpen"); 				}			})		})	]});let data_button = new Container({	top: 8, height: 50, width: 100, skin: transparentSkin,	contents: [		new Picture({height:50,url:"assets/data_button.png", active:true, 			behavior: Behavior({				onTouchBegan(picture) {					picture.url = "assets/clicked_data_button.png";				},				onTouchEnded(picture) {					picture.url = "assets/data_button.png";					application.distribute("onDataOpen"); 				}			})		})	]});let schedule_button = new Container({	top: 8, height: 50, width: 100, skin: transparentSkin,	contents: [new Label({ string: 'Schedule', style: buttonStyle })],	contents: [		new Picture({height: 50,url:"assets/schedule_button.png", active:true, 			behavior: Behavior({				onTouchBegan(picture) {					picture.url = "assets/clicked_schedule_button.png";				},				onTouchEnded(picture) {					picture.url = "assets/schedule_button.png";					application.distribute("onScheduleOpen"); 				}			})		})	]});// Main screen definitionlet main_screen = new Column({	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,	contents: [		new Container({			left: 0, right: 0, height: 40, skin: blueSkin,			contents: [				new Label({ string: 'Aquarium Companion', style: titleStyle })			]		}),		new Picture({ top: 25, height: 150, url: 'assets/aquarium_stream.png'}),		feed_button,		tank_button,		data_button,		schedule_button	]});// Handlers for connectionHandler.bind("/discover", Behavior({    onInvoke: function(handler, message){        deviceURL = JSON.parse(message.requestText).url;    }}));Handler.bind("/forget", Behavior({    onInvoke: function(handler, message){        deviceURL = "";    }}));var current_screen = main_screen;// Application behavior definitionvar ApplicationBehavior = Behavior.template({	onLaunch: function() {		application.discover("aquarium.device.app");        application.add(current_screen);	},    onQuit: function(application) {        application.forget("aquarium.device.app");    },    onFeedOpen: function() {    	application.remove(current_screen);    	current_screen = new feed_screen_template();		application.add(current_screen);		application.distribute("getFoodData");	},	onTankOpen: function() {    	application.remove(current_screen);    	current_screen = new tank_screen_template();		application.add(current_screen);		application.distribute("getTankData");	},	onDataOpen: function() {    	application.remove(current_screen);    	current_screen = new data_screen_template();		application.add(current_screen);	},	onScheduleOpen: function() {    	application.remove(current_screen);    	current_screen = new schedule_screen_template();		application.add(current_screen);	},	onBack: function() {		application.remove(current_screen);		current_screen = main_screen;		application.add(current_screen);	},	// All function utility events	getTankData: function() {		if (deviceURL != "") new Message(deviceURL + "getTankData").invoke(Message.JSON).then(json => {			filterStatus = json.count;			application.distribute("setTankData", filterStatus);		});	},	changeFilter: function() {		if (deviceURL != "") new Message(deviceURL + "changeFilter").invoke(Message.JSON).then(json => {			filterStatus = json.count;			application.distribute("setTankData", filterStatus);		});	},	getFoodData: function() {		if (deviceURL != "") new Message(deviceURL + "getFoodData").invoke(Message.JSON).then(json => {			foodStatus = json.count;			application.distribute("setFoodData", foodStatus);		});	},	feed: function() {
		if (deviceURL != "") new Message(deviceURL + "feed").invoke(Message.JSON).then(json => {			foodStatus = json.count;			application.distribute("setFoodData", foodStatus);		});	},
	onDataEditOpen: function() {    	application.remove(current_screen);    	current_screen = new data_edit_screen_template();    	current_screen = new data_edit_screen_template();    			application.add(current_screen);	},	
	onBackData: function() {		application.remove(current_screen);		current_screen = new data_screen_template();		application.add(current_screen);	},	});application.behavior = new ApplicationBehavior();