// Up.js
import { Flex, Image } from "@chakra-ui/react";
import imageNautanPay from './NautanPay.png';

function Up() {
    return (
        <Flex justifyContent="center">
            <Image w="18vh" borderRadius="11px" src={imageNautanPay} />
        </Flex>
    );
}

export default Up;
