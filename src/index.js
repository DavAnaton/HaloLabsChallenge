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
         };
   }

   addSnow(){
      this.setState({snow: !this.state.snow});
   }

   render () {
      var menuItems = [
         {name: "Toggle Snow",
          action: this.addSnow.bind(this)},
      ];
      return (
         <Scene>
            <a-assets>
               <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
               <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
            </a-assets>

            <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
            <Entity primitive="a-light" type="ambient" color="#445451"/>
            <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
            <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
            <Entity visible={this.state.snow} particle-system={{preset: 'snow', particleCount: 2000}}/>

            <Menu items={menuItems}></Menu>

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
      // this.state.spacing = {x: 0.7, y: 0.3};
   }

   render () {

      const nbItem = this.props.items.length;
      const menuSize = Math.ceil(Math.sqrt(nbItem)); // size of square to fit all items
      const centerOfMenu = {
         x: Math.ceil(nbItem/menuSize-1)*0.7/2, // center with the number of columns
         y: (menuSize-1)*0.3/2 // center with the number of lines
      };

      const renderedItems = this.props.items.map(function(item, index){
         const x = Math.floor(index/menuSize)*0.7;
         const y = (index % menuSize)*0.3;

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
