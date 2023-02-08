import { useContext } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { FaHome  } from 'react-icons/fa';
import LogoSrc from '../../images/logo.png';


const sizeValueforIcon = 12 * 4;

const LinkStyled = styled(Link)`
    color: black;
`;

const Logo = styled.img`
    width: 8vh;
`;

const IconSpan = styled.span`
    padding: 20px;
`;

const TwoElementDiv = styled.div`
    display: flex;
`;

const Header = styled.div`
    padding: 10px 40px;
    display: flex;
    height: 70px;
    justify-content: space-between;
`;

export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    if (!user) {
        return <Navigate to="/home" />
    }

    const handleLogOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/home');
    }

    return (
        <div>
            <Header>
                <div>
                <Logo src={LogoSrc}/>
                </div>
                <TwoElementDiv>
                    <div>
                        <IconSpan>
                            <LinkStyled to="/home">
                                <FaHome size={sizeValueforIcon} />
                            </LinkStyled>
                        </IconSpan>
                    </div>
                    <div>
                        <Button onClick={handleLogOut} >Atsijungti</Button>
                    </div>
                </TwoElementDiv>
            </Header>
            <Outlet />
        </div>
    )
};