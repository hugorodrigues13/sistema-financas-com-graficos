import styled from "styled-components";

interface IlegendProps {
    color: string;
}

export const Container = styled.div`
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: column;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    margin: 10px 0;
    padding: 30px 20px;

    border-radius: 7px;

`;

export const Header = styled.header`
     > h2 {
        margin-bottom: 20px;
        margin-left: 1rem;
    }
    display: flex;
    justify-content: space-between;

`;

export const LegendContainer = styled.ul`
    list-style: none;
    display: flex;

    margin-bottom: 1rem;
`;

export const Legend = styled.li<IlegendProps>`
    display: flex;
    align-items: center;

    > div {
        background-color: ${props => props.color};

        width: 60px;
        height: 40px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 40px;
        text-align: center;
    }

    > span {
        margin: 0 1.5rem 0 7px;
    }

`;
