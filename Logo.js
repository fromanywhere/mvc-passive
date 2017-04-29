define([
    'AbstractBlockController',
    'State',
    'View'
], function (
    /** AbstractBlockController */ AbstractBlockController,
    /** State */ State,
    /** View */ View
) {
    class Logo extends AbstractBlockController {

        getView(templateId) {
            return new View(templateId, {
                isMainState: this.ctx.getStateId() === State.list.MAIN_PAGE,
                logoLink: State.getLinkOnState(State.list.MAIN_PAGE)
            })
        }
    }
    return Logo;
});