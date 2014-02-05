'use strict';

angular.module('angular-medium-editor', [])

  .directive('mediumEditor', function() {

    return {
      require: 'ngModel',
      restrict: 'AE',
      link: function (scope, iElement, iAttrs, ctrl) {

        angular.element(iElement).addClass("angular-medium-editor");

        // Parse options
        var opts = { };
        if (iAttrs.options) {
          opts = angular.fromJson(iAttrs.options);
        }

        var placeholder = opts.placeholder || 'Type your text';

        // view -> model
        iElement.on('blur', function() {

          scope.$apply(function() {

            // If user cleared the whole text, we have to reset the editor because MediumEditor
            // lacks an API method to alter placeholder after initialization
            if (iElement.html() == '<p><br></p>') {
              opts.placeholder = placeholder;
              var editor = new MediumEditor(iElement, opts);

              iElement.mediumInsert({
                imagesUploadScript: '/api/upload',
                editor: editor,
                images: true
              });
            }

            ctrl.$setViewValue(iElement.html());
          });
        });

        // model -> view
        ctrl.$render = function() {

          if (!editor) {
            // Hide placeholder when the model is not empty
            if (!ctrl.$isEmpty(ctrl.$viewValue)) {
              opts.placeholder = '';
            }

            var editor = new MediumEditor(iElement, opts);

            iElement.mediumInsert({
              imagesUploadScript: '/api/upload',
              editor: editor,
              images: true
            });
          }

          iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
        };

      }
    };

  });
