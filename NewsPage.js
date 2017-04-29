define([
    'AbstractBlockController',
    'State',
    'Logo',
    'Model',
    'View'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** Logo */ Logo,
    /** Model */ Model,
    /** View */ View 
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

        getView(templateId) {
            return new View(templateId, {
                logo: new Logo(this.ctx).render(),
                title: Model.getNews()[this.ctx.getStateParams().id].title
            });
        }
    }

    return NewsPage;
});