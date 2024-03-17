    import React, {ReactNode, useState} from 'react'

    import {Container, Tag, ModalDelete} from './styles'
    import { FiTrash2 } from 'react-icons/fi';


    interface FinanceCardProps {
        tagColor: string;
        title: string;
        subtitle: string;
        amount: string | any;
        onDelete: () => void; // Defina a prop onDelete como uma função que não recebe argumentos e não retorna nada

    }

    export const FinanceCard = ({ tagColor, title, subtitle, amount, onDelete}: FinanceCardProps) => {
        const [showModal, setShowModal] = useState(false);

        const handleDeleteClick = () => {
            setShowModal(true);
        };
    
        const confirmDelete = () => {
            onDelete();
            setShowModal(false);
        };
    
        const cancelDelete = () => {
            setShowModal(false);
        };

        return (
            <Container>
                <Tag color={tagColor} />
                <div className='card-items'>
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                </div>
                    {!showModal ? (
                        <div className='card-delete'>
                            <h3>{amount}</h3>
                            <button type="button" onClick={handleDeleteClick}><FiTrash2 size={25} color="#FF5964"/></button>
                        </div>
                    ): showModal && (
                        <ModalDelete>
                                <p>Tem certeza que deseja excluir este item?</p>
                                <div className="modal-content">
                                    <button className='button-confirm' onClick={confirmDelete}>Confirmar</button>
                                    <button className='button-cancel' onClick={cancelDelete}>Cancelar</button>
                                </div>
                        </ModalDelete>
                    )}
                
            </Container>
        )
    }