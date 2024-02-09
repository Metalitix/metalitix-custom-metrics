const addMetalitixLookListener = (logger, scene, camera, aframe=false) => {
  const raycaster = new THREE.Raycaster()

  scene.traverse(child => {
    if (child.userData.mtxLookName) {
      logger.setAttribute(child.userData.mtxLookName, false)
    }
  })

  const checkLook = () => {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.intersectObjects(scene.children, true)

    const firstIntersectedObject = (aframe) ? intersects[0]?.object?.parent?.parent : intersects[0]?.object
    if (firstIntersectedObject && firstIntersectedObject.userData.mtxLookName) {
      logger.setAttribute(firstIntersectedObject.userData.mtxLookName, true)
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
      const loggerComponent = sceneEl.components['metalitix-logger']
      
      if(!(loggerComponent) || !(loggerComponent.logger)) {
        console.warn('[MetalitixLookListener] No metalitix-logger component found on the a-scene! Look events will not be recorded to Metalitix.')
        return
      }

      sceneEl.querySelectorAll('[mtx-look-name]').forEach(el => {
        el.object3D.userData.mtxLookName = el.getAttribute('mtx-look-name')
      })
      addMetalitixLookListener(loggerComponent.logger, sceneEl.object3D, sceneEl.camera, true)
    }
  })
}
  
  export { addMetalitixLookListener }