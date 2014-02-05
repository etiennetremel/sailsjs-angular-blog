;(function ($) {
  'use strict';
  var methods = {
    init : function (files, options) {
      var self = this,
          defaults = {
            loader: '.loader',
            toggledClass: 'active',
            uploadUrl: '/api/upload',
            acceptedTypes: ['image/png', 'image/jpeg', 'image/gif']
          };

      this.settings = $.extend({}, defaults, options);

      return this.each(function () {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          if ($.inArray(file.type, self.settings.acceptedTypes)) {
            $.ajax({
              type: 'post',
              url: self.settings.uploadUrl,
              xhr: self.xhr,
              cache: false,
              contentType: false,
              complete: self.uploadCompleted,
              processData: false,
              data: self.formatData(file)
            });
          }
        }
      });
    },

    insertAtCaret: function (myValue) {
      //return this.each(function (i) {
        if (document.selection) {
          //For browsers like Internet Explorer
          this.focus();
          var sel = document.selection.createRange();
          sel.text = myValue;
          this.focus();
        }
        else if (this.selectionStart || this.selectionStart == '0') {
          //For browsers like Firefox and Webkit based
          var startPos = this.selectionStart;
          var endPos = this.selectionEnd;
          var scrollTop = this.scrollTop;
          this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
          this.focus();
          this.selectionStart = startPos + myValue.length;
          this.selectionEnd = startPos + myValue.length;
          this.scrollTop = scrollTop;
        } else {
          this.value += myValue;
          this.focus();
        }
      //});
    },

    updateProgressBar: function () {

    },

    uploadCompleted: function () {
      $(loader).removeClass('active');
      //this.insertAtCaret('![alt text](' + filePath + ' ' + fileName + ')').change();
      this.insertAtCaret('text').change();
    },

    xhr: function () {
      var xhr = new XMLHttpRequest();
      xhr.upload.onprogress = this.updateProgressBar;
      return xhr;
    },

    formatData: function (file) {
      var formData = new FormData();
      formData.append('file', file);
      return formData;
    }
  };

  $.fn.imageUploader = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.imageUploader');
    }
  };
})(jQuery);