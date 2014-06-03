
var ellipsme = (function () {
  'use strict';

  function getInfo(items) {
    [].forEach.call(items, function(item) {
      var styles = window.getComputedStyle(item);
      item.originalText = item.innerHTML.trim();
      item.lineHeight = parseInt(styles.getPropertyValue('line-height'), 10);
      item.fontSize = parseInt(styles.getPropertyValue('font-size'), 10);
    });

    return items;
  }

  function getMaxChars(item) {
    var parent = item.parentElement,
        height = parent.offsetHeight,
        width = parent.offsetWidth,
        fontWidth = item.fontSize * 0.60; // We assume the average character width is 40% of the font size

    return Math.ceil(width / fontWidth) * (height / item.lineHeight);
  }

  function truncateItems(items) {
    [].forEach.call(items, function(item) {
      item.innerHTML = item.originalText.slice(0, getMaxChars(item)) + '…';
    });
  }

  return {
    init: function(items) {
      items = getInfo(items);

      truncateItems(items);

      window.addEventListener('resize', resizeThrottle, false);

      var resizeTimeout;
      function resizeThrottle() {
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            truncateItems(items);
          }, 250);
        }
      }
    }
  };
}());
