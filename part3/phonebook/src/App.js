import { useEffect, useState } from 'react';
import Filter from './component/Filter';
import PersonForm from './component/PersonForm';
import Persons from './component/Persons';
import personService from './service/person';
import Notification from './component/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ content: '', type: '' });

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const checkedPerson = persons.find(
      person => person.name.toLowerCase() === newPerson.name.toLowerCase(),
    );

    if (checkedPerson && checkedPerson.number === newNumber) {
      alert(newPerson);
    }

    if (checkedPerson && checkedPerson.number !== newNumber) {
      if (
        window.confirm(
          `Are you sure you want update ${checkedPerson.name}'s number with a new one?`,
        )
      ) {
        personService
          .update(checkedPerson.id, newPerson)
          .then(returnedPerson =>
            setPersons(
              persons.map(person => (person.id !== checkedPerson.id ? person : returnedPerson)),
            ),
          )
          .catch(error => {
            let message = 'There was an error';
            if (error.response) {
              message = error.response.data.error;
            }
            setMessage({
              content: `${message}`,
              type: 'error',
            });
          });
      }
    }
    if (!checkedPerson) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage({
            content: `Added ${returnedPerson.name}`,
            type: 'success',
          });
        })
        .catch(error => {
          console.log(error.response.data);

          setMessage({
            content: `${error.response.data}`,
            type: 'error',
          });
        });
    }

    setNewNumber('');
    setNewName('');
  };

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const deletePerson = id => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteById(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: 'error',
          });
          setTimeout(() => {
            setMessage({
              content: '',
              type: '',
            });
          }, 3000);
        });
    }
  };

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onFliterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        onNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        onNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
