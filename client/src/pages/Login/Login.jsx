import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { HeaderSlog } from "../../components/HeaderSlogan/HeaderSlogan";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";
import PageImgSrc from '../../images/pageimg.jpg';

const PageImg = styled.div`
    background-image: url(${PageImgSrc});
    background-size: cover;
`;

const LoginContainer = styled.div`
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

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Incorrect username or password');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            const { id, email, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, email });
            setIsLoading(false);
            setError('');
            navigate('/');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <PageImg>
            <HeaderSlog />
            <LoginContainer>
                <FormStyled onSubmit={handleLogin} disabled={isLoading} column>
                    <FormStyledHeader>Prisijungti</FormStyledHeader>
                    <Input 
                        placeholder="El. paštas" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input 
                        placeholder="Slaptažodis" 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button>Prisijungti</Button>
                    <LinkStyled to="/register">Registruotis</LinkStyled>
                </FormStyled>
            </LoginContainer>   
        </PageImg>
    );
}