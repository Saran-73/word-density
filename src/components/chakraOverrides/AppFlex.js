import { Flex, useStyleConfig } from "@chakra-ui/react";


export const AppFlex= ({children, customStyle})=>{

    return (
        <Flex {...customStyle}>
            {children}
        </Flex>
    )
}