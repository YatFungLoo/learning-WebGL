# Learning WebGL and Three.js

- [Lesson 2](#lesson-2)
- [Lesson 3](#lesson-3)
  - [Basic 4 elements](#basic-4-elements)

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
