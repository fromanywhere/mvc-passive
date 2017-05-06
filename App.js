/*global define*/
define([
    'Renderator',
    'Router'
], function (
    /** Renderator */ Renderator,
    /** Router */ Router
) {
    /*
    Нужно рендерить приложение так, чтобы не затереть шаблоны.
    Поэтому под рендер выделяется отдельный контейнер.
    После конфигурации контейнера для рендера имеем право проинициализировать роутер
     */
    Renderator.init(document.getElementById('App'));
    Router.init();
});