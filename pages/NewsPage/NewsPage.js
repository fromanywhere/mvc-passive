/*global define*/
define([
    'AbstractBlockController',
    'State',
    'blocks/Logo/Logo',
    'Model',
    'View',
    'dot-loader!./NewsPage.html'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** Logo */ Logo,
    /** Model */ Model,
    /** View */ View,
    template
) {
    class NewsPage extends AbstractBlockController {

        handleRequest(ctx) {
            var requestedNews = Model.getNews()[ctx.getParam('id')];

            if (!requestedNews) {
                State.renderState(State.list.ERROR_PAGE, {
                    error: "Некорректные параметры новости"
                });
                return false;
            }

            return true;
        }

        getView() {
            return new View(template, {
                logo: new Logo(this.ctx).render(),
                title: Model.getNews()[this.ctx.getStateParams().id].title
            });
        }
    }

    return NewsPage;
});