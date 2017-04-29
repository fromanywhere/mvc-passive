define([
    'AppRequestCtx'
], function (
    /** AppRequestCtx */ AppRequestCtx
) {

    /**
     * Класс контекста для View
     * Позволяет писать в наследуемых классах произвольную логику обработки запрошенных данных из Model
     * Позволяет View получать не только данные из Model, но и состояние (State) приложения
     */
    class ViewCtx extends AppRequestCtx {

        /**
         *
         * @param {AppRequestCtx} ctx
         */
        constructor(ctx) {
            super(ctx.getStateId(), ctx.getStateParams());
        }

        /**
         *
         * @return {Object}
         */
        getTemplateParams() {
            return {};
        }
    }

    return ViewCtx;
});