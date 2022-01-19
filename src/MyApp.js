import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
    const [characters, setCharacters] = useState([]);  

    useEffect(() => {
      fetchAll().then( result => {
        console.log(result.status); 
        if (result)
            setCharacters(result);
       });
   }, [] );

function removeOneCharacter (index) {
  const updated = characters.filter((character, i) => {
      return i !== index
    });
    console.log("updated id: " + characters[index].id);
    deleteByID(characters[index].id).then( result => {
      //console.log(result.status); 
      //if (result)
          //setCharacters(result);
     });
    setCharacters(updated);
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )


  function updateList(person) {
    
    post(person.name, person.job).then( updatedPerson => {
  
      setCharacters([...characters, {
        "id": updatedPerson.id,
        "job": updatedPerson.job,
        "name": updatedPerson.name
      }]);
  });


  }
  
}


async function post(newName, newJob){
  try {
    
     const response = await axios.post('http://localhost:5000/users', {
      name: newName,
      job: newJob,
      id: "",
    });
     if (response.status == 201) {
       console.log("posted statuss: " + response.data.user.id);
       return response.data.user;
     } else 
     {
      console.log("not posted status: " + response.status);
      return response.body.user;
     }     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}


async function deleteByID(id){
  try {
     const response = await axios.delete('http://localhost:5000/users' + '/' + id);
     if (response.status == 200) {
       console.log("deleted status: " + response.status);
       //return response.data.users_list;
     } else 
     {
      console.log("not deleted status: " + response.status);
      //return response.data.users_list;
     }     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}


async function fetchAll(){
  try {
     const response = await axios.get('http://localhost:5000/users');
     if (response.status == 201) {
       console.log(response.status);
       return response.data.users_list;
     } else 
     {
      console.log(response.status);
      return response.data.users_list;
     }     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}

export default MyApp;