# Learning WebGL and Three.js

- [Lesson 2](#lesson-2)
- [Lesson 3](#lesson-3)
    - [Basic 4 elements](#basic-4-elements)
- [Gimble Lock](#gimble-lock)
- [Eular vs Quaternion](#eular-vs-quaternion)
- [Group](#group)

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

# Lesson 4: Transform Objects

To be able to animate objects we need to be able to move the object, to move an
object in WebGL we transform them.

1. position
2. scale
3. rotation
4. quaternion

All classes inherited from `Object3D` possess the above 4 properties. Compiled
in matrices.

There are many methods such as `normalize()` and
[`length()`](https://threejs.org/docs/?q=vector3#Vector3.length) available to
position because it is an `Vector3` objects. Check
[doc](https://threejs.org/docs/?q=vector3#Vector3)

Use `set()` to set all three axis at once.

Use `AxesHelper()` to show axis lines, note it is an object.

## Gimble Lock

`rotation()` on mesh object is in Eular format, use `Math.PI * scalar` to spin
the mesh around.

When applying rotation not in order axis can get \"locked\" where no matter how
you adjust the value of the axis it will \"not\" output the desired results,
that is what known as gimble locked.

Applying rotation in order is pretty important. Eular representation is the only
representation that can be gimble locked.

_Quaternion_ expresses a rotation, just remember it updates when you change
`rotation`.

## Eular vs Quaternion

Eular representation 3D rotation with 3 number of angle. Quaternion
representation 3D rotation with a scalar and a 3D vector.

[_Quaternion_](https://www.youtube.com/watch?v=PMvIWws8WEo) can be added,
multiply by scalar, and usually normalize and conjugation. It has order in
multiplication. WebGL is right-handedness.

$q = \cos\left(\frac{\theta}{2}\right) + \sin\left(\frac{\theta}{2}\right)
\cdot (a_x \mathbf{i} + a_y \mathbf{j} + a_z \mathbf{k})$

Divided by two because of transformation ($v' = a v a^{-1}$), where $v$ is the
original vector and the two $a$ rotates it. Science multiplying $a$ twice hence
the divided by two in the above equation.

## Group

Object can be group into a `Group` class, they will transfer together.
