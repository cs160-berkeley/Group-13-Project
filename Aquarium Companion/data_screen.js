// Aquarium Companion App// Written for CS160 Fall 2016// Team 13: Magnetic Magikarps	

// Skins
let whiteSkin = new Skin({ fill:"white" });
let blueSkin = new Skin({ fill: "#3a89fb" });
// Styles
let titleStyle = new Style( { font: "30px", color:"white" } );
let titleStyle2 = new Style( { font: "bold 30px", color:"#0099DF" } );
let buttonStyle = new Style({font: '18px', color: 'white'});
let textStyle = new Style({font: '24px', color: '#0099DF'});
//Textures
let editButtonTexture = new Texture("assets/Edit Button.png");
let editIndentedTexture = new Texture("assets/Edit Button Indented.png");

//Skinslet goldSkin = new Skin({fill: '#ffd700'});

let editButtonSkin = new Skin({
	  width: 350, height: 150,      texture: editButtonTexture,      fill: "white",      aspect: "fit"
});

let editIndentedSkin = new Skin({
	  width: 350, height: 150,      texture: editIndentedTexture,      fill: "white",      aspect: "fit"
});

//Templateslet editButton = Container.template($ => ({  left: $.left,  top: $.top, width:$.width, height:$.height, skin: editButtonSkin,  active: true,  contents: [    new Label({      left: 0, right:0, top: 0, bottom: 0,      style: buttonStyle,    })  ],   behavior: Behavior({  	onTouchEnded(button){
  	   		button.skin = editButtonSkin;
			application.distribute("onDataEditOpen");	

     },
   	onTouchBegan(button) {
  	   		button.skin = editIndentedSkin;
	}  })}));





export var data_screen_template = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: whiteSkin,
   contents: [
       new Container({
			left:0, right:0, height: 40, skin: blueSkin,
			contents: [
				new Container({
					left: 0, right: 180, top: 0, bottom: 0, skin: blueSkin, active: true,
					contents: [
						new Label({ left: 15, string: '<BACK', style: buttonStyle })
					],
					behavior: Behavior ({
						onTouchEnded: function(content, id, x, y, ticks) {
							application.distribute("onBack");
						}
					})
				}),
				new Label({ string: 'Data', style: titleStyle })
			]
		}),
		new Label({ top: 5, string: 'Temperature', style: titleStyle2 }),
		new Picture({top: -25, width: 320, height: 250, url: "assets/FishTankTempGraph.png"}),
		new editButton({left: 192, top: -25, height: 50, width: 100}),
		new Picture({width: 200, height: 150, url: "assets/3 Buttons Data Screen.png"}),
   ],
}));

