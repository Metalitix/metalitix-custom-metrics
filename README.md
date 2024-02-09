# metalitix-custom-metrics

Metalitix™ is a powerful platform-agnostic software providing comprehensive 3D and immersive environment analytics, offering visualization tools, cross-platform compatibility, data security, and insights to optimize user experiences in the Metaverse. Compatible with popular 3D engines like Three.js, AFrame, Decentraland, 8th Wall, Unity, and Unreal Engine, it provides a suite of data collection and visualization tools for XR and 3D experiences.

This repository houses scripts from the community for collecting custom metrics in spatial experiences.

## Helpful Links
* **Metalitix:** https://metalitix.com
* **Metalitix Documentation:** https://docs.metalitix.com
* **Metalitix Supported Platforms:** https://docs.metalitix.com/supported-platforms
* **Metalitix Custom Metrics:** https://docs.metalitix.com/advanced-features/custom-metrics

&nbsp;
---

# MetalitixClickListener

Records session click events to a Metalitix chart.

### Platforms
* A-Frame
* All HTML-based platforms

### Usage
1. Create an `Event` chart on the [Metalitix dashboard](https://app.metalitix.com/).
2. Import `MetalitixClickListener.js` into your project as a module.
3. If using A-Frame, add `metalitix-click-listener` as an attribute to your `a-scene`. It will automatically pull the `MetalitixLogger` from the scene. For other platforms, use Javascript to call `addMetalitixClickListener(logger)`. Pass in your `MetalitixLogger` instance as the parameter.
4. Add `mtx-chart-name` and `mtx-event-name` attributes to the A-Frame or HTML elements that you want to track clicks.
5. That's it! When a click is registered on this element, it will record the event name you specified to the chart name in your Metalitix project.
  
### Example
```html
<head>
  <script type="module" src="./MetalitixClickListener.js"></script>
</head>
<body>
  <button mtx-chart-name='Click Events' mtx-event-name='UI Clicked' style="position: absolute; z-index: 100;"> Click me</button>
  <a-scene
    metalitix-logger="..."
    metalitix-click-listener
    >
    <a-entity id="my-scene" mtx-chart-name='Click Events' mtx-event-name='Scene Clicked'></a-entity>
  </a-scene>
</body>
```

&nbsp;
---

# MetalitixLookListener

When a session starts, record a value of false to the Metalitix chart. When the session looks at the object, change this value to true.

### Platforms
* A-Frame
* ThreeJS

### Usage
1. Create an `Attribute` chart on the [Metalitix dashboard](https://app.metalitix.com/).
2. Import `MetalitixLookListener.js` into your project as a module.
3. If using A-Frame, add `metalitix-look-listener` as an attribute to your `a-scene`. It will automatically pull the `MetalitixLogger` from the scene. For ThreeJS, use Javascript to call `addMetalitixLookListener(logger, scene, camera)`. Pass in your `MetalitixLogger` instance, your ThreeJS Scene, and your ThreeJS camera.
4. Add `mtx-look-name` attribute to the A-Frame elements you want to track. For ThreeJS objects, set the property `object3D.userData.mtxLookName` to the name of the chart you want to track.
5. That's it! When a session looks at this element, it will update the chart with the breakdown of sessions that have looked at the element.

### Example
```html
<head>
  <script type="module" src="./MetalitixLookListener.js"></script>
</head>
<body>
  <a-scene
    metalitix-logger="..."
    metalitix-look-listener
    >
    <a-entity id="my-scene" mtx-look-name='Looked at Scene'></a-entity>
  </a-scene>
</body>
```

&nbsp;
---

# MetalitixLookTimer

Records the total time in seconds a session has looked at a 3D object in the scene.

### Platforms
* A-Frame
* ThreeJS

### Usage
1. Create a `State` chart on the [Metalitix dashboard](https://app.metalitix.com/). Set the aggregation to `Sum`.
2. Import `MetalitixLookTimer.js` into your project as a module.
3. If using A-Frame, add `metalitix-look-timer` as an attribute to your `a-scene`. It will automatically pull the `MetalitixLogger` from the scene. For ThreeJS, use Javascript to call `addMetalitixLookTimer(logger, scene, camera)`. Pass in your `MetalitixLogger` instance, your ThreeJS Scene, and your ThreeJS camera.
4. Add `mtx-timer-name` attribute to the A-Frame elements you want to track. For ThreeJS objects, set the property `object3D.userData.mtxTimerName` to the name of the chart you want to track.
5. That's it! When a session looks at this element, it will update the chart with the total time in seconds that sessions have looked at the element.

### Example
```html
<head>
  <script type="module" src="./MetalitixLookListener.js"></script>
</head>
<body>
  <a-scene
    metalitix-logger="..."
    metalitix-look-listener
    >
    <a-entity id="my-scene" mtx-timer-name='Time Looking at Scene'></a-entity>
  </a-scene>
</body>
```