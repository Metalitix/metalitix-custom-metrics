function addMetalitixLookTimer(logger, scene, camera, aframe=false) {
  const raycaster = new THREE.Raycaster()
  let currentLookName = null
  let lookStartTime = Date.now()

  function checkLook() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    const firstIntersectedObject = (aframe) ? intersects[0]?.object?.parent?.parent : intersects[0]?.object
    const firstIntersectedObjectName = firstIntersectedObject?.userData.mtxTimerName

    const currentTime = Date.now()
    const timeLooked = currentTime - lookStartTime

    if (currentLookName && (timeLooked >= 1000 || firstIntersectedObjectName !== currentLookName)) {
      logger.logState(currentLookName, timeLooked / 1000)
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
    init: function () {
      const sceneEl = this.el.closestScene('a-scene')
      const loggerComponent = sceneEl.components['metalitix-logger']

      if(!(loggerComponent) || !(loggerComponent.logger)) {
        console.warn('[MetalitixLookTimer] No metalitix-logger component found on the a-scene! Time looked will not be recorded to Metalitix.')
        return
      }

      sceneEl.querySelectorAll('[mtx-timer-name]').forEach(el => {
        el.object3D.userData.mtxTimerName = el.getAttribute('mtx-timer-name')
      })
      addMetalitixLookTimer(loggerComponent.logger, sceneEl.object3D, sceneEl.camera, true)
    }
  })
}

export { addMetalitixLookTimer }