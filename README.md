# Learning WebGL and Three.js

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

  - [Lesson 2](#lesson-2)
  - [Lesson 3](#lesson-3)
    - [Basic 4 elements](#basic-4-elements)
  - [Lesson 4: Transform Objects](#lesson-4-transform-objects)
    - [Gimble Lock](#gimble-lock)
    - [Euler vs Quaternion](#euler-vs-quaternion)
    - [Group](#group)
  - [Lesson 5](#lesson-5)
    - [GreenSock](#greensock)
  - [Lesson 6](#lesson-6)
    - [Plane and z-fighting](#plane-and-z-fighting)
    - [Orthographic Camera](#orthographic-camera)
    - [Cursor movement](#cursor-movement)
    - [Device specific camera control](#device-specific-camera-control)
  - [Lesson 7](#lesson-7)
    - [Viewport resizing](#viewport-resizing)
    - [Pixel ratio](#pixel-ratio)
    - [Fullscreen](#fullscreen)
  - [Lesson 8](#lesson-8)
    - [Geometry](#geometry)
    - [Custom geometry](#custom-geometry)
  - [Lesson 9](#lesson-9)
    - [Debug UI](#debug-ui)
    - [General properties](#general-properties)
    - [Non-modifiable properties](#non-modifiable-properties)
  - [Lesson 10](#lesson-10)
    - [Textures](#textures)
    - [PBR principles](#pbr-principles)
    - [Using textures](#using-textures)
    - [UV unwrapping](#uv-unwrapping)
    - [Transformation](#transformation)
    - [Filtering and mipmapping](#filtering-and-mipmapping)
    - [Format and optimisation](#format-and-optimisation)
      - [Weight](#weight)
      - [Size](#size)
      - [Data](#data)

<!-- markdown-toc end -->

## Lesson 2

WebGL renders triangles, results are drawn in a `<canvas>`, uses GPU and works
on most modern browser.

## Lesson 3

Using Vite instead of Webpack. Node.js to run JavaScript (duh).

To create an npm (node package manager) project run:

```bash
npm init -y  # -y is for saying yes
```

To install Vite and three.js

```bash
npm init vite
npm init three
```

Dependencies are stored at `node_modules/` folder. `project.json` will store all
the information of the dependencies. `project-lock.json` contains the exact
version of the modules of the project without tolerance (optional).

To run the server do:

```bash
npm run dev  # added to scripts at package.json, there is also build
```

### Basic 4 elements

1. Scene
2. Object
3. Camera
4. Renderer

_Scene_ a container in which we put objects, models, particles, lights, etc.

_Objects_ are primitive geometries, imported models, particles, etc.

_Mesh_ is a combination of a geometry (the shape), and the material (the looks).

_Camera_ is a theoretical point of view used for rendering. Usually just using
one because it's code and the camera can be reused by jumping around.

`PerspectiveCamera` is what he uses. It takes two parameters, aspect ratio and
the field of view.

_Renderer_ will render the scene seen from the camera, the renderer will draw
the result on the canvas which are created on the html file.

By default camera will be at `0, 0, 0` position which are not that helpful,
objects (including the camera) can be transformed using `position`, `rotation`
and `scale`.

## Lesson 4: Transform Objects

To be able to animate objects we need to be able to move the object, to move an
object in WebGL we transform them.

1. position
2. scale
3. rotation
4. quaternion

All classes inherited from `Object3D` possess the above 4 properties. Compiled
in matrices.

There are many methods such as `normalise()` and
[`length()`](https://threejs.org/docs/?q=vector3#Vector3.length) available to
position because it is an `Vector3` objects. Check
[doc](https://threejs.org/docs/?q=vector3#Vector3)

Use `set()` to set all three axis at once.

Use `AxesHelper()` to show axis lines, note it is an object.

### Gimble Lock

`rotation()` on mesh object is in Euler format, use `Math.PI * scalar` to spin
the mesh around.

When applying rotation not in order axis can get \"locked\" where no matter how
you adjust the value of the axis it will \"not\" output the desired results,
that is what known as gimble locked.

Applying rotation in order is pretty important. Euler representation is the only
representation that can be gimble locked.

_Quaternion_ expresses a rotation, just remember it updates when you change
`rotation`.

### Euler vs Quaternion

Euler representation 3D rotation with 3 number of angle. Quaternion
representation 3D rotation with a scalar and a 3D vector.

[_Quaternion_](https://www.youtube.com/watch?v=PMvIWws8WEo) can be added,
multiply by scalar, and usually normalise and conjugation. It has order in
multiplication. WebGL is right-handedness.

$q = \cos\left(\frac{\theta}{2}\right) + \sin\left(\frac{\theta}{2}\right)
\cdot (a_x \mathbf{i} + a_y \mathbf{j} + a_z \mathbf{k})$

Divided by two because of transformation ($v' = a v a^{-1}$), where $v$ is the
original vector and the two $a$ rotates it. Science multiplying $a$ twice hence
the divided by two in the above equation.

### Group

Object can be group into a `Group` class, they will transform together.

## Lesson 5

`requestAnimationFrame` calls the provided function on the _next frame_.

Animation in three.js should not be tied to frame rate, computer with higher
frame rate will have a faster updating animation. Using delta time is one
solution as everyone exist on the same time.

```javascript
let time = Date.now(); // Time now

const tick = () => {
    // Animation loop
    const currentTime = Date.now();
    const deltaTime = currentTime - time; // calculate time between frame
    time = currentTime;

    mesh.rotation.x += 0.0005 * deltaTime; // use delta as reference
    mesh.rotation.z += 0.0005 * deltaTime;
    renderer.render(scene, camera); // rerender
    window.requestAnimationFrame(tick);
};

tick();
```

Three.js provides a built-in `Clock()` that have the same function as delta
time.

### GreenSock

Library like `GSAP` provides more control such as creating tweens, timelines,
etc. (tweens refers to object moving from A to B).

Note GreenSock runs on its own tick rate, independent to the tick mentioned
above. However it still requires three.js renderer for the animation to work on
an object.

## Lesson 6

`Camera` is an abstract class, remember to not use it directly. Use the derived
classes

1. Perspective camera
2. Array camera
3. Stereo camera (VR, depth)
4. Cube camera (6 render)
5. Orthographic camera (render without perspective)

### Plane and z-fighting

`PerspectiveCamera` provides near and far plane limit, object outside the ranges
will not be rendered.

[Z-fighting](https://en.wikipedia.org/wiki/Z-fighting) occur when two objects
are very close together at the z-plane where there are not enough precision to
distinguish one another.

Avoid extreme value for near and far plane as the larger ranges will reduce the
precision of the plane, increasing the chances of z-fighting.

### Orthographic Camera

`OrthographicCamera` initiate by providing its left, right, top and bottom
frustum.

Using the default value the cube will look flat, because it is rendering a
square into a rectangle canvas. To render the cube shape, multiply the aspect
ration to the left and right place frustum.

```javascript
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1
);
```

> TODO: need to study this a little bit more.

### Cursor movement

Using event listener on mouse the pixel can be extracted, to normalise the
tracking the pixel position can be divided by the viewport size.

```javascript
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width;
    cursor.y = event.clientY / sizes.height;
});
```

### Device specific camera control

Three.js provides built-in function to control the camera using device specific
hardware such as [Fly control](https://threejs.org/docs/?q=controls#FlyControls)
using WASD to move on keyboard and
[Arcball control](https://threejs.org/docs/?q=controls#ArcballControls) on touch
devices.

Note that camera control is not included by default with the three.js import,
search for the modules at either `/addon/` or `/example/jsm` within
`/node_modules/three` when importing.

```javascript
const canvas = document.querySelector('canvas.webgl'); // DOM Element
const controls = new OrbitControls(camera, canvas);
```

> DOM (Document Object Model) element is an object representing a specific HTML
> or XML tag within a web structure.

Additional control can be added to camera control, remember to update it with
`.update()` to see the effect.

Some additional controls, for example damping will stop occurring when camera is
not being updated by mouse. Putting `.update()` inside `requestAnimationFrame()`
will let the animation continue to update.

## Lesson 7

### Viewport resizing

Adjusting website's css allows better immersion for the users. Best practice to
try the website with camera control disabled to check for overflow if user
happens to not be able to control the camera due to different devices/browser
combo being used.

1. margin and padding
2. hide overflow (scrolling)
3. blue highlight outline

When handling resizing windows, remember to handle both the camera and the
render resize, they are separate.

### Pixel ratio

Higher resolution display like Apple's retina allows software pixel to divided
into more tinier pixel to make render sharper, the amount of pixel per row or
column multiplied by this is the pixel ratio. Pixel ratio of 2 render a single
pixel into 4, smart phones tiny 4k display goes up to 5.

Find devie pixel ratio with `window.devicePixelRatio` and set it to renderer.

### Fullscreen

Using either a button or an event (e.g. 'dblclock'), remember to support older
devices.

## Lesson 8

### Geometry

Geometries in WebGL composes of _vertices_ (points in spaces) and _faces_
(triangles joined by vertices to create surface). Rendering the faces it becomes
meshes, without rendering it geometry can used for particles.

Each vertex has `position`, `UV`, `normal` and more.

Built-in geometry inherits from `BufferGeometry`, consult its documentation (for
example [`CircleGeometry`](https://threejs.org/docs/?q=geomet#CircleGeometry))
before creating a custom geometry. Remember combining shapes also create complex
object.

`width/height/depthSegments` of subdivision can be adjusted on each face to add
more details to a face. Enabling wireframe on an object to see its subdivision.

### Custom geometry

The Following creates a flat right angle triangle.

1. Float32Array(9) for 3 vertices positions
2. Pass positions to `BufferAttribute`
3. Initialise `BufferGeometry` object
4. Use `setAttribute` to set `position` to `BufferGeometry`

`position` attribute is a Three.js name, is it the name they chose to represents
shader.

9 elements array for 3 vertices are

1. 0, 1, 2 are first vertex x, y, z
2. 3, 4, 5 are second vertex x, y, z
3. 6, 7, 8 are third vertex x, y, z

```javascript
const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionAttribute);
```

> Sometimes geometry can share the same vertex, using indexing vertex can be
> marked as reusable and it can leveraged as optimisation.

## Lesson 9

### Debug UI

There are library for accessing features of Three.js within the viewport. The
course uses [lil-gui](https://lil-gui.georgealways.com/).

Tweak types include

1. Range
2. Colour
3. Text
4. Checkbox
5. Select
6. Button

use `gui.add()` to add object's properties to the debug menu. Refer to
documentation for the latest update.

### General properties

Variable can also be added to gui slider, while `gui.add()` cannot take variable
directly, the variable can be wrapped inside an object for the sake for being an
object and pass that to `gui.add()`.

> Three.js does optimisation automatically, it happens to colour as well, that's
> the reason why the colour is different from colour picker and the hex colour.
> remember to use `getHexstring()` to get the raw value.

An object can store multiple different types of variables and function, create
one object designated for debug is one way to handle it.

Folders are available to organise the options.

### Non-modifiable properties

Properties like `widthSegment` of a geometry, once rendered doesn't not change
even after when the value itself is changed. To add this variable to the debug
menu, the object must be destroy and re-rendered with the new assigned value.

> Remember to `dispose()` the old geometry to prevent memory leaks.

## Lesson 10

### Textures

Textures are pictures that covers geometries. There are different types and
effects. Common types are

1. Colour or Albedo - Applied directly on object
2. Alpha - Grayscale, white visible black not visible
3. Height or Displacement - Grayscale, for subdivision, move vertices up/down
   for white/black
4. Normal - Add lighting details, doesn't need subdivision
5. Ambient occlusion - Grayscale, add fake shadows
6. Metalness - Grayscale, add reflection to white parts (i.e. metallic)
7. Roughness - Grayscale, add light dissipation, white/black for rough/smooth

### PBR principles

Textures follows PBR principles, often refereed as "Physically Based Rendering
method", a concept of using realistic shading and models in combination with
bunch of maths and algorithm to accurately mimic objects textures. A standard
way for realistic renders.

1. Energy conservation - object can reflect more light than received
2. Albedo - base colour map
3. Microsurface - surface roughness or smoothness
4. Reflectivity - percentage of light reflected
5. Fresnel - surface reflectivity at gazing angles
6. Ambient occlusion - represents large scale occluded light
7. Cavity - represents small scale occluded light

[Link 1]{https://marmoset.co/posts/basic-theory-of-physically-based-rendering/}
[Link 2]{https://marmoset.co/posts/physically-based-rendering-and-you-can-too/}

### Using textures

Three.js provides a class
([`TextureLoader()`](https://threejs.org/docs/?q=texture%20loader#TextureLoader))to
load image as texture, which does something like this:

```javascript
const image = new Image();
const texture = new THREE.Texture(image);
texture.colorSpace = THREE.SRGBColorSpace; // Texture used as map/matcap should be encoded in sRBG

image.onload = () => {
    texture.needsUpdate = true;
};

image.src = '/textures/image.jpg';
```

Although `TextureLoader()` already provide callback functions, for bigger
project the `loadingManager()` class can be taken advantage of as a global
loading progress tracker to mutualise the events. It provides `onStart`,
`onLoad`, `onProgress`, `onError` to listen to.

### UV unwrapping

Texture are being stretched or squeezed to cover the geometry, this is refereed
to as UV unwrapping. Each vertex has a 2D coordinate on a flat plane, the UV
coordinates can be accessed with `geometry.attributes.uv`.

UV coordinates on Three.js geometries are generated by Three.js, when defining a
custom geometry the programmer have to specify the UV coordinates.

### Transformation

Texture can be transformed, for example texture repeats, note by default only
the last texture would be repeated remember to enable wrapping. Rotation are in
radian.

```javascript
colorTexture.repeat.x = 4;
colorTexture.repeat.y = 2;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;

colorTexture.rotation = Math.PI / 6; // in radian
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
```

### Filtering and mipmapping

Mipmapping is a technique that consists of creating half a smaller version of a
texture again and again until we get a 1x1 texture. Those generated images will
be used according to size of the pixel on the object (smaller surface smaller
texture). _Minification_ filter is one example of mipmapping, the texture gets
"worse" when zooming out of an object, internally it is using a smaller scaled
of the provided texture.

There is also `magFilter` which changes the magnification filter of the texture.
For example, using `magFilter` with `NearestFilter` can make the image appear
sharper. Because the texture is practically less sharp, it helps with
performances as well.

In Three.js, both filters of the texture can be changed.

1. Nearest
2. Linear
3. Nearest mipmap nearest
4. Nearest mipmap linear
5. Linear mipmap nearest
6. Linear mipmap linear

> When using `THREE.NearestFilter` on `minFilter`, mipmapping is not needed.
> Disable it via `colorTexture.generateMipmaps = false`

### Format and optimisation

#### Weight

When user loads a website it will download all the texture that are being used
on it, the two main types are `.jpg` and `.png`. Former are lossy but lighter in
compression to the latter which are lossless and heavier. Use software like
`TinyPNG` to compress images. There is also one called `.basis`.

#### Size

Each pixel of the texture will be stored on the GPU, and each GPU has storage
limitation, enabling mipmapping will multiply the number of pixels to store.
Take care of the number of pixels and reduce the size of images as much as
possible.

Since mipmapping produces a half smaller version of the texture until 1 by 1,
images used for mipmapping has to be in power of 2, or the calculation will be
in float and slower and returns a bad result since Three.js will resize images
that are not in power of 2.

#### Data

Texture supports transparency, but `.jpg` does not inherently supports it like
`.png` does. Choose between sending colour with alpha `.jpg`s texture or sending
a single `.png` file to the GPU depending on the project.

Normal texture should provides exact values, use `.png` for normal texture as it
is _lossless_ and compression is not applied.

Data can also be combined into single texture by using red, green, blue and
alpha channels separately, and tell Three.js to apply different mesh to
different channel.

> Every Project is different and needs to be optimised differently finding the
> perfect combination.
