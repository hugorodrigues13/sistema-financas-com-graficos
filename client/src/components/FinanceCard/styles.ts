import styled from 'styled-components';

interface TagProps{
    color: string
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};

    list-style: none;
    border-radius: 0.5rem;
    margin: 10px 0;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    transition: all .3s;

    position: relative;

    &:hover{
        transform: translateX(10px);
    }

    .card-items {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.5rem;
    }

    .card-delete{
        display: flex;
        justify-content: center;
        
        > button{
            margin-left: 1rem;
            height: 30px;
            width: 40px;
            border: none;
            background: none;
            cursor: pointer;

            transition: transform 0.3s ease; /* Adiciona um efeito de transição suave */

            &:hover {
                transform: scale(1.2);
            }


        }
    }
        
`;

export const Tag = styled.div<TagProps>`
    position: absolute;
    width: 10px;
    height: 60%;
    border-radius: 0.3rem;
    left: 0;
    background-color: ${props => props.color};
`;

export const ModalDelete = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;

    .modal-content{
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
       

    }

    .button-confirm{
        height: 30px;
        width: 40%;
        background: none;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: ${props => props.theme.colors.warning};
        color: ${props => props.theme.colors.secondary};
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.1); 
        }
        
    }

    .button-cancel{
        height: 30px;
        width: 40%;
        background: none;
        border: none;
        background-color: red;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        background-color: ${props => props.theme.colors.info};
        color: ${props => props.theme.colors.secondary};
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.1); 
        }
    }
`;
    
    