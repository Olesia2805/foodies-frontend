# Foodies Frontend

This is the frontend for the Foodies application, built with React and Vite.

## Links

- **Backend**: [Foodies Backend](https://foodies-backend-yutr.onrender.com)
- **Frontend**: [Foodies Frontend](https://foodies-frontend-bice.vercel.app/)
- **API Documentation (Swagger)**: [Swagger Docs](https://foodies-frontend-bice.vercel.app/api-docs/)

## Getting Started

To run the project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Build

To create a production build:

```bash
npm run build
```

## Deployment

This project is deployed on Vercel. For more details, check the [Vercel Documentation](https://vercel.com/docs).

## Project Structure

The project has the following structure:

```
foodies-frontend/
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README-deploy.md
├── README.md
├── vercel.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── demo.html
│       ├── style.css
│       ├── symbol-defs.svg
│       └── demo-files/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── api/
│   │   ├── areasAPI.js
│   │   ├── axiosInstance.js
│   │   └── ingredientsAPI.js
│   │   └── recipeAPI.js
│   ├── assets/
│   │   ├── fonts/
│   │   ├── img/
│   │   └── styles/
│   ├── components/
│   │   ├── AddRecipeForm/
│   │   ├── AuthBar/
│   │   ├── Breadcrumbs/
│   │   ├── Button/
│   │   ├── Categories/
│   │   ├── CategoryList/
│   │   ├── Container/
│   │   ├── Divider/
│   │   ├── Dropdown/
│   │   ├── Error/
│   │   ├── FollowButton/
│   │   ├── FollowerCard/
│   │   ├── Footer/
│   │   ├── formComponents/
│   │   ├── FormInputs/
│   │   ├── Header/
│   │   ├── Hero/
│   │   └── ...
│   ├── constants/
│   │   └── ...
│   ├── hoc/
│   │   └── ...
│   ├── hooks/
│   ├── pages/
│   ├── redux/
│   └── tools/
```
