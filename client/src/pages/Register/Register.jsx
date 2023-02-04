import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { HeaderSlog } from "../../components/HeaderSlogan/HeaderSlogan";
import { Input } from "../../components/Input/Input";
import PageImgSrc from '../../images/pageimg.jpg';

const PageImg = styled.div`
    background-image: url(${PageImgSrc});
    background-size: cover;
`;

const RegisterContainer = styled.div`
    align-items: center;
    align-items: baseline;
    display: flex;
    justify-content: center;
    height: 100vh;
    padding: 1vh;
`;

const LinkStyled = styled(Link)`
    align-self: center;
    color: black;
    text-decoration: none;
`;
const FormStyledHeader = styled.h1`
    text-align: center
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
    opacity: 0.8;
`;

const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = () => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, surname, password })
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    };

    return (
        <PageImg>
            <HeaderSlog/>
            <RegisterContainer>
                <FormStyled onSubmit={handleRegister} disabled={isLoading} column>
                    <FormStyledHeader>Registruotis</FormStyledHeader>

                    <Input 
                        placeholder="El.paštas" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <Input 
                        placeholder="Vardas" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Input 
                    placeholder="Pavardė" 
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />

                    <Input 
                        placeholder="Slaptažodis" 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button>Registruotis</Button>
                    <LinkStyled to="/login">Prisijungti</LinkStyled>
                </FormStyled>
            </RegisterContainer>
        </PageImg>
    );
}