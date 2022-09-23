import {
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box
} from "@chakra-ui/react"
import { useState } from "react"


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");

    const [email, setEmail] = useState(dataEdit.email || "");
    const [emailError, setEmailError] = useState('');
    const [sexo, setSexo] = useState(dataEdit.sexo || "");
    const [datanascimento, setDataNascimento] = useState(dataEdit.datanascimento || "");
    const [hobby, setHobby] = useState(dataEdit.hobby || "");
    const [nivel, setNivel] = useState(dataEdit.nivel || "");

    const handleSave = () => {
        if (!name || !email || !sexo || !datanascimento || !hobby || !nivel) return;

        if (emailAlreadyExists()) {
            return alert("Email já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = {name, email, sexo, datanascimento, hobby, nivel};
        }
        const newDataArray = !Object.keys(dataEdit).length 
            ? [...(data ? data : []), {name, email, sexo, datanascimento, hobby, nivel}]
            : [...(data ? data : [])]
        localStorage.setItem("cad_developer", JSON.stringify(newDataArray));

        setData(newDataArray)
        onClose();
    }

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }  
        return false;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Cadastro de Desenvolvedores</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Box>
                            <Box>
                                <FormLabel>Sexo</FormLabel>
                                <Input type="text"  value={sexo} onChange={(e) => setSexo(e.target.value)}/>
                            </Box>
                            <Box>
                                <FormLabel>Data de nascimento</FormLabel>
                                <Input type="date" value={datanascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                            </Box>
                            <Box>
                                <FormLabel>Hobby</FormLabel>
                                <Input type="text" value={hobby} onChange={(e) => setHobby(e.target.value)}/>
                            </Box>
                            <Box>
                                <FormLabel>Nível</FormLabel>
                                <Input type="text" value={nivel} onChange={(e) => setNivel(e.target.value)}/>
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComp