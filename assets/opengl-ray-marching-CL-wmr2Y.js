import{j as e}from"./index-CsSN1-SM.js";function a(t){const n={a:"a",h1:"h1",h2:"h2",img:"img",p:"p",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"raymarching-in-opengl",children:"Raymarching in OpenGL"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://github.com/carterjandrew/computer_graphics_final_project",children:"GitHub"})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/raymarching.png",alt:"alt text"})}),`
`,e.jsx(n.h2,{id:"motivation",children:"Motivation"}),`
`,e.jsx(n.p,{children:"Ray Marching is a facinating approach to cheating the computational demands of ray tracing, with some stipulations."}),`
`,e.jsx(n.p,{children:"Traditional ray marching projects rays out from the camera and simulates their bounces by stepping the rays forward. Ray marching dramatically lowers the number of steps by allowing us to define a maximum safe distance we can step a ray forward. We do this by defining every single object in a 3d scene not by a series of planes or trianges but instead by the minimum distance from any point in space to the surface of the object."}),`
`,e.jsx(n.p,{children:"Because of this it can be incredibly challanging to render more complex objects as it would be hard to make a function to define their distances. But this interesting approach to defining objects in 3d allows for some interesting effects, as seen in the photo above. I can easily subtract the volumes of one object from another. Interpolate between edges of objects. And create many instances of the same object without taxing computation."}),`
`,e.jsx(n.p,{children:"If you would like to learn more there are many amazing sources to learn more about raymarching online."})]})}function o(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{o as default};