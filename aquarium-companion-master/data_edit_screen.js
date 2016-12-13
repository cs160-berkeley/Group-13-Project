// Aquarium Companion App// Written for CS160 Fall 2016// Team 13: Magnetic Magikarps// State variablesvar loVal = 72;var hiVal = 80;var actualVal = 75.9;var tempUnit = "F";var oldLoVal = loVal;var oldHiVal = hiVal;var oldActualVal = actualVal;var oldTempUnit = tempUnit;// Styleslet titleStyle = new Style( { font: "23px  Marker Felt", color:"white" } );let buttonStyle = new Style({font: '18px', color: 'white'});let specialStyle = new Style({font: 'bold 40px', color: 'green'});let valueStyle = new Style({font: '45px', color: 'black'});let bigValueStyle = new Style({font: '75px', color: 'black'});let textStyle = new Style({font: '18px', color: 'black'});//Textureslet upArrowTexture = new Texture("assets/up-arrow.png");let upInvertedTexture = new Texture("assets/up-arrow-invert.png");let downArrowTexture =  new Texture("assets/down-arrow.png");let downInvertedTexture = new Texture("assets/down-arrow-invert.png");let fahrenheit = new Texture("assets/temp_slider_fahren.png");let celsius = new Texture("assets/temp_slider_celsius.png");let fishTexture = new Texture("assets/img.png");// Skinslet whiteSkin = new Skin({ fill:"white", texture: fishTexture, fill: "white", width: 1000, height: 800, });let blueSkin = new Skin({ fill: "#14a5ff" });
let orangeSkin = new Skin({ fill: "#FF9105" });
let celsiusSkin = new Skin({	  width: 580, height: 105,      texture: celsius,      fill: "white",      aspect: "fit"});let fahrenheitSkin = new Skin({	  width: 580, height:105,      texture: fahrenheit,      fill: "white",      aspect: "fit"});let upArrowSkin = new Skin({	  width: 100, height: 100,      texture: upArrowTexture,      fill: "white",      aspect: "fit"});let upInvertedSkin = new Skin({	  width: 100, height: 100,      texture: upInvertedTexture,      fill: "white",      aspect: "fit"});let downArrowSkin = new Skin({	  width: 100, height: 100,      texture: downArrowTexture,      fill: "white",      aspect: "fit"});let downInvertedSkin = new Skin({	  width: 100, height: 100,      texture: downInvertedTexture,      fill: "white",      aspect: "fit"});//Templateslet loLabel = Label.template($ => ({ left: 30, bottom: 50, width: 50, string : loVal, style : valueStyle,  	Behavior: class extends Behavior {  	   	onIncrementLoLabel(loLabel) {  	   		loVal ++;  	   		loLabel.string = loVal;  	   		application.distribute("onIncLo");		}  	   	onDecrementLoLabel(loLabel) {  	   		loVal --;  	   		loLabel.string = loVal;  	   		application.distribute("onDecLo");		}  	}}))let hiLabel = Label.template($ => ({ left: 20, bottom: 50, width: 50, string : hiVal, style : valueStyle,  	Behavior: class extends Behavior {  	   	onIncrementHiLabel(hiLabel) {  	   		hiVal ++;			hiLabel.string = hiVal;			application.distribute("onIncHi");		}  	   	onDecrementHiLabel(hiLabel) {  	   		hiVal --;  	   		hiLabel.string = hiVal;  	   		application.distribute("onDecHi");		}  	}}))let actualLabel = Label.template($ => ({left: 80, bottom: 40,  string : actualVal.toFixed(1)	 , style :  bigValueStyle,	Behavior: class extends Behavior {	  	   	onIncrementActualLabel(actualLabel) {	  	   		actualVal += .1;				actualLabel.string = actualVal.toFixed(1);				application.distribute("onIncAct");			}	  	   	onDecrementActualLabel(actualLabel) {	  	   		actualVal -= .1;	  	   		actualLabel.string = actualVal.toFixed(1);	  	   		application.distribute("onDecAct");			}	  	} }))let scaleSwitch = Container.template($ => ({	top: 25, left: 57, width: 200, height: 40,	active: true,	skin: fahrenheitSkin,  	Behavior: class extends Behavior {  		onCreate(scaleSwitch) {  			if (tempUnit == "F") { scaleSwitch.skin = fahrenheitSkin; }  			else { scaleSwitch.skin = celsiusSkin; }  	   	}  	   	onTouchBegan(scaleSwitch) {  	   		if (scaleSwitch.skin == fahrenheitSkin) {	  	   		scaleSwitch.skin = celsiusSkin;	  	   		tempUnit = "C";	  	   	} else {	  	   		scaleSwitch.skin = fahrenheitSkin;	  	   		tempUnit = "F";	  	   	}	  	   	application.distribute("onSwitchUnits");		}  	}}))let savingScreen = Column.template($ => ({	top: 150, width: 300, height: 250,	active: true,	skin: orangeSkin,	contents: [		new Label({top:30, string: 'Now saving changes!', style: buttonStyle }),		new Label({ top: 30, string: 'Temperature will be fully changed in:', style: buttonStyle }),		new Label({ top: 30, string: '5 MINUTES', style: specialStyle }),		new Label({ top: 30, string: 'Tap to dismiss.', style: buttonStyle }),  	],  	Behavior: class extends Behavior {  	   	onTouchEnded(savingScreen) {			application.remove(application.last);			application.distribute("onSaved");		}  	}}))let upButton = Container.template($ => ({  width:60, height:60,  active: true,  skin: upArrowSkin,  Behavior: class extends Behavior {  	onCreate(button, data) {  		this.command = data.command;  	}  	onTouchEnded(button){  	   	button.skin = upArrowSkin;   		application.distribute(this.command);     }   	onTouchBegan(button) {  	   	button.skin = upInvertedSkin;	}  }}))let downButton = Container.template($ => ({  width:60, height:60, top:2, bottom:2, left:2, right:2,  active: true,  skin: downArrowSkin,  Behavior: class extends Behavior {  	onCreate(button, data) {  		this.command = data.command;  	}  	onTouchEnded(button){  	   	button.skin = downArrowSkin;  	   	application.distribute(this.command);     }   	onTouchBegan(button) {  	   	button.skin = downInvertedSkin;	}  }}))export var data_edit_screen_template = Column.template($ => ({   left: 0, right: 0, top: 0, bottom: 0,   skin: whiteSkin,   contents: [       new Container({			left:0, right:0, height: 40, skin: blueSkin,			contents: [				new Container({					left: 0, right: 230, top: 0, bottom: 0, skin: blueSkin, active: true,					contents: [						new Label({ string: 'Cancel', style: buttonStyle,							behavior: Behavior ({								onSaved: function(content, id, x, y, ticks) {									content.string = "";								}							})						})					],					behavior: Behavior ({						onTouchEnded: function(content, id, x, y, ticks) {							application.distribute("onBackData");							loVal = oldLoVal;							hiVal = oldHiVal;							actualVal = oldActualVal;							tempUnit = oldTempUnit;							application.distribute("onDataCancel");						}, 						onSaved: function(content, id, x, y, ticks) {							content.add(new Picture({left:-80, height: 30, url: "assets/back_button.png"}));									}											}),				}),				new Label({ horizontal: 'center',  string: 'Edit Temperature', style: titleStyle }),				new Container({					left: 240, right: 0, top: 0, bottom: 0, skin: blueSkin, active: true,					contents: [						new Label({ string: 'Save', style: buttonStyle })					],					behavior: Behavior ({						onTouchEnded: function(content, id, x, y, ticks) {							application.add(new savingScreen());							oldLoVal = loVal;							oldHiVal = hiVal;							oldActualVal = actualVal;							oldTempUnit = tempUnit;							application.distribute("onDataSave");						}					})				}),			]		}),		new scaleSwitch(),		new Label({ top: 25, string: 'Select healthy temperature range', style: textStyle }),		new Line( {			top: 25,			contents: [				new loLabel(),				new Column({					left: 15, right: 5,					contents: [						new upButton({command: "onIncrementLoLabel"}),						new downButton({command: "onDecrementLoLabel"})					]   				}),				new hiLabel(),				new Column({					left: 15, right: 5,					contents: [						new upButton({command: "onIncrementHiLabel"}),						new downButton({command: "onDecrementHiLabel"})					]   				}),					   			]		   		}),		new Label({ top: 10, string: 'Change tank temperature', style: textStyle }),		new Line( {			top:25,			contents: [				new actualLabel(),				new Column({					left: 30,					contents: [						new upButton({command: "onIncrementActualLabel"}),						new downButton({command: "onDecrementActualLabel"})					]   				}),   			]   		}),		   ]}));	