// Aquarium Companion App// Written for CS160 Fall 2016// Team 13: Magnetic Magikarps

// Skins
let whiteSkin = new Skin({ fill:"white" });
let blueSkin = new Skin({ fill: "#3a89fb" });
// Styles
let titleStyle = new Style( { font: "23px", color:"white" } );
let buttonStyle = new Style({font: '18px', color: 'white'});
let specialStyle = new Style({font: 'bold 40px', color: 'green'});
let valueStyle = new Style({font: '35px', color: 'black'});
let bigValueStyle = new Style({font: '75px', color: 'black'});
let textStyle = new Style({font: '18px', color: 'black'});
//Textures
let upArrowTexture = new Texture("assets/up-arrow.png");
let upInvertedTexture = new Texture("assets/up-arrow-invert.png");
let downArrowTexture =  new Texture("assets/down-arrow.png");
let downInvertedTexture = new Texture("assets/down-arrow-invert.png");
let celsius = new Texture("assets/Temp_C.png");
let fahrenheit = new Texture("assets/Temp_F.png");

//Skins
let celsiusSkin = new Skin({
	  width: 500, height: 120,      texture: celsius,      fill: "white",      aspect: "fit"
});

let fahrenheitSkin = new Skin({
	  width: 500, height: 120,      texture: fahrenheit,      fill: "white",      aspect: "fit"
});


let upArrowSkin = new Skin({
	  width: 100, height: 100,      texture: upArrowTexture,      fill: "white",      aspect: "fit"});

let upInvertedSkin = new Skin({
	  width: 100, height: 100,      texture: upInvertedTexture,      fill: "white",      aspect: "fit"});

let downArrowSkin = new Skin({
	  width: 100, height: 100,      texture: downArrowTexture,      fill: "white",      aspect: "fit"});

let downInvertedSkin = new Skin({
	  width: 100, height: 100,      texture: downInvertedTexture,      fill: "white",      aspect: "fit"});


//Templates
let loVal = [72];
let loLabel = Label.template($ => ({ left: 30, bottom: 50, width: 50, string : loVal[0] , style : valueStyle,
  	Behavior: class extends Behavior {
  	   	onIncrementLoLabel(loLabel) {
  	   		loVal[0] ++;
  	   		loLabel.string = loVal;
		}
  	   	onDecrementLoLabel(loLabel) {
  	   		loVal[0] --;
  	   		loLabel.string = loVal;
		}
  	}
}))

let hiVal = [80];
let hiLabel = Label.template($ => ({ left: 20, bottom: 50, width: 50, string : hiVal[0] , style : valueStyle,
  	Behavior: class extends Behavior {
  	   	onIncrementHiLabel(hiLabel) {
  	   		hiVal[0] ++;
			hiLabel.string = hiVal;
		}
  	   	onDecrementHiLabel(hiLabel) {
  	   		hiVal[0] --;
  	   		hiLabel.string = hiVal;
		}
  	}
}))

let actualVal = [75.9];
let actualLabel = Label.template($ => ({left: 80, bottom: 40,  string : actualVal[0].toFixed(1)	 , style :  bigValueStyle,
	Behavior: class extends Behavior {
	  	   	onIncrementActualLabel(actualLabel) {
	  	   		actualVal[0] += .1;
				actualLabel.string = actualVal[0].toFixed(1);
			}
	  	   	onDecrementActualLabel(actualLabel) {
	  	   		actualVal[0] -= .1;
	  	   		actualLabel.string = actualVal[0].toFixed(1);
			}
	  	}
 }))


let scaleSwitch = Container.template($ => ({
	top: 25, left: 75, width: 200, height: 40,
	active: true,
	skin: fahrenheitSkin,
  	Behavior: class extends Behavior {
  	   	onTouchBegan(scaleSwitch) {
  	   		if (scaleSwitch.skin == fahrenheitSkin) {
	  	   		scaleSwitch.skin = celsiusSkin;
	  	   	} else {
	  	   		scaleSwitch.skin = fahrenheitSkin;
	  	   	}
		}
  	}}))

let savingScreen = Column.template($ => ({
	top: 150, width: 300, height: 250,
	active: true,
	skin: blueSkin,
	contents: [
		new Label({top:30, string: 'Now saving changes!', style: buttonStyle }),
		new Label({ top: 30, string: 'Temperature will be fully changed in:', style: buttonStyle }),
		new Label({ top: 30, string: '5 MINUTES', style: specialStyle }),
		new Label({ top: 30, string: 'Tap to dismiss.', style: buttonStyle }),
  	],
  	Behavior: class extends Behavior {
  	   	onTouchEnded(savingScreen) {
			application.remove(application.last);
			application.distribute("onSaved");
		}
  	}}))


let upButton = Container.template($ => ({  width:60, height:60,  active: true,
  skin: upArrowSkin,  Behavior: class extends Behavior {
  	onCreate(button, data) {
  		this.command = data.command;
  	}  	onTouchEnded(button){
  	   	button.skin = upArrowSkin;
   		application.distribute(this.command);
     }
   	onTouchBegan(button) {
  	   	button.skin = upInvertedSkin;
	}  }}))

let downButton = Container.template($ => ({  width:60, height:60,  active: true,
  skin: downArrowSkin,  Behavior: class extends Behavior {
  	onCreate(button, data) {
  		this.command = data.command;
  	}  	onTouchEnded(button){
  	   	button.skin = downArrowSkin;
  	   	application.distribute(this.command);
     }
   	onTouchBegan(button) {
  	   	button.skin = downInvertedSkin;
	}  }}))





export var data_edit_screen_template = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: whiteSkin,
   contents: [
       new Container({
			left:0, right:0, height: 40, skin: blueSkin,
			contents: [
				new Container({
					left: 0, right: 230, top: 0, bottom: 0, skin: blueSkin, active: true,
					contents: [
						new Label({ string: 'Cancel', style: buttonStyle,
							behavior: Behavior ({
								onSaved: function(content, id, x, y, ticks) {
									content.string = '<BACK';
								}
							})
						})
					],
					behavior: Behavior ({
						onTouchEnded: function(content, id, x, y, ticks) {
							application.distribute("onBackData");
						}
					})
				}),
				new Label({ horizontal: 'center',  string: 'Edit Temperature', style: titleStyle }),
				new Container({
					left: 240, right: 0, top: 0, bottom: 0, skin: blueSkin, active: true,
					contents: [
						new Label({ string: 'Save', style: buttonStyle })
					],
					behavior: Behavior ({
						onTouchEnded: function(content, id, x, y, ticks) {
							application.add(new savingScreen());
						}
					})
				}),
			]
		}),
		new scaleSwitch(),
		new Label({ top: 25, string: 'Select healthy temperature range', style: textStyle }),
		new Line( {
			top: 25,
			contents: [
				new loLabel(),
				new Column({
					left: 15,
					contents: [
						new upButton({command: "onIncrementLoLabel"}),
						new downButton({command: "onDecrementLoLabel"})
					]
   				}),
				new hiLabel(),
				new Column({
					left: 15,
					contents: [
						new upButton({command: "onIncrementHiLabel"}),
						new downButton({command: "onDecrementHiLabel"})
					]
   				}),			
		
   			]
		
   		}),
		new Label({ top: 10, string: 'Change tank temperature', style: textStyle }),
		new Line( {
			top:25,
			contents: [
				new actualLabel(),
				new Column({
					left: 30,
					contents: [
						new upButton({command: "onIncrementActualLabel"}),
						new downButton({command: "onDecrementActualLabel"})
					]
   				}),
   			]
		
   		}),		
   ]
}));



