import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
`

export const ContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-top: 1px solid black;
    height: 42px;
    
    img{
        margin: 16px;
        width: 36px;
        height: 36px;
    }
`