define(function () {

    /**
     * Абстрактный контроллер
     * Принимает какой-то запрос и как-то на него реагирует, отправляя обратно результат
     */
    class AbstractController {

        /**
         * Метод-заглушка для обработки запроса
         */
        handleRequest() {
            throw new Error('Необходимо реализовать HandleRequest');
        }

        /**
         * Метод-заглушка для рендера результата
         */
        render() {
            throw new Error('Необходимо реализовать Render');
        }
    }

    return AbstractController;
});