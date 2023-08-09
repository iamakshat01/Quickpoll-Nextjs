import axios,{AxiosResponse} from 'axios';



// call this without token for logout
export const setToken = (token:string|null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('jwtToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// for calling the api 
// method -> get, put, post etc
// path -> routes after host as string
// data -> which you need to send in body
export const call = async (method:'get'|'patch'|'post'|'delete', path:string, data?:object) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};


// check authentication
export const isAuthenticated = () => {
    if (localStorage.jwtToken)
        return true
    else
      return false
}

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
}


export default { setToken, call, isAuthenticated, removeToken};