import styled from 'styled-components';
import LogoSrc from '../../images/logo.png';

const HeaderSlogan = styled.h1`
    color: white;
    letter-spacing: 3px;
    text-align: center;
    padding: 5vh 1vh 0vh 1vh;
    font-size: 6vh;
`;

const Logo = styled.img`
    width: 12vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const HeaderSlog= () => {
    return (
        <Header>
            <div>
                <Logo src={LogoSrc}/>
            </div>
            <div>
                <HeaderSlogan> 
                        Prisijunk ir registruok - svečius savo renginiui!
                </HeaderSlogan>
            </div>

        </Header>



)}