# Інструкція з налаштування CI/CD та деплою на Vercel

---

## Налаштування автоматичного деплою фронтенду на Vercel

1. **Створіть новий проект на Vercel:**
   - Перейдіть на [Vercel](https://vercel.com/).
   - Натисніть "New Project" і підключіть ваш репозиторій GitHub.
   - Виберіть папку `foodies-frontend` як кореневу директорію проекту.
   - Укажіть:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist` (або іншу, якщо вказано у `vite.config.js`).
   - Додайте необхідні змінні оточення (якщо потрібні).

2. **Створіть Vercel Token:**
   - У Vercel Dashboard перейдіть у "Account Settings" → "Tokens".
   - Створіть новий токен і скопіюйте його.

3. **Додайте Vercel Token у GitHub Secrets:**
   - Перейдіть у ваш репозиторій на GitHub.
   - Відкрийте "Settings" → "Secrets and variables" → "Actions".
   - Додайте секрет із назвою `VERCEL_TOKEN` і вставте ваш токен.

4. **Перевірте файл GitHub Actions:**
   - Файл `.github/workflows/deploy-frontend.yml` вже створено.
   - Він автоматично запускає деплой при коміті або мерджі у гілку `main`.

5. **Перевірте роботу CI/CD:**
   - Зробіть коміт у гілку `main`.
   - Перевірте вкладку "Actions" у вашому репозиторії на GitHub, щоб переконатися, що процес CI/CD виконується успішно.

---