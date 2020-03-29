import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api'


export default function Profile() {
    const [incident,setIncident]= useState([]);
    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();    

    useEffect(()=> {
        api.get('profile',{
            headers:{
                authorization: ongId,
            }
        }).then(reponse =>{
            setIncident(reponse.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`,{
                headers:{
                    authorization: ongId,
                }
            });            
            setIncident(incident.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletas tente novamente mais tarde!');
        };        
        // api.delete('oasjdoi')
        // .then(reponse => {

        // }).catch(error => {

        // })
    };    

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    };

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={ () => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>              
                ))} 
            </ul>
        </div>
    );
}