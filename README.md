# Foodies Frontend

Foodies Frontend — це клієнтська частина веб-додатку Foodies, створеного з використанням React та Vite. Додаток дозволяє користувачам знаходити, додавати та ділитися рецептами, переглядати інгредієнти, фоловити інших користувачів і багато іншого.

## Посилання

- **Бекенд**: [Foodies Backend](https://foodies-backend-yutr.onrender.com)
- **Фронтенд**: [Foodies Frontend](https://foodies-frontend-bice.vercel.app/)
- **Swagger документація API**: [Swagger Docs](https://foodies-frontend-bice.vercel.app/api-docs/)
- **Макет**: [Figma](https://www.figma.com/file/TKl7kDNvwtz62RsuWNnQ5E/Foodies?type=design&node-id=127-2517&mode=design&t=UejayJaJevVrIG5E-0)

## Як запустити локально

1. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/your-username/foodies-frontend.git
   cd foodies-frontend
   ```
2. Встановіть залежності:
   ```bash
   npm install
   ```
3. Запустіть дев-сервер:
   ```bash
   npm run dev
   ```

## Скрипти

- **Запуск локального сервера**:
  ```bash
  npm run dev
  ```
- **Збірка для продакшну**:
  ```bash
  npm run build
  ```

## Деплой

Проєкт задеплоєно на Vercel. Для налаштування деплою перегляньте [документацію Vercel](https://vercel.com/docs).

## Структура проєкту

```
foodies-frontend/
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── README-deploy.md
├── vercel.json
├── vite.config.js
├── public/
│   └── icons/, favicon.svg, demo.html ...
├── src/
│   ├── App.jsx, main.jsx, index.css
│   ├── api/            // робота з API
│   ├── assets/         // зображення, стилі, шрифти
│   ├── components/     // повторно використовувані UI-компоненти
│   ├── constants/      // константи
│   ├── hoc/            // HOC-компоненти
│   ├── hooks/          // кастомні хуки
│   ├── pages/          // сторінки додатку
│   ├── redux/          // стан додатку (Redux Toolkit)
│   └── tools/          // утиліти та хелпери
```

## Технології

- **React + Vite**
- **Redux Toolkit**
- **Axios**
- **React Router**
- **SCSS / CSS Modules**
- **Docker** (для продакшн-зборки)
- **Vercel** (деплой)
