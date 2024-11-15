import { Box } from "@chakra-ui/react"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import RechargeMain from "../Components/Recharge/RechargeMain"

export default function Recharge(){

    return <>
            <Box p='10px'>
                {/* <Navbar/> */}
                <RechargeMain/>
                {/* <Footer/> */}
            </Box>
    </>
}