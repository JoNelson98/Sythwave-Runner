# Synthwave Runner

This is a starfox like game using @react-three/fiber, three.js wrapper.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

remember to npm install the dependencies after cloning the repo

```
npm install
```

### Git notes for Armond

clone the repo

```
git clone [project url]
```

create a branch to make changes on

```
git co -b new_branch
```

adds your code changes to be committed

```
git add .
```

commit your changes (add a name to the change)

```
git commit -m "some new change"
```

push code to repo and make a pr then request me to review in the gui on github

```
git push
```

### What does it look like?

[Space Game](https://i.imgur.com/YGSDQwG.gifv)

<table>
  <tr>
    <td>This game is the precursor to the game idea use it as a reference. (<a href="https://codesandbox.io/s/space-game-i2160">live demo</a>).</td>
    <td>
      <a href="https://codesandbox.io/s/space-game-i2160">
        <img src="https://i.imgur.com/BO01p1Hm.gif" />
      </a>
      </td>
  </tr>
</table>

# Documentation, tutorials, examples

Visit [docs.pmnd.rs](https://docs.pmnd.rs/react-three-fiber)

<a href="https://docs.pmnd.rs/react-three-fiber"><img src="/docs/preview.jpg"></a>

# Fundamentals

You need to be versed in both React and Threejs before rushing into this. If you are unsure about React consult the official [React docs](https://reactjs.org/docs/getting-started.html), especially [the section about hooks](https://reactjs.org/docs/hooks-reference.html). As for Threejs, make sure you at least glance over the following links:

1. Make sure you have a [basic grasp of Threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). Keep that site open.
2. When you know what a scene is, a camera, mesh, geometry, material, fork the [demo above](https://github.com/pmndrs/react-three-fiber#what-does-it-look-like).
3. [Look up](https://threejs.org/docs/index.html#api/en/objects/Mesh) the JSX elements that you see (mesh, ambientLight, etc), _all_ threejs exports are native to three-fiber.
4. Try changing some values, scroll through our [API](https://docs.pmnd.rs/react-three-fiber/API) to see what the various settings and hooks do.

Some reading material:

- [Threejs-docs](https://threejs.org/docs)
- [Threejs-examples](https://threejs.org/examples)
- [Threejs-fundamentals](https://threejsfundamentals.org)
- [Discover Threejs](https://discoverthreejs.com)
- [Do's and don'ts](https://discoverthreejs.com/tips-and-tricks) for performance and best practices
- [react-three-fiber alligator.io tutorial](https://alligator.io/react/react-with-threejs) by [@dghez\_](https://twitter.com/dghez_)

# Ecosystem

- [`@react-three/gltfjsx`](https://github.com/pmndrs/gltfjsx) &ndash; turns GLTFs into JSX components
- [`@react-three/drei`](https://github.com/pmndrs/drei) &ndash; useful helpers for react-three-fiber
- [`@react-three/postprocessing`](https://github.com/pmndrs/react-postprocessing) &ndash; post-processing effects
- [`@react-three/flex`](https://github.com/pmndrs/react-three-flex) &ndash; flexbox for react-three-fiber
- [`@react-three/xr`](https://github.com/pmndrs/react-xr) &ndash; VR/AR controllers and events
- [`@react-three/cannon`](https://github.com/pmndrs/use-cannon) &ndash; physics based hooks
- [`@react-three/a11y`](https://github.com/pmndrs/react-three-a11y) &ndash; real a11y for your scene
- [`zustand`](https://github.com/pmndrs/zustand) &ndash; state management
- [`react-spring`](https://github.com/pmndrs/react-spring) &ndash; a spring-physics-based animation library
- [`react-use-gesture`](https://github.com/pmndrs/react-use-gesture) &ndash; mouse/touch gestures
- [`leva`](https://github.com/pmndrs/leva) &ndash; create GUI controls in seconds
