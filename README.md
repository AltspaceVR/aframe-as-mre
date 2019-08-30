# A-Frame as MRE

This package loads an [A-Frame](https://aframe.io/) scene as a
[Mixed Reality Extension](https://github.com/Microsoft/mixed-reality-extension-sdk).

<img style='height: 500px' src='public/demo-mre.jpg' />
<img style='height: 500px' src='public/demo-aframe.jpg' />

## Usage

1. Install this adapter: `npm install -g @microsoft/aframe-as-mre`
2. Start the MRE server and point it at the desired A-Frame app
	1. By URL: `aframe-as-mre https://aframe.io/aframe/examples/animation/aframe-logo/?ui=false`
	2. By file path: `aframe-as-mre /www-content`
	3. By environment variable: `AFRAME_URL=/www-content aframe-as-mre`