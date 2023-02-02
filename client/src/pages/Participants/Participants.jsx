import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';

const ParticipantsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;

const HoverOverlayContent = styled.div`
    color: red;
    font-size: 16px;
`;

const ParticipantsListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
    ${HoverOverlay} {
        visibility: hidden;
    }
    &:hover {
        ${HoverOverlay} {
            visibility: visible;
        }
    }
`;

const ParticipantName = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const ParticipantEmail = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
`;
const ParticipantSurname = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
`;
const ParticipantTelephone = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
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
            {participants.map((exp) => (
                <ParticipantsListItem key={exp.id} onClick={() => handleDeleteParticipant(exp.id)}>
                    <HoverOverlay>
                        <HoverOverlayContent>IŠTRINTI</HoverOverlayContent>
                    </HoverOverlay>
                    <ParticipantName>{exp.name}</ParticipantName>
                    <ParticipantSurname>{exp.surname}</ParticipantSurname>
                    <ParticipantEmail>{exp.email}</ParticipantEmail>
                    <ParticipantTelephone>{exp.telephone}</ParticipantTelephone>
                </ParticipantsListItem>
            ))}
        </ParticipantsList>
    );
}