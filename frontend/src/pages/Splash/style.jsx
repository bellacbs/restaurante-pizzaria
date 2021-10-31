import styled from "styled-components";
import {primaryColor, secondColor} from '../../constants/colors'


export const Container = styled.div`
    position: absolute;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, ${primaryColor} 50%, ${secondColor} 50%);
    background-position: center;
    background-size: 100%;
    background-repeat:no-repeat;
`