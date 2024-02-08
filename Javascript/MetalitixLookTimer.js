function addMetalitixLookTimer(logger, scene, camera) {
  const raycaster = new THREE.Raycaster()
  let currentLookName = null
  let lookStartTime = Date.now()

  function checkLook() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    const firstIntersectedObject = intersects.length > 0 ? intersects[0].object : null
    const firstIntersectedObjectName = firstIntersectedObject?.userData.mtxLookName || null
    const currentTime = Date.now()
    const timeLooked = currentTime - lookStartTime

    if (currentLookName && (timeLooked >= 1000 || firstIntersectedObjectName !== currentLookName)) {
      logger.logState(currentLookName, timeLooked)
      lookStartTime = currentTime
    }

    if(firstIntersectedObjectName !== currentLookName) {
      lookStartTime = currentTime
      currentLookName = firstIntersectedObjectName
    }
  }

  const onRender = () => {
    checkLook()
    requestAnimationFrame(onRender)
  }

  requestAnimationFrame(onRender)
}

if (typeof AFRAME !== 'undefined') {
  AFRAME.registerComponent('metalitix-look-timer', {
    init() {
      const sceneEl = this.el.closestScene('a-scene')
      const camera = sceneEl.camera
      const loggerComponent = sceneEl.components['metalitix-logger']
      if (loggerComponent && loggerComponent.logger) {
        sceneEl.querySelectorAll('[mtx-look-name]').forEach(el => {
          if (el.object3D) el.object3D.userData.mtxLookName = el.getAttribute('mtx-look-name')
        })
        addMetalitixLookTimer(loggerComponent.logger, sceneEl.object3D, camera)
      } else {
        console.warn('[MetalitixLookTimer] No metalitix-logger component found on the a-scene! Time looked will not be recorded to Metalitix.')
      }
    }
  })
}

export { addMetalitixLookTimer }