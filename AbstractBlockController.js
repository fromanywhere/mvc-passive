/*global define*/
define([
    'AbstractController'
], function (
    /** AbstractController */ AbstractController
) {

    /**
     * Абстрактный блочный контроллер
     * Принимает параметры рендеринга.
     * На основании параметров принимает решение, следует ли возвращать результат рендера сопоставленного View (по умолчанию — да)
     */
    class AbstractBlockController extends AbstractController {

        /**
         *
         * @param {AppRequestCtx} ctx
         */
        constructor (ctx) {
            super();
            this.needRender = this.handleRequest(ctx);

            if (typeof this.needRender !== 'boolean') {
                throw new Error('needRender должен быть boolean');
            }

            if (this.needRender) {
                this.ctx = this.getViewCtx(ctx);
            }
        }

        /**
         * Возвращает контекст для View
         * По умолчанию возвращается контекст запроса
         * Опционально может быть переопределен для хранения дополнительных полей и методов
         * @param {AppRequestCtx} ctx
         */
        getViewCtx (ctx) {
            return ctx;
        }

        /**
         * Возвращает экземпляр View для блока
         * @return {View}
         */
        getView() {
            throw new Error('Необходимо определить View');
        }

        /**
         * Метод-заглушка для обработки запроса
         * Возвращает признак необходимости рендера блока
         * @param {AppRequestCtx} ctx
         * @return {Boolean}
         */
        handleRequest(ctx) {
            return true;
        }

        /**
         * Отрисовывает View при необходимости
         * @return {String|null}
         */
        render() {
            return this.needRender
                ? this.getView().render()
                : null;
        }
    }

    return AbstractBlockController;
});