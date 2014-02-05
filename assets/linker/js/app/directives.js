'use strict';


//
// Directives
// ---------------------------

angular.module('blogApp.directives', [])

  .directive('auth', function() {
    return {
      link: function(scope, el, attr) {
        scope.$on('event:auth-confirmed', function () {
          el.modal('hide');
        });

        el.modal('setting', {
          onApprove: function () {
            scope.login();
            return false;
          }
        });
      }
    }
  })

  .directive('showModal', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        $(el).on('click', function () {
          $(attrs.showModal).modal('show');
        });
      }
    };
  })

  .directive('markdown', function () {
    var converter = new Showdown.converter();

    return {
      restrict: 'E',
      require: 'ngModel',
      link: function (scope, el, attrs, model) {
        scope.$watch(attrs['ngModel'], function () {
          var value = model.$modelValue || '';
          var html = converter.makeHtml(value);

          // Truncate element if necessary
          if (attrs['truncate']) {
            html = $.truncate(html, {
              length: attrs['truncate']
            });
          }

          el.html(html);
        });
      }
    }
  })

  .directive('postEditor', ['$fileUpload', 'Globals', function ($fileUpload, Globals) {
    jQuery.fn.extend({
      insertAtCaret: function(myValue){
        return this.each(function(i) {
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
        });
      }
    });

    return {
      controller: function ($scope, $fileUpload, growl) {
        $scope.upload = function (files, cb) {
          var filesPath = [], filesProcessed = 0;
          for (var i = 0; i < files.length; i++) {
            $fileUpload.upload(files[i]).then(function (filePath) {
              filesProcessed++;
              filesPath.push(filePath);
              growl.addSuccessMessage('File ' + filePath + ' uploaded');
              if (filesProcessed === files.length) cb(filesPath);
            }, function (err) {
              filesProcessed++;
              growl.addSuccessMessage('File upload error. ' + err);
              if (filesProcessed === files.length) cb(filesPath);
            });
          }
        };
      },
      link: function (scope, el, attrs) {
        var dimmer = el.find('.ui.dimmer');

        el.find('.upload-field').change(function (e) {
          dimmer.addClass('active');
          scope.upload(e.target.files, function (files) {
            if (files) {
              angular.forEach(files, function (filePath) {
                el.find('textarea').insertAtCaret('![alt text](' + filePath + ')').change();
              });
            }
            dimmer.removeClass('active');
          });
        });
      }
    };
  }]);
