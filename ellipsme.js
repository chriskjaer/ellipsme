
var ellipsme = (function () {
  'use strict';

  function getInfo(items) {
    [].forEach.call(items, function(item) {
      item.setAttribute('data-ellipsme', 'loading');

      var getStyle = {
        parent: function (prop) {
          return parseInt(window.getComputedStyle(item.parentElement).getPropertyValue(prop), 10);
        },
        current: function (prop) {
          return parseInt(window.getComputedStyle(item).getPropertyValue(prop), 10);
        }
      };

      item.paddingHorizontal = getStyle.parent('padding-left') + getStyle.parent('padding-right');
      item.paddingVertical   = getStyle.parent('padding-top') + getStyle.parent('padding-bottom');
      item.originalText      = item.textContent.trim();
      item.lineHeight        = getStyle.current('line-height');
      item.fontSize          = getStyle.current('font-size');
      item.charSize          = (item.offsetWidth / item.textContent.length) * 1.2;

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
