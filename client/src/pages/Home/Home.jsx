import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderSlog } from '../../components/HeaderSlogan/HeaderSlogan';
import PageImgSrc from '../../images/pageimg.jpg';
import { BsPencilSquare  } from 'react-icons/bs';


const sizeValueforIcon = 10 * 4;

const IconSpan = styled.span`
    padding: 10px;
`;

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
                <LinkStyle to='/register'>
                    Registruotis
                    <IconSpan>
                        <BsPencilSquare size={sizeValueforIcon} />
                    </IconSpan>
                </LinkStyle>
                </div>
                <div>
                <LinkStyle to='/login'>
                    Prisijungti
                    <IconSpan>
                        <BsPencilSquare size={sizeValueforIcon} />
                    </IconSpan> 
                </LinkStyle>
                </div>
            </NavigateLink>
        </PageImg>
    )

}