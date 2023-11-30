import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('mluukkai')
  const [password, setPassword] = useState('secret')
  const navigate = useNavigate()

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }
  
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="sumbit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
