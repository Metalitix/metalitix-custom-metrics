function addMetalitixLookListener(logger, scene, camera) {
  const raycaster = new THREE.Raycaster()

  scene.traverse(child => {
    if (child.object3D && child.object3D.userData.mtxLookName) {
      logger.setAttribute(child.object3D.userData.mtxLookName, false)
    }
  })

  function checkLook() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const firstIntersectedObject = intersects[0].object
      if (firstIntersectedObject.userData.mtxLookName) {
        logger.setAttribute(firstIntersectedObject.userData.mtxLookName, true)
      }
    }
  }

  const onRender = () => {
    checkLook()
    requestAnimationFrame(onRender)
  }

  requestAnimationFrame(onRender)
}

if (typeof AFRAME !== 'undefined') {
  AFRAME.registerComponent('metalitix-look-listener', {
    init: function () {
      const sceneEl = this.el.closestScene('a-scene')
      const camera = sceneEl.camera
      const loggerComponent = sceneEl.components['metalitix-logger']
      if (loggerComponent && loggerComponent.logger) {
        sceneEl.querySelectorAll('[mtx-look-name]').forEach(el => {
          el.object3D.userData.mtxLookName = el.getAttribute('mtx-look-name')
        })
        addMetalitixLookListener(loggerComponent.logger, sceneEl.object3D, camera)
      } else {
        console.warn('[MetalitixLookListener] No metalitix-logger component found on the a-scene! Look events will not be recorded to Metalitix.')
      }
    }
  })
}

export { addMetalitixLookListener }