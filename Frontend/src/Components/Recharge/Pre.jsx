import { Box } from "@chakra-ui/react";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Pre({ color }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Goes back one step in the history
    };

    return (
        <Box
            fontWeight={600}
            color={color || 'black'}
            fontSize="30px"
            cursor="pointer"
            onClick={handleBack} // Trigger handleBack on click
        >
            <GrFormPreviousLink />
        </Box>
    );
}
