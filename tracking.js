(function() {
    var scriptTag = document.currentScript;
    var trackingId = scriptTag.getAttribute('data-tracking-id');
    var apiUrl = 'https://your-analytics-api.com/collect'; // Replace with your API URL.
  
    function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  
    function getSessionId() {
      var sessionId = localStorage.getItem('tracking_session_id');
      if (!sessionId) {
        sessionId = generateUUID();
        localStorage.setItem('tracking_session_id', sessionId);
      }
      return sessionId;
    }
  
    function collectEventData(eventData) {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
    }
  
    function trackPageView() {
      var eventData = {
        trackingId: trackingId,
        sessionId: getSessionId(),
        eventType: 'page_view',
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
      };
  
      collectEventData(eventData);
    }
  
    // Check for Do Not Track setting.
    function shouldTrack() {
      if ('doNotTrack' in navigator) {
        return navigator.doNotTrack !== '1';
      }
      return true;
    }
  
    // Track the page view if the user has not opted out.
    if (shouldTrack()) {
      trackPageView();
    }
  })();
  