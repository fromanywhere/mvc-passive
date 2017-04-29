define([
    'doT.min'
], function (
    /** doT */ dot
) {

    /**
     * Реализация View
     * Отрисовывает заданный шаблон с использованием заданных параметров
     */
    class View {

        /**
         *
         * @param {String} templateId
         * @param {Object} params
         */
        constructor(templateId, params) {
            this.templateId = templateId;
            this.params = params;
            this.template = document.getElementById(this.templateId).innerHTML;
        }
    
        render() {
            return dot.template(this.template)(this.params);
        }
    }
    
    return View;
});