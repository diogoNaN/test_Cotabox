import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

import Doughnut from '../../components/doughnut';


const Home = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    participation: ''
  })
  const [users, setUsers] = useState([])
  
  const history = useHistory();

  useEffect(() => {
    api.get('/').then(response => setUsers(response.data.users));
  },[])

  function handleInputChange(event) {
    
    const { name, value } = event.target;

    if (name === 'participation') {
      if(value > 100) return
      return setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '')});
    };

    if(value.length > 16) return
    return setFormData({ ...formData, [name]: value.replace(/[^A-Za-z]/g, '') });
  
  };
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    const { firstName, lastName, participation } = formData;
    
    if(firstName === '' || lastName === '' || participation === '') {
      toast.warn('Preencha todos os campos');
      return

    }else if(firstName.length > 16 || lastName.length > 16) {
      toast.warn('FirstName e LastName: Tamanho máximo 16 caracteres');
      return

    } else if ( participation > 100 ) {
      toast.warn('Participation: Valor máximo 100 %');
      return

    } 

    await api.post('/', { firstName, lastName, participation })
    .then(response => {
      toast.success(response.data.message);
      setUsers(response.data.users)

    })
    .catch(error => {
      if( error.message && !error.response ) {
  
        toast.error("Problemas no Servidor")

      } else if (error.response.status >= 400 ) {
        toast.warn(error.response.data.message);

      } else {
        console.log(error);
      }
      
    });
    
    history.push('/');
  };

  return (
    <div id="page-home">

      <header>
        <ToastContainer />
          <form onSubmit={handleSubmit}>
  
            <fieldset>

              <div className="field">
                <label htmlFor="firstName"></label>
                <input 
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="field">
                <label htmlFor="lastName"></label>
                <input 
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label htmlFor="participation"></label>
                <input 
                  type="text"
                  name="participation"
                  id="participation"
                  placeholder="Participation"
                  value={formData.participation}
                  onChange={handleInputChange}
                />
              </div>

            </fieldset>

            <button type="submit">
              Send
            </button>

          </form>
        </header>

      <div className="content">
        <div className="info">
          <h1>Data</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className="data">          
          <table> 
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Participation</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map((user, index) => {
                    if(user.id !== null) {
                      return (
                        <tr key={user.id}>
                          <td>{index+1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.participation}</td>
                        </tr>
                      )
                    }
                    return null
                  }
                )
              }
            </tbody>
          </table>

          <Doughnut users={users}/>
        </div>
      </div>
    </div>
  )
}

export default Home;