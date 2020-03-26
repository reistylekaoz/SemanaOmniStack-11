import React, {useEffect, useState} from 'react';

import logoImg from '../../assets/logo.svg';

import {Link, useHistory} from 'react-router-dom';

import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() =>{
            api.get('profile', {
                headers:{
                    Authorization: ongId,
                }
            }).then(response => {
                    setIncidents(response.data);
            })
    },[ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,
            {
                headers:{
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
            
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                        Cadastrar novo caso
                </Link>

                <button 
                onClick={handleLogout}
                type="button">
                    <FiPower size={18} color="#E02045"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                
                    {incidents.map(incidents => (
                       <li key={incidents.id}>
                            <strong>Caso</strong>
                            <p>{incidents.title}</p>
                            <strong>Descrição</strong>
                            <p>{incidents.description}</p>
                            <strong>Valor</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
                            <button 
                            onClick={()=> handleDeleteIncident(incidents.id)}
                            type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                       </li>
                        
                    ))}

                        
    
               

                

            </ul>
        </div>
    )
} 