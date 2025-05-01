import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import eyeIcon from './assets/Icons/eye.svg';
import eyeOffIcon from './assets/Icons/eye-off.svg';

function App() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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
          gap: '20px',
          marginTop: '20px',
          maxWidth: '400px',
          margin: '20px auto',
        }}
      >
        <h2>Button Examples</h2>
        <Button text="Sign In" variant="secondary" width={400} />
        <Button text="Sign In" variant="primary" width={400} />
        <Button text="Publish" variant="primary" width={200} />
        <Button text="Add Recipe" variant="outline" width={200} />
        <Button text="Add Recipe" variant="primary" width={200} />

        <h2 style={{ marginTop: '40px' }}>Input Examples</h2>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required={true}
          style={{ marginBottom: '20px' }}
        />

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required={true}
          style={{ marginBottom: '20px' }}
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
          style={{ marginBottom: '20px' }}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
