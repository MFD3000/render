angular.module('templates-main', ['templates/html/directive-templates/field/checkbox.html', 'templates/html/directive-templates/field/date.html', 'templates/html/directive-templates/field/default.html', 'templates/html/directive-templates/field/dropdown.html', 'templates/html/directive-templates/field/email.html', 'templates/html/directive-templates/field/hidden.html', 'templates/html/directive-templates/field/password.html', 'templates/html/directive-templates/field/radio.html', 'templates/html/directive-templates/field/textarea.html', 'templates/html/directive-templates/field/textbox.html', 'templates/html/directive-templates/field/textfield.html', 'templates/html/directive-templates/form/form.html', 'views/form-view.html', 'views/forms-list.html', 'views/login.html']);

angular.module("templates/html/directive-templates/field/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/checkbox.html",
    "<br>\n" +
    "<input  ng-model=\"field.field_value\" id=\"{{field.field_id}}\" type=\"checkbox\" ng-true-value=\"1\" ng-false-value=\"0\" ng-required=\"field.field_required\"/>\n" +
    "<label class=\"form-field-label\" for=\"{{field.field_id}}\">{{field.field_title}}</label>\n" +
    "<span class=\"required-error\" ng-show=\"field.field_required && field.field_value == 0\">(* required)</span>\n" +
    "\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/date.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/date.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required </span>\n" +
    "    <div class=\"span4\">\n" +
    "        <div class=\"control-group input-append\">\n" +
    "            <input type=\"text\" ng-model=\"field.field_value\" data-date-format=\"mm/dd/yyyy\" bs-datepicker  ng-required=\"field.field_required\">\n" +
    "            <button type=\"button\" class=\"btn\" data-toggle=\"datepicker\"><i class=\"icon-calendar\"></i></button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/default.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/default.html",
    "<h3>Default template.  This field has not been wired up</h3>\n" +
    "<ul ng-switch on=\"field.data.modelId\">\n" +
    "	<li >Widget Name: {{field.name}}</li>\n" +
    "	<li >Widget Type: {{field.type}}</li>\n" +
    "	<li >Widget Id: {{field.id}}</li>\n" +
    "	<li >Widget Model Id: {{field.data.modelId}}</li>\n" +
    "	<li ng-switch-when=\"junction\">Testing Nested Directive: Junction</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/dropdown.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <select ng-model=\"field.field_value\"ng-options=\"option.option_id as option.option_title for option in field.field_options\"\n" +
    "                sng-required=\"field.field_required\"></select>\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<br>");
}]);

angular.module("templates/html/directive-templates/field/email.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/email.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <input type=\"text\" placeholder=\"Email\" value=\"{{field.field_value}}\" ng-model=\"field.field_value\" ng-required=\"field.field_required\"/>\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/hidden.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/hidden.html",
    "<input type=\"hidden\" ng-model=\"field.field_value\" value=\"{{field.field_value}}\">\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/password.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/password.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <input type=\"password\" ng-model=\"field.field_value\" value=\"{{field.field_value}}\"  ng-required=\"field.field_required\">\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/radio.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <div ng-repeat=\"option in field.field_options\" class=\"row-fluid\">\n" +
    "            <label>\n" +
    "                <input type=\"radio\" value=\"{{option.option_value}}\" ng-model=\"field.field_value\"  ng-required=\"field.field_required\"/>\n" +
    "                &nbsp;<span ng-bind=\"option.option_title\"></span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<br>");
}]);

angular.module("templates/html/directive-templates/field/textarea.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/textarea.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <textarea type=\"text\" ng-model=\"field.field_value\" value=\"{{field.field_value}}\" ng-required=\"field.field_required\"></textarea>\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/html/directive-templates/field/textbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/textbox.html",
    "<h3>Textbox Widget: {{field.name}}</h3>\n" +
    "<ul ng-switch on=\"field.data.modelId\">\n" +
    "	<li >Widget Name: {{field.name}}</li>\n" +
    "	<li >Widget Type: {{field.type}}</li>\n" +
    "	<li >Widget Id: {{field.id}}</li>\n" +
    "	<li >Widget Model Id: {{field.data.modelId}}</li>\n" +
    "	<li ng-switch-when=\"junction\">Testing Nested Directive: Junction</li>\n" +
    "</ul>\n" +
    "\n" +
    "  ");
}]);

angular.module("templates/html/directive-templates/field/textfield.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/field/textfield.html",
    "<div class=\"field row\">\n" +
    "    <div class=\"span2\">{{field.field_title}}:</div>\n" +
    "    <div class=\"span4\">\n" +
    "        <input type=\"text\" ng-model=\"field.field_value\" value=\"{{field.field_value}}\" ng-required=\"field.field_required\">\n" +
    "        <span class=\"required-error\" ng-show=\"field.field_required && !field.field_value\">* required</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/html/directive-templates/form/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/html/directive-templates/form/form.html",
    "\n" +
    "<h2>{{form.name}}</h2>\n" +
    "\n" +
    "<div ng-show=\"!form.submitted\">\n" +
    "    <div class=\"field row\">\n" +
    "        <div class=\"span2\">Form ID: {{ form.id }}</div>\n" +
    "    </div>\n" +
    "    <form name=\"myForm\" id=\"myForm\" >\n" +
    "        <div ng-repeat=\"widget in form.widgets\" >\n" +
    "            \n" +
    "            <field-directive field=\"widget\" >\n" +
    "\n" +
    "            </field-directive>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "\n" +
    "    <div class=\"form-actions\">\n" +
    "        <p class=\"text-center\">\n" +
    "            <button class=\"btn btn-success right\" type=\"button\" ng-disabled=\"!myForm.$valid\" ng-click=\"submit()\"><i class=\"icon-edit icon-white\"></i> Submit Form</button>\n" +
    "            <button class=\"btn btn-danger right\" type=\"button\" ng-click=\"cancel()\"><i class=\"icon-remove icon-white\"></i> Cancel</button>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"form.submitted\">\n" +
    "    <h3>Submitted Data</h3>\n" +
    "    <div ng-repeat=\"field in form.form_fields\">\n" +
    "        Field Title: {{ field.field_title }} <br>\n" +
    "        Field Value: {{ field.field_value }} <br><br>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/form-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/form-view.html",
    "\n" +
    "<form-directive form=\"form\"></form-directive><hr>\n" +
    "\n" +
    "\n" +
    "<a ng-show=\"!showJson\" ng-click=\"showJson = true\">Show form json object</a>\n" +
    "<a ng-show=\"showJson\" ng-click=\"showJson = false\">Hide form json object</a><br><br>\n" +
    "<div ng-show=\"showJson\">\n" +
    "    <h4>Form object content:</h4>\n" +
    "    <pre>{{ form | json }}</pre>\n" +
    "    \n" +
    "</div>\n" +
    "");
}]);

angular.module("views/forms-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/forms-list.html",
    "<div>\n" +
    "    <ul ng-repeat=\"form in forms\" >\n" +
    "        <li><a href=\"#/forms/{{form.form.id}}/view\">Form Name: {{form.form.name}}</a></li>\n" +
    "        <li>Form Id: {{form.form.id}}</li>\n" +
    "        <li>\n" +
    "            <ul ng-repeat=\"widget in form.form.widgets\">\n" +
    "                <li > <field-directive field=\"widget\" ></li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "    </ul>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/login.html",
    "<form name=\"loginForm\" id=\"loginForm\" >\n" +
    "<div class=\"list\">\n" +
    "  <label class=\"item item-input\">\n" +
    "    <span class=\"input-label\" >Username</span>\n" +
    "    <input type=\"text\" ng-model=\"user.name\">\n" +
    "  </label>\n" +
    "  <label class=\"item item-input\">\n" +
    "    <span class=\"input-label\" >Password</span>\n" +
    "    <input type=\"password\" ng-model=\"user.password\">\n" +
    "  </label>\n" +
    "</div>\n" +
    "<button class=\"btn btn-success right\" type=\"button\"  ng-click=\"submit(user)\">Submit</button>\n" +
    "</form>");
}]);
