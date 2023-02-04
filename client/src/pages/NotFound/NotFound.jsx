import { Link } from 'react-router-dom';
import styled from 'styled-components';
import notFoundImageSrc from '../../images/pagenotfoundimg.jpg'

const NotFoundStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    margin: 0px;
`;

const PageNotFoundHeader = styled.h1`
    font-size: 10vh;
`;

const PageNotFoundLink = styled(Link)`
    color: black;
    font-size: 5vh;
    text-decoration: none;
`;
const PageNotFoundImage = styled.img`
    border-radius: 5%;
    height: 40vh;
    margin: 0px;
    padding: 0px;
    width: 150vh;
`;

export const NotFound = () => {
    return (
        <NotFoundStyled>
                <PageNotFoundImage src={notFoundImageSrc} />
                <PageNotFoundHeader>Page not found...</PageNotFoundHeader>
                <PageNotFoundLink to="/">Atsiprašome. Eikite į pradinį puslapį.</PageNotFoundLink>




        </NotFoundStyled>
    );
}