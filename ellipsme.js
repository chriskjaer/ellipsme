
var ellipsme = (function () {
  'use strict';

  function getInfo(items) {
    [].forEach.call(items, function(item) {
      item.setAttribute('data-ellipsme', 'loading');

      var styles = window.getComputedStyle(item),
          parentStyles = window.getComputedStyle(item.parentElement);

      item.paddingHorizontal = parseInt(parentStyles.getPropertyValue('padding-left')) + parseInt(parentStyles.getPropertyValue('padding-right'));
      item.paddingVertical = parseInt(parentStyles.getPropertyValue('padding-top')) + parseInt(parentStyles.getPropertyValue('padding-bottom'));
      item.originalText = item.textContent.trim();
      item.lineHeight = parseInt(styles.getPropertyValue('line-height'), 10);
      item.fontSize = parseInt(styles.getPropertyValue('font-size'), 10);
      item.charSize = (item.offsetWidth / item.textContent.length) * 1.2;
      item.removeAttribute('data-ellipsme');

      console.log('Char Size: ' + item.charSize + 'px \nFont Size: ' + item.fontSize + 'px');
    });

    return items;
  }

  function getMaxChars(item) {
    var parent = item.parentElement,
        height = parent.offsetHeight - item.paddingVertical,
        width = parent.offsetWidth - item.paddingHorizontal;
    var maxChars = Math.ceil((width / item.charSize) * (height / item.lineHeight));
    return maxChars;
  }

  function truncateItems(items) {
    [].forEach.call(items, function(item) {
      var maxChars = getMaxChars(item),
          ellipse = maxChars >= item.originalText.length ? '' : '…';
      item.textContent = item.originalText.slice(0, maxChars) + ellipse;
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
