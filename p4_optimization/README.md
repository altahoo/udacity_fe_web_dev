## Website Performance Optimization portfolio project

#Usage:

1. To run the appliation:
	- Unzip the file to project-folder
	- Go to the project folder: cd /path/to/project-folder
	- Run this command: python -m SimpleHTTPServer 8080
	- Open a browser and visit localhost:8080

2. To check PageSpeed Insights score for index.html
	- Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.
	- Run this command in the folder where you intalled ngrok: ./ngrok http 8080
	- Copy and paste the public url from ngrok output to PageSpeed Insights (https://developers.google.com/speed/pagespeed/insights/) and analyze

3. The check the frame rate for pizza.html
	- Use Chrome dev tool to analyze the timeline and console output


#Optimization:

Part 1: Optimize PageSpeed Insights score for index.html

The original score: is (mobile, desktop) -> (27, 30)

To optimize the score, I did the following: 
1. Compressed images using tinypng (https://tinypng.com/)
2. Deferred css using "async"
2. Deleted google font
3. Minified css, js
4. Resized pizzeria.jpg to pizzeria-small.jpg
5. Inclined css into html

The current PageSpeed Insights score is (95, 94).

####Part 2: Optimize Frames per Second in pizza.html

Note: There is word "optimization" in all the comments for the code I added for this optimization.

I made changes in the following places:
1. In changePizzaSizes():    
	- Rewrote the function to avoid forced synchoronization layout. 
2. In updatePositions():
	- Since there are only 5 possible values for phase, we can break the loop into two loops. One loop calculates the 5 phases, only 5 iterations are needed. The other loop calculates the position by iterating every item.
3. Reduce the number of generated pizzas from 200 to 40, which is multiple of the current cols value, to cover the most common screen resolutions (up to 1920 x 1200 – Full-HD Cinema size).
4. Wrap up the updatePosition() to a request animation function
5. Use getElementBy... instead of QuerySelector... since the former calls are faster than the latter.
