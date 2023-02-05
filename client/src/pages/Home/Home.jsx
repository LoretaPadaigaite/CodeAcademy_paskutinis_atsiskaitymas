import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderSlog } from '../../components/HeaderSlogan/HeaderSlogan';
import PageImgSrc from '../../images/pageimg.jpg';

const PageImg = styled.div`
    background-image: url(${PageImgSrc});
    height: 100vh;
    background-size: cover;
`;
const NavigateLink = styled.div`
    dispaly: flex; 
    font-size: 8vh;   
    padding: 20px;
    text-align: center;
`;

const LinkStyle = styled(Link)`
    color: white;
    text-decoration: none;
`;

export const HomePage = () =>{
    return (
        <PageImg>
            <HeaderSlog/>
            <NavigateLink>
                <div>
                <LinkStyle to='/register'>Registruotis</LinkStyle>
                </div>
                <div>
                <LinkStyle to='/login'>Prisijungti</LinkStyle>
                </div>
            </NavigateLink>
        </PageImg>
    )

}