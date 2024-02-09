const addMetalitixClickListener = (logger) => {
  const handleButtonClick = (event) => {
    const eventName = event.target.getAttribute('mtx-event-name')
    const chartName = event.target.getAttribute('mtx-chart-name')
    logger.logEvent(chartName, eventName)
  }

  const setupEventListeners = () => {
    document.querySelectorAll('[mtx-chart-name],[mtx-event-name]').forEach(element => {
      const hasChartName = element.hasAttribute('mtx-chart-name')
      const hasEventName = element.hasAttribute('mtx-event-name')
      
      if (hasChartName && hasEventName) {
        element.addEventListener('click', handleButtonClick)
      } else {
        console.warn('[MetalitixClickListener] Element must have both mtx-chart-name and mtx-event-name attributes to log events.', element)
      }
    })
  }

  setupEventListeners()
}

if (typeof AFRAME !== 'undefined') {
  AFRAME.registerComponent('metalitix-click-listener', {
    init: function () {
      const loggerComponent = document.querySelector('a-scene').components['metalitix-logger']

      if(!(loggerComponent) || !(loggerComponent.logger)) {
        console.warn('[MetalitixClickListener] No metalitix-logger component found on the a-scene! Click events will not be recorded to Metalitix.')
        return
      }

      addMetalitixClickListener(loggerComponent.logger)
    }
  })
}

export { addMetalitixClickListener }