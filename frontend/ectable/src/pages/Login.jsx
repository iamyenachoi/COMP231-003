import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {authLogin} from '../components/Auth/auth'


const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    async function handleSubmit(event) {
      event.preventDefault();
      await authLogin(email, password, navigate);
    }

    return (
      <>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
          <label htmlFor="password">Password: </label>  
          <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
          <button type="submit">Submit</button>
        </form>
      </>
    );

 };

export default Login;