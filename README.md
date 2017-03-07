# random-numbers
This repo contains work which shows the behavior of random numbers. This project currently has two use cases from random numbers. It takes random integer data array and then creates the following.

1. Random Bitmap
2. White Noise

In reality, most random numbers used in computer programs are pseudo-random, which means they are generated in a predictable fashion using a mathematical formula. This is fine for many purposes, but it may not be random in the way you expect if you're used to dice rolls and lottery drawings.

RANDOM.ORG offers true random numbers to anyone on the Internet. The randomness comes from atmospheric noise, which for many purposes is better than the pseudo-random number algorithms typically used in computer programs. This project uses APIs from Random.org.

I have used existing algorithms from online resources to generate bitmap and sound from the random data. I have tweaked them to integrate the API.
- Bitmap Source : https://gist.github.com/vukicevic/8112515
- Sound Source : https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer/getChannelData

- How to run the project 
 * Install dependencies using `npm install`
 * Run server using `node app.js`
 
For your questions contact me here : mitulpatel.hsd@gmail.com

Your suggestions, feedback, and comments are always welcome.