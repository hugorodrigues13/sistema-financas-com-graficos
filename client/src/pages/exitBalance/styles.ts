import styled from "styled-components";

export const Container = styled.div`

`;

export const Content = styled.main`

`;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;

    .header-left {
        width: 20%;
        display: flex;
        align-items: center;

        > button {
            background: none;
            border: none;
            display: flex;
            width: 50%;
            height: 35px;
            border-radius: 0.5rem;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            margin-right: 1rem;
            color: #fff;
            background-color: ${props => props.theme.colors.menu};
            transition: opacity .3s;

            &:hover{
               opacity: .7;
            }
        }
    }

    .header-right {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > h1 {
            color: ${props => props.theme.colors.black}
        }
    }

    .tag-filter{
        font-size: 18px;
        font-weight: 500;
        background: none;
        border: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;

        transition: opacity .3s;
        opacity: .4;
    }

    .tag-filter:hover{
        opacity: .7;
    }

    .tag-filter-recorrente::after{
            content: '';
            display: block;
            width: 55px;
            height: 5px;
            margin: 0 auto;
            border-bottom: 10px solid ${props => props.theme.colors.warning};
        }

        .tag-filter-eventual::after{
            content: '';
            display: block;
            width: 55px;
            height: 5px;
            margin: 0 auto;
            border-bottom: 10px solid ${props => props.theme.colors.info};
        }

        .tag-actived{
            opacity: 1;
        }
`;