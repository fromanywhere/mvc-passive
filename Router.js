/*global define*/
define([
    'AbstractController',
    'State'
], function (
    /** AbstractController */ AbstractController,
    /** State */ State
) {

    /**
     * Контроллер приложения
     * Обрабатывает запросы от пользователя, на основе них переходит в нужное состояние
     * На основе полученного состояния и его параметров отрисовывает результат
     */
    class Router extends AbstractController {

        init() {
            window.addEventListener('hashchange', this.handleRequest.bind(this));
            document.addEventListener('submit', this.handleRequest.bind(this));
            this.render();
        }

        /**
         *
         * @param {Event} e
         */
        formSubmit(e) {
            e.preventDefault();
            var form = e.target;
            var target = form.getAttribute('target') || State.getCurrentState().stateId;
            var method = form.getAttribute('method') || 'GET';
            var formData = new FormData(form);
            var params = {
                method: method
            };

            for (var value of formData.entries()) {
                params[value[0]] = value[1];
            }

            State.setState(target, params, method.toUpperCase() === 'GET');
            if (method.toUpperCase() !== 'GET') {
                this.render();
            }
        }

        /**
         * Роутер обрабатывает события изменения строки запроса и отправки форм
         * @param e
         */
        handleRequest(e) {
            e.preventDefault();

            switch (e.type) {
                case 'hashchange':
                    State.setUrlState(window.location.hash);
                    this.render();
                    break;
                case 'submit':
                    this.formSubmit(e);
                    break;
            }
        }

        /**
         * Роутер «возвращает» результат рендера стейта, возникнувшего по итогу обработки запроса
         */
        render() {
            State.renderCurrentState();
        }
    }

    return new Router();
});