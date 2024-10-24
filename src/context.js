import { createContext, useContext } from 'react';

export const ModalContext = createContext({
    modalOpen: false,
    setModalOpen: () => {},
})

export const useModalContext = () => useContext(ModalContext);