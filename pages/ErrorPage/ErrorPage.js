/*global define*/
define([
    'AbstractBlockController',
    'State',
    'View',
    'blocks/Logo/Logo',
    'dot-loader!./ErrorPage.html'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** View */ View,
    /** Logo */ Logo,
    template
) {
    class ErrorPage extends AbstractBlockController {

        getView() {
            return new View(template, {
                logo: new Logo(this.ctx).render(),
                error: this.ctx.getStateParams().error,
                trace: this.ctx.getStateParams().trace
            });
        }
    }

    return ErrorPage;
});