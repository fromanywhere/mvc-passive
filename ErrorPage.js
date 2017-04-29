define([
    'AbstractBlockController',
    'State',
    'View',
    'Logo'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** View */ View,
    /** Logo */ Logo,
) {
    class ErrorPage extends AbstractBlockController {

        getView(templateId) {
            return new View(templateId, {
                logo: new Logo(this.ctx).render(),
                error: this.ctx.getStateParams().error,
                trace: this.ctx.getStateParams().trace
            });
        }
    }

    return ErrorPage;
});