define(function () {

    /**
     * Модель, хранящая данные, а также методы работы с ними (чтение / создание)
     */
    class Model {

        constructor() {
            this.data = {
                news: []
            };

            let xhr = new XMLHttpRequest();
            let url = "/model.json";

            xhr.open("GET", url, true);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    this.data = JSON.parse(xhr.responseText);
                }
            };
            xhr.send();
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