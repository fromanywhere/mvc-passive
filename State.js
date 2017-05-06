/*global define, require*/
define([
    'Renderator'
], function (
    /** Renderator */ Renderator
) {

    /**
     * Класс работы с состоянием приложения
     */
    class State {

        constructor() {
            this.prefix = 'st';
            this.currentState = window.location.hash;

            this.list = {
                MAIN_PAGE: 'MainPage',
                NEWS_PAGE: 'NewsPage',
                ERROR_PAGE: 'ErrorPage'
            }
        }

        /**
         * Разберает параметры строки запроса на пары «ключ-значение»
         * @param {Object} stateParams
         * @param {String} paramsStr
         * @returns {Object}
         */
        parseParams(stateParams, paramsStr) {
            var str = paramsStr.indexOf('#') !== -1
                ? paramsStr.slice(1)
                : paramsStr;

            var params = str.split('&');
            var result = stateParams;

            for (var paramId = 0; paramId < params.length; paramId++) {
                var param = params[paramId].split('=');
                if (param.length === 2) {
                    result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
                } else {
                    throw new Error('Некорректные параметры');
                }
            }

            return result;
        }

        /**
         * Проверяет, существует ли стейт с заданным именем
         * @param {String} stateName
         * @returns {boolean}
         */
        isStateExist(stateName) {
            for (var state in this.list) {
                if (this.list[state] === stateName) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Возвращает строку, полностью хранящую стейт и его параметры
         * @param {String} stateId
         * @param {Object} params
         * @returns {String}
         */
        getLinkOnState(stateId, params) {
            var url = '#' + this.prefix + '=' + stateId;
            if (params && Object.keys(params).length) {
                for (var paramId in params) {
                    url += '&' + encodeURIComponent(paramId) + '=' + encodeURIComponent(params[paramId]);
                }
            }
            return url;
        }

        /**
         * Возвращает текущий стейт
         * @returns {{stateId: String, stateParams: Object}}
         */
        getCurrentState() {
            var stateId = this.list.MAIN_PAGE;
            var stateParams = {
                method: 'GET'
            };

            if (this.currentState) {
                stateId = this.list.ERROR_PAGE;

                try {
                    stateParams = this.parseParams(stateParams, this.currentState);
                    var state = stateParams[this.prefix];
                    if (this.isStateExist(state)) {
                        stateId = state;
                    } else {
                        stateParams.error = 'Состояние не существует: ' + state;
                    }
                } catch (e) {
                    return {
                        stateId: this.list.ERROR_PAGE,
                        stateParams: {
                            error: 'Ошибка разбора параметров',
                            trace: e.stack
                        }
                    }
                }
            }

            return {
                stateId: stateId,
                stateParams: stateParams
            };
        }

        /**
         * Восстанавливает стейт с заданными параметрами и при необходимости делает редирект
         * @param {String} stateId
         * @param {Object} stateParams
         * @param {Boolean} [changeUrl]
         */
        setState(stateId, stateParams, changeUrl) {
            this.currentState = this.getLinkOnState(stateId, stateParams);
            if (changeUrl) {
                window.location.hash = this.currentState;
            }
        }

        /**
         * Устанавливает текущий стейт
         * @param {String} url
         */
        setUrlState(url) {
            this.currentState = url;
        }

        /**
         * Отрисовывает стейт с заданными параметрами без перехода на другую страницу
         * @param {String} stateId
         * @param {Object} stateParams
         */
        renderState(stateId, stateParams) {
            this.setState(stateId, stateParams);
            this.renderCurrentState();
        }

        /**
         * Отрисовывает текущий стейт
         */
        renderCurrentState() {
            var state = this.getCurrentState();
            var that = this;

            require(['pages/' + state.stateId + '/' + state.stateId], function (Page) {
                try {
                    Renderator.render(Page, state);
                } catch (e) {
                    that.renderState(that.list.ERROR_PAGE, {
                        error: "Ошибка рендеринга",
                        trace: e.stack
                    });
                }
            });
        }
    }

    return new State();
});