# Raymarching in OpenGL
[GitHub](https://github.com/carterjandrew/computer_graphics_final_project)

![alt text](/images/raymarching.png)

## Motivation
Ray Marching is a facinating approach to cheating the computational demands of ray tracing, with some stipulations. 

Traditional ray marching projects rays out from the camera and simulates their bounces by stepping the rays forward. Ray marching dramatically lowers the number of steps by allowing us to define a maximum safe distance we can step a ray forward. We do this by defining every single object in a 3d scene not by a series of planes or trianges but instead by the minimum distance from any point in space to the surface of the object. 

Because of this it can be incredibly challanging to render more complex objects as it would be hard to make a function to define their distances. But this interesting approach to defining objects in 3d allows for some interesting effects, as seen in the photo above. I can easily subtract the volumes of one object from another. Interpolate between edges of objects. And create many instances of the same object without taxing computation. 

If you would like to learn more there are many amazing sources to learn more about raymarching online. 