define(function () {

    /**
     * Контекст запроса
     * Хранит в себе идентификатор текущего состояния и параметры запроса
     */
    class AppRequestCtx {

        /**
         *
         * @param {String} stateId
         * @param {Object} [stateParams]
         */
        constructor(stateId, stateParams) {
            this.stateId = stateId;
            this.stateParams = stateParams;
        }

        /**
         * Возвращает текущий стейт
         * @return {String}
         */
        getStateId() {
            return this.stateId;
        }

        /**
         * Возвращает параметры запроса
         * @return {Object}
         */
        getStateParams() {
            return this.stateParams;
        }

        /**
         * Возвращает значение заданного параметра запроса
         * @param {String} paramName
         * @returns {*}
         */
        getParam(paramName) {
            return this.stateParams[paramName];
        }
    }

    return AppRequestCtx;
});