import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Logo from '../src/Components/Logo';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';
import API from '../src/Services/api';

const Index = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('/api/get-students', fetcher);

  const router = useRouter();
  const [matricula, setMatricula] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleMatricula = (event) => {
    setMatricula(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const form = {
      student: matricula,
      password,
    };

    const result = data
      .filter((objeto) => objeto.matricula === matricula && objeto.dtNascimento === password)
      .map((items) => (
        <p key={items.matricula}>
          {setName(items.name)}
          {setMatricula(items.matricula)}
        </p>
      ));

    if (result) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setName('');
      setMatricula('');
    }

 
  };

  return (

    <div className="text-center">

      <h2>Atendimentos</h2>
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        >
          <Logo width={100} height={100} />
          <Input
            name="matricula"
            onChange={(event) => { setMatricula(event.target.value); }}
            placeholder="Nº de matrícula"
            value={matricula}
          />

          <Input
            name="nascimento"
            onChange={(event) => { setPassword(event.target.value); }}
            placeholder="Data de nascimento"
            value={password}
          />
          <Button type="submit" disabled={matricula.length === 0}>
            Quero votar!
          </Button>
        </form>
      </div>
      {success === true && <h2>{ name }</h2> }
    </div>

  );
};

export default Index;
