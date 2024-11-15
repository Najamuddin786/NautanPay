import { useState } from "react";
import { Box, Flex, Text, Input, Button, Image, Select } from "@chakra-ui/react";
import { IoSearchCircle } from "react-icons/io5";
import Pre from "./Pre";
import vi from './Vi.png';
import jio from './jio.png';
import airtel from './airtel.png';
import bsnl from './bsnl.png';
import PayNow from "./PayNow";

const operators = [
    { label: "Reliance Jio", icon: jio },
    { label: "Airtel", icon: airtel },
    { label: "Vi (Vodafone Idea)", icon: vi },
    { label: "BSNL", icon: bsnl }
];

const regions = ["Andhra Pradesh & Telangana", "Assam", "Bihar & Jharkhand", "Chennai", "Delhi NCR", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Karnataka", "Kerala", "Kolkata", "Madhya Pradesh & Chhattisgarh", "Maharashtra & Goa", "Mumbai", "North East", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh (East)", "Uttar Pradesh (West) & Uttarakhand", "West Bengal"];

function RechargeNavbar() {
    return (
        <Flex boxShadow="xl" color="white" fontWeight={600} gap="5" px="5vw" alignItems="center" w="100vw" h="8vh" bg="#087844" fontSize="25px">
            <Pre color="white"/>
            <Text>Mobile Recharge</Text>
        </Flex>
    );
}

function RechargeNumber({ onSubmit }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [operator, setOperator] = useState("");
    const [region, setRegion] = useState("");

    const handleSearch = () => {
        if (phoneNumber && operator && region) {
            onSubmit({ phoneNumber, operator, region });
        }
    };

    return (
        <Flex boxShadow="xl" fontSize="20px">
            <Box p="10px" w="100vw" pb="20px">
                <label>Enter Mobile Number</label>
                <Input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Mobile Number" maxLength={10}/>
                {phoneNumber.length === 10 && (
                    <>
                        <Text mt="15px">Select Operator</Text>
                        <Select placeholder="Choose Operator" onChange={(e) => setOperator(e.target.value)}>
                            {operators.map((op) => (
                                <option key={op.label} value={op.label}>{op.label}</option>
                            ))}
                        </Select>
                        <Text mt="15px">Select Region</Text>
                        <Select placeholder="Choose Region" onChange={(e) => setRegion(e.target.value)}>
                            {regions.map((region) => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </Select>
                        <Flex gap={2} justifyContent="center" mt="10px">
                            <Button color="white" bg="#087844" onClick={handleSearch}>
                                <IoSearchCircle fontSize="30px"/><Text>Search</Text>
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
            
        </Flex>
    );
}

function SearchResult({ data, onChange }) {
    const operatorLogo = operators.find(op => op.label === data.operator)?.icon;

    return (
        <><Flex pb='18px' direction="column" align="center" justify="center" bg="white" boxShadow={'2xl'} border={'1px solid gray'}>
            <Text fontSize="24px">Recharge Details</Text>
            <Text mt="5px">Phone Number: {data.phoneNumber}</Text>
            
            <Flex mt="5px" borderRadius="sm" gap="10px" w="95%" alignItems="center" px="20px" bg="black">
                <Flex h="25px" borderRadius="sm" gap="5px" alignItems="center" justifyContent="space-between" fontSize="12px" color="white">
                    <Flex ml="-25px" alignItems="center" justifyContent="center" borderRadius="100px" bg="red" p="5px" h="50px" w="50px">
                        <Image borderRadius="100px" position="absolute" w="45px" src={operatorLogo} alt={data.operator} />
                    </Flex>
                    <Text>{data.operator}</Text>
                    <Text w="3px" h="3px" bg="white"></Text>
                    <Text>{data.region}</Text>
                    <Text px="10px" borderRadius="2px" bg="white" color="blue" onClick={onChange}>Change</Text>
                </Flex>
            </Flex>

            <Box mt='20px' w='90%'>
            <Input type="number" placeholder="Enter Amount"/>
            </Box>
        
            
        </Flex>
        <PayNow/>
        </>
    );
}

export default function RechargeMain() {
    const [searchData, setSearchData] = useState(null);

    const handleSearchSubmit = (data) => {
        setSearchData(data);
    };

    const handleChange = () => {
        setSearchData(null); // Reset to show the RechargeNumber component
    };

    return (
        <Box m="-10px">
            <RechargeNavbar/>
            {searchData ? (
                <SearchResult data={searchData} onChange={handleChange} />
            ) : (
                <RechargeNumber onSubmit={handleSearchSubmit} />
            )}
        </Box>
    );
}
