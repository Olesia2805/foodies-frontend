import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Dropdown from './components/Dropdown/Dropdown';
import Testimonial from './components/Testimonial/Testimonial';
import ProductCard from './components/ProductCard/ProductCard';
import eyeIcon from './assets/Icons/eye.svg';
import eyeOffIcon from './assets/Icons/eye-off.svg';
import chevronDownIcon from './assets/Icons/chevron-down.svg';
import quoteIcon from './assets/Icons/quoteIcon.svg';

function App() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const categoryOptions = [
    { value: 'seafood', label: 'Seafood' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'italian', label: 'Italian' },
  ];

  const testimonialData = [
    {
      quote:
        'Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!',
      author: 'Larry Pageim',
    },
    {
      quote:
        'The vegetarian lasagna recipe was amazing! So flavorful and easy to make. My whole family loved it, even the meat lovers!',
      author: 'Sarah Johnson',
    },
    {
      quote:
        'I never thought I could make such delicious bread at home. Your sourdough recipe and tips made it possible. Thank you!',
      author: 'Michael Chen',
    },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          marginTop: '20px',
          width: '100%',
          maxWidth: '1200px',
          margin: '20px auto',
          padding: '0 20px',
        }}
      >
        <div>
          <h2>Button Examples</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <Button text="Sign In" variant="secondary" width={400} />
            <Button text="Sign In" variant="primary" width={400} />
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Button text="Publish" variant="primary" width={200} />
              <Button text="Add Recipe" variant="outline" width={200} />
              <Button text="Add Recipe" variant="primary" width={200} />
            </div>
          </div>
        </div>

        <div>
          <h2>Input Examples</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required={true}
            />

            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required={true}
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              icon={
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt="toggle password visibility"
                  width="24"
                  height="24"
                />
              }
              onIconClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div>
          <h2>Dropdown Examples</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <Dropdown
              placeholder="Select a category"
              options={categoryOptions}
              value={formData.category}
              onChange={value => {
                setFormData(prev => ({
                  ...prev,
                  category: value,
                }));
              }}
              iconSrc={chevronDownIcon}
            />

            <Dropdown
              placeholder="Select a category"
              options={categoryOptions}
              value="vegetarian"
              onChange={() => {}}
              iconSrc={chevronDownIcon}
            />

            <Dropdown
              placeholder="Select a category"
              options={categoryOptions}
              value="seafood"
              onChange={() => {}}
              iconSrc={chevronDownIcon}
            />
          </div>
        </div>

        <div>
          <h2>Testimonial Example</h2>
          <Testimonial
            testimonials={testimonialData}
            quoteIconSrc={quoteIcon}
          />
        </div>

        <div>
          <h2>Product Card Examples</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            <ProductCard
              recipeTitle="BAKEWELL TART"
              image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
              title="Bakewell tart with almonds and powdered sugar"
              onAddToCart={() => alert('More info!')}
              onToggleFavorite={isFavorite =>
                console.log('Favorite status:', isFavorite)
              }
            />
            <ProductCard
              recipeTitle="FRESH SALAD"
              image="https://images.unsplash.com/photo-1565958011703-44f9829ba187"
              title="Fresh vegetable salad with feta cheese"
              onAddToCart={() => alert('More info!')}
              onToggleFavorite={isFavorite =>
                console.log('Favorite status:', isFavorite)
              }
            />
            <ProductCard
              recipeTitle="CHOCOLATE CAKE"
              image="https://images.unsplash.com/photo-1551879400-111a9087cd86"
              title="Homemade chocolate cake with berries"
              onAddToCart={() => alert('More info!')}
              onToggleFavorite={isFavorite =>
                console.log('Favorite status:', isFavorite)
              }
            />
          </div>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
