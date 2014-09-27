'use strict';

// 屏蔽右键菜单
window.addEventListener('contextmenu', 
  function(e) {
    e.preventDefault();
  }, false);