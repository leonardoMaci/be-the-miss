import React, { useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import heroImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon() {

    const [id,setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const reponse = await api.post('sessions', {id});

            localStorage.setItem('ongID',id);
            localStorage.setItem('ongName',reponse.data.name);

            history.push('/profile');
        }catch(err){
            alert('Erro ao efetuar login tente novamente.');
        }
    };

    return (
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setID(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02141"/>
                        Não tenho cadastro
                    </Link>
                </form>
           </section>
           <img src={heroImg} alt="Heroes"/>
       </div>
    );
};