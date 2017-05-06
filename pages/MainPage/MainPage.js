/*global define*/
define([
    'AbstractBlockController',
    'ViewCtx',
    'State',
    'blocks/Logo/Logo',
    'Model',
    'View',
    'dot-loader!./MainPage.html'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** ViewCtx */ ViewCtx,
    /** State */ State,
    /** Logo */ Logo,
    /** Model */ Model,
    /** View */ View,
    template
) {
    class MainPage extends AbstractBlockController {

        getView() {
            return new View(template, this.ctx.getTemplateParams());
        }

        getViewCtx(ctx) {
            return new MainPageCtx(ctx);
        }

        handleRequest(ctx) {
            var title = ctx.getParam('new');
            var isPost = ctx.getParam('method') === 'POST';

            if (title && isPost) {
                Model.createNews(title, 0);
            }

            return true;
        }
    }

    class MainPageCtx extends ViewCtx {

        // Отсортируем по рейтингу, чтобы показать предобработку данных модели
        sortNewsList() {
            return Model.getNews().sort((a, b) => {
                return b.rating - a.rating;
            });
        }

        getTemplateParams() {
            return {
                logo: new Logo(this).render(),
                newsList: this.sortNewsList(),
                getNewsPageLink: (id) => {
                    return State.getLinkOnState(State.list.NEWS_PAGE, {
                        id: id
                    });
                }
            }
        }
    }

    return MainPage;
});