/*global define*/
define([
    'AppRequestCtx'
],function (
    /** AppRequestCtx */ AppRequestCtx
) {

    /**
     * Реализация отрисовки получаемых от контроллеров представлений в браузер
     */
    class Renderator {

        /**
         *
         * @param {HTMLElement} renderNode
         */
        init(renderNode) {
            this.renderNode = renderNode;
        }

        /**
         *
         * @param {AbstractBlockController} Page
         * @param {{stateId: String, stateParams: Object}} state
         */
        render(Page, state) {
            var result = new Page(new AppRequestCtx(state.stateId, state.stateParams)).render();
            if (result !== null) {
                this.renderNode.innerHTML = result;
            }
        }
    }
    
    return new Renderator();
});