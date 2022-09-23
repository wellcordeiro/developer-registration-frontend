import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ModalComp from "./components/ModalComp"


const App = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState({})

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    const db_costumer = localStorage.getItem('cad_developer')
      ? JSON.parse(localStorage.getItem("cad_developer"))
      : [];
    setDataEdit(db_costumer)   
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray)

    localStorage.setItem("cad_developer", JSON.stringify(newArray))
   }
  
  return (  
    <Flex h="100vh" align="center" justify="center" font-size="20px" fontFamily="poppins" bg="#212121" color="#ffffff">
      <Box maxWidth={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
        <Box overflowY="auto" height="100%">
          <Table mt={6}>
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Email
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Sexo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Data de nascimento
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Hobby
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" color="ffffff">
                  Nível
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({name, email, sexo, datanascimento, hobby, nivel}, index) => (
                <Tr key={index} _hover={{bg: "#343434"}}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{sexo}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{datanascimento}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{hobby}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{nivel}</Td>
                  <Td p={0}>
                    <EditIcon fontSize={20} cursor="pointer" onClick={() => [setDataEdit({name, email, sexo, datanascimento, hobby, nivel, index}), onOpen()]}/>
                  </Td>
                  <Td p={0}>
                    <DeleteIcon fontSize={20} cursor="pointer" onClick={() => handleRemove(email)}/>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp 
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  )
}

export default App
