import { Box } from "@chakra-ui/react"
import Footer from "../Components/Footer"
import ItemProfile from "../Components/Profile/ItemProfile"
import Navbar from "../Components/Navbar"

export default function Profile(){

    return <>
            <Box p='10px'>
                <Navbar/>
                <ItemProfile/>
                <Footer/>
            </Box>
    </>
}