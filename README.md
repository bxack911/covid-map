# sprava-docker
Карта поширення коронавірусу в світі
=====================

Тестове оточення
-----------------------------------
Для розвертання проекту використовується звичайний стек технологій для web проектів:
* apache
* php 7.4
* mysql 8
* phpmyadmin

Технології
-----------------------------------
Проект працює на базі фраємворку laravel, версії 7.x

Фраємворк для фронтенду - vue.js та препроцессор sass були відключені, так як проект не потребує вирішення складних задач на стороні клієнта, тому ці технології будуть тяжким носієм для проекту.

Початок роботи
-----------------------------------
При розвертуванні на звичайному сервері, хостингу або локалці використовуючи lamp/mamp/wamp:
* запакуйте директорію html, без всьго іншого;
* Закиньте на сервер в директорію public_html/private_html/html або іншу. в залежності від налаштуванб вашого середовища;
* Розпакуйте архів
* composer clear-cache
* composer install
* Додайте налаштування до БД в файлі .env
* Запустіть команду php artisan migrate

//Поки підключення до БД є необов'язковим, бо БД не використовується, але в майбетньому там буде зберігатися вся інформація, яка буде тягнутись cron опівноіч кожного дня

При розвертуванні в контейнері docker:
//Має бути встановлений docker та docker-compose(якщо працюєте на windows, docker-compose встановлюється автоматично). Для встановлення на windows обов'язково має бути windows pro та ввімкнений hyper-V

* В даній директорії(в якій знаходится це readme) запустіть команду docker-compose up --build (якщо є помилки, то спройте використати префікс sudo)
* Дочекайтесь поки завантажаться потрібні файли з docker hub
* Термінал повинен працювати та не роз'єднувати роботу з контейнерами(в цій же консолі можна перелядати всі логи)
* Відкриваємо новий термінал та вводимо docker ps. Не закриваємо термінал
* Вводимо docker exec -it [ID контейнеру в якому знаходиться apache без квадратних дужок] /bin/bash
* php artisan migrate
* exit
* cd [шлях до цього readme]/html
* sudo chmod -R 777 storage
* composer clear-cache
* composer install
* запускаємо в браузері http://127.0.0.1:8081/

Для виходу з тестового середовища в терміналі використовуємо комбінацію клавіш CTRL+C

При всіх наступних запусках в дирокторії, в якій знаходиться це readme виконуємо docker-compose up --build

Для переносу або push-у до гіт потрібно змінити власника файлів. які створював ізольований контейнер docker:

* З директорії, в якій знаходиться це readme whoami
* sudo chown -R [ім'я, що видала команда whoami]:[ім'я, що видала команда whoami] docker
* sudo chown -R [ім'я, що видала команда whoami]:[ім'я, що видала команда whoami] html