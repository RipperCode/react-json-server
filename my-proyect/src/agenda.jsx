import { useState, useEffect } from 'react';
import axios from 'axios';

const Filtro = ({ handle }) => {
  return (
    <>
      <h2>Filter</h2>
      <div>
        filter shown with: <input onChange={handle} type="text" name="filtro" />
      </div>
    </>
  );
};

const Form = ({ handleInput, handleClick, newName, newPhone }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInput} name="nombre" value={newName} />
        </div>
        <div>
          number:{' '}
          <input onChange={handleInput} name="telefono" value={newPhone} />
        </div>
        <div>
          <button onClick={handleClick} type="submit">
            add
          </button>
        </div>
      </form>
    </>
  );
};

const Lista = ({ persons, filter }) => {
  if (
    persons.some((object) => object.name.toLowerCase() === filter.toLowerCase())
  ) {
    const filterPerson = persons.filter(
      (object) => object.name.toLowerCase() === filter.toLowerCase()
    );
    return (
      <>
        <h2>Numbers</h2>
        <li>
          {filterPerson[0].name}: {filterPerson[0].number}
        </li>
      </>
    );
  } else {
    return (
      <>
        <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name}: {person.number}
            </li>
          ))}
        </ul>
      </>
    );
  }
};

const Agenda = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://stackblitzstartersarxpsd-24aw--3000--a2aabdd9.local-credentialless.webcontainer.io/persons'
      )
      .then((res) => {
        
        setPersons(res.data);
      });
  }, []);

  const handleChangeInput = (e) => {
    if (e.target.name === 'nombre') setNewName(e.target.value);
    if (e.target.name === 'telefono') setNewPhone(e.target.value);
    if (e.target.name === 'filtro') setFilter(e.target.value);
  };

  const handleClickButon = (e) => {
    e.preventDefault();
    if (newName === '') return alert('El campo name esta vacio');
    if (newPhone === '') return alert('El campo phone esta vacio');

    if (persons.some((object) => object.name === newName)) {
      alert(`${newName} esta en la guia telefonica`);
      setNewName('');
      setNewPhone('');
    } else {
      const newPerson = {
        name: newName,
        number: newPhone,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewPhone('');
    }
  };

  return (
    <div>
      <Filtro handle={handleChangeInput} />
      <Form
        handleInput={handleChangeInput}
        handleClick={handleClickButon}
        newName={newName}
        newPhone={newPhone}
      />
      <Lista persons={persons} filter={filter} />
    </div>
  );
};

export default Agenda;
