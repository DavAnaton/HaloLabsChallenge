import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
   constructor(props) {
         super(props);
         this.state = {
            snow: false,
            menuItems : [
               {name: "Add Item",
                action: this.addItem.bind(this)},
            ],
            groundTexture: 1 
         };
   }

   /*
   Adds an item in the menu.
   For the purpose of this demo, the menu is build dynamically just to show how it can adapt to different size of menus
   */
   addItem(){
      const fullMenu = [
         {name: "Add Item", action: this.addItem.bind(this)},
         {name: "Remove Item", action: this.removeItem.bind(this)},
         {name: "Toggle Snow", action: this.addSnow.bind(this)},
         {name: "Change Ground", action: this.changeGround.bind(this)},
         {name: "Display OK", action: (() => alert('OK')) }
      ];

      var menu = this.state.menuItems;
      var indexNewItem = menu.length % fullMenu.length;
      menu.push(fullMenu[indexNewItem]);
      this.setState({menuItems: menu})
   }

   /*
   Removes last item of the menu
   */
   removeItem(){
      var menu = this.state.menuItems;
      menu.pop();
      this.setState({menuItems: menu})
   }

   /*
   Adds snow in the scene
   */
   addSnow(){
      this.setState({snow: !this.state.snow});
   }

   /*
   Changes ground texture.
   Here, we loaded 2 different textures (groundTexture1 and groundTexture2). Hence the formula to output either 1 or 2
   */
   changeGround(){
      this.setState({groundTexture: this.state.groundTexture % 2 + 1}) // 2 different textures
   }

   render () {
      return (
         <Scene>
            <a-assets>
               <img id="groundTexture1" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
               <img id="groundTexture2" src="https://static.pexels.com/photos/242616/pexels-photo-242616.jpeg"/>
               <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
            </a-assets>

            <Entity primitive="a-plane" src={"#groundTexture" + this.state.groundTexture} rotation="-90 0 0" height="100" width="100"/>
            <Entity primitive="a-light" type="ambient" color="#445451"/>
            <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
            <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
            <Entity visible={this.state.snow} particle-system={{preset: 'snow', particleCount: 2000}}/>

            <Menu items={this.state.menuItems}></Menu>

            <Entity primitive="a-camera">
               <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
            </Entity>
         </Scene>
      );
   }
}

class Menu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         spacing: {x: 0.7, y: 0.3}
      };
   }

   render () {
      const nbItem = this.props.items.length;
      const menuSize = Math.ceil(Math.sqrt(nbItem)); // size of menu in terms of item in each row/column
      const spacing = this.state.spacing; // Spacing between items
      const centerOfMenu = {
         // we count the number of columns
         x: Math.ceil(nbItem/menuSize-1)*spacing.x/2,
         //The first column is always full. We center the menu according to the height of the menu.
         y: (menuSize-1)*spacing.y/2
      };

      /*
      Creates a Fuseable item for each item in the object that contains the items
      */
      const renderedItems = this.props.items.map(function(item, index){
         const x = Math.floor(index/menuSize)*spacing.x;
         const y = (index % menuSize)*spacing.y;

         return (
            <Fuseable
               value={item.name}
               x={x}
               y={y}
               action={item.action}
               timer="10">
            </Fuseable>
         );
      });

      return (
         <Entity class="Menu" position={{x: -centerOfMenu.x, y: 1.6-centerOfMenu.y, z: -1}}>
            {renderedItems}
         </Entity>
      );
   }
}

class Fuseable extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         timer: this.props.timer,
         interval: null,
         color: "red",
         opacity: 1
      }; 
   }

   /*
   Starts a countdown on hovering
   */
   hover(evt){
      var obj = this;
      this.setState({
         interval: setInterval(function () {
            obj.setState({timer: obj.state.timer - 1});
            if(obj.state.timer == 0){ //Timer finished
               obj.unhover();
               obj.props.action();
            }
         }, 100)
      });
   }

   /*
   Clears the countdown when we leave the Fuseable
   */
   unhover(evt){
      clearInterval(this.state.interval);
      this.setState({timer: this.props.timer});
   }

   render () {
      return (
         <Entity class="Fuseable"
            position={{x: this.props.x, y: this.props.y, z: 0}}
            geometry={{primitive: 'plane', height: 0.2, width: 0.6}}
            material={{color: this.state.color, opacity: this.opacity}}
            events={{mouseenter: this.hover.bind(this), mouseleave: this.unhover.bind(this)}}
         >
            <Entity 
               text={{value: this.props.value, align: 'center'}}
            />
            <Entity 
               text={{value: this.state.timer/10 + 's', align: 'center'}} position={{x:0.22, y:-0.075}}
            />
         </Entity>
      );
   }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
