define([
    'AbstractBlockController',
    'State',
    'View',
    'dot-loader!./Logo.html'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** View */ View,
    template
) {
    class Logo extends AbstractBlockController {

        getView() {
            return new View(template, {
                isMainState: this.ctx.getStateId() === State.list.MAIN_PAGE,
                logoLink: State.getLinkOnState(State.list.MAIN_PAGE)
            })
        }
    }
    return Logo;
});