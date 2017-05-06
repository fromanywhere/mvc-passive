/*global define*/
define(function () {

    /**
     * Реализация View
     * Отрисовывает заданный шаблон с использованием заданных параметров
     */
    class View {

        /**
         *
         * @param {Function} template
         * @param {Object} params
         */
        constructor(template, params) {
            this.params = params;
            this.template = template;
        }
    
        render() {
            return this.template(this.params);
        }
    }
    
    return View;
});