import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import { BsTrash  } from 'react-icons/bs';

const sizeValueforIcon = 10 *3;

const IconButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const ParticipantsList = styled.ul`
    display: flex;
    flex-direction: column;
`;

const ParticipantsListItem = styled.li`
    align-items: center;
    border: solid 1px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
`;

const Table = styled.table`
    width: 100%;  
    padding: 8px;
`;

const TableName = styled.h1`
    text-align: center;
    padding: 14px;
`;

const ParticipantInfo = styled.span`
    color: black;
    font-size: 20px;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;



export const Participants = () => {
    const [participants, setParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/participants?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setParticipants(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleParticipantAdd = () => {
        fetch(`${process.env.REACT_APP_API_URL}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                telephone,
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                setParticipants(data);
                setName('');
                setSurname('');
                setEmail('');
                setTelephone('');
            }
        });
    }

    const handleDeleteParticipant = (id) => {
        if (window.confirm('Do you really want to delete this participant?')) {
            fetch(`${process.env.REACT_APP_API_URL}/participants/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                setParticipants(data);
            });
        }
    }


    return (
        <ParticipantsList>
            <Form onSubmit={handleParticipantAdd}>
                <Input 
                    placeholder="Vardas" 
                    required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <Input 
                    placeholder="Pavardė" 
                    required 
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />

                <Input 
                    placeholder="El. paštas" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <Input 
                    placeholder="Telefono nr." 
                    type="number" 
                    required 
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephone}
                />

                <Button>Pridėti dalyvį</Button>
            </Form>

            <TableName>Dalyvių sąrašas</TableName>
            
            <Table>
                <tr>
                        <th>Vardas</th>
                        <th>Pavardė</th>
                        <th>El. paštas</th>
                        <th>Telelefono numeris</th>
                        <th></th>
                </tr>
            </Table>


            {participants.map((exp) => (
                <ParticipantsListItem>
                    <ParticipantInfo>{exp.name}</ParticipantInfo>
                    <ParticipantInfo>{exp.surname}</ParticipantInfo>
                    <ParticipantInfo>{exp.email}</ParticipantInfo>
                    <ParticipantInfo>{exp.telephone}</ParticipantInfo>
                    
                    <IconButton  key={exp.id} onClick={() => handleDeleteParticipant(exp.id)}>
                    <BsTrash size={sizeValueforIcon} />
                    </IconButton>

                </ParticipantsListItem>
            ))}


        </ParticipantsList>
    );
}