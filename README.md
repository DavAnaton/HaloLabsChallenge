# HaloLabsChallenge

[![Logo HaloLabs](https://github.com/DavAnaton/HaloLabsChallenge/raw/master/Docs/logo.png)]()

Challenge sent by [HaloLabs](https://www.halolabs.io/).<br/>

## Challenge
Using [aframe-react](https://github.com/ngokevin/aframe-react), create a simple scene that contains an interactive selection menu of your choice (radial, grid, curved..). Selecting something from the menu by "fusing" should trigger another event in the scene (color-change, text-change, animation etc..).

You are encouraged to use [aframe-react-boilerplate](https://github.com/ngokevin/aframe-react-boilerplate) as a starting point, git clone/fork it.

**Bonus points**: For implementing relevant components from the [awesome-aframe](https://github.com/aframevr/awesome-aframe) collection.
## Implementation
According to the challenge, I used [aframe-react-boilerplate](https://github.com/ngokevin/aframe-react-boilerplate).<br/>
Then, I developed a "fuseable" menu.<br/>
This smart-menu takes an array of objects ```{value: 'Display OK', action: (() => alert('OK'))}``` and present them as a fuseable 3D menu in your A-frame application.<br/>
No matter what is the size of your array, the menu will always be displayed nicely in a square grid.
## Installation
Download the latest version of HaloLabsChallenge.

Install the dependencies and devDependencies and start the server.

```sh
$ cd HaloLabsChallenge
$ npm install
$ npm start
```

## Result
[![Logo HaloLabs](https://github.com/DavAnaton/HaloLabsChallenge/raw/master/Docs/Screenshot.png)]()

## Development

Want to contribute?
We still have much to do. Here's a small list:
#### Todos

- Use [aframe-ui-modal-component](https://www.npmjs.com/package/aframe-ui-modal-component) to hide/display menu
- Add other functions to the menu
- Split the class declarations in different files 
	- Create a ```src/Menu``` folder
	- Move the classes ```Menu``` and ```Fuseable``` respectively to ```Menu.js``` and ```Fuseable.js```
- Implement components from the [awesome-aframe](https://github.com/aframevr/awesome-aframe) collection. The most interesting starting points seem to be:
	- [aframe-leap-hands](https://github.com/openleap/aframe-leap-hands)
	- [aframe-animation-component](https://github.com/ngokevin/aframe-animation-component)
	- [aframe-heatmap3d](https://github.com/morandd/aframe-heatmap3d)
- However, these components seem easier to implement. It would be a better idea to start here:
	- [aframe-gradient-sky](https://github.com/zcanter/aframe-gradient-sky)
	- [aframe-lensflare-component](https://github.com/mokargas/aframe-lensflare-component)
	- [aframe-mario-star-component](https://github.com/casonclagg/aframe-mario-star-component)
