define(function () {

    /**
     * Модель, хранящая данные, а также методы работы с ними (чтение / создание)
     */
    class Model {

        constructor() {
            this.data = {
                news: [
                    {
                        id: 0,
                        title: "Заголовок первой новости",
                        rating: 3
                    },
                    {
                        id: 1,
                        title: "Заголовок второй новости",
                        rating: 1
                    },
                    {
                        id: 2,
                        title: "Заголовок третьей новости",
                        rating: 2
                    }
                ]
            }
        }

        getNews() {
            // Тут данные — объект. Если вернуть сразу this.data.news, вернутся не просто данные, а ссылка на объект.
            // Тогда изменения в возвращенной структуре будут автоматически отражаться и на оригинальной модели, что неправильно.
            // Поэтому возвращается копия оригинальной модели
            return this.data.news.slice();
        }

        /**
         *
         * @param {String} title
         * @param {Number} rating
         */
        createNews(title, rating) {
            this.data.news.push({
                id: this.data.news.length,
                title: title,
                rating: rating
            });
        }
    }

    return new Model();
});