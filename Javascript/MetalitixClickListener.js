function addMetalitixClickListener(logger) {
  function handleButtonClick(event) {
      const eventName = event.target.getAttribute('mtx-event-name')
      const chartName = event.target.getAttribute('mtx-chart-name')

      if (!chartName) {
          console.warn(`[MetalitixClickListener] An element with ${eventName} does not have a mtx-chart-name attribute! It was not recorded to Metalitix.`)
      }
      else if (logger.isRunning()) {
          logger.logEvent(chartName, eventName)
      }
  }

  function setupEventListeners() {
      document.querySelectorAll('[mtx-event-name]').forEach(element => {
          element.addEventListener('click', handleButtonClick)
      })
  }

  setupEventListeners()
}

if (typeof AFRAME !== 'undefined') {
  AFRAME.registerComponent('metalitix-click-listener', {
      init: function () {
          const loggerComponent = document.querySelector('a-scene').components['metalitix-logger']
          if (loggerComponent && loggerComponent.logger) {
            addMetalitixClickListener(loggerComponent.logger)
          } else {
              console.warn('[MetalitixClickListener] No metalitix-logger component found on the a-scene! Click events will not be recorded to Metalitix.')
          }
      }
  })
}

export { addMetalitixClickListener }