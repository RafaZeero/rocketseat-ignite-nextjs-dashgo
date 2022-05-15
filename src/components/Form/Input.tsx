import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction } from "react"

interface InputProps extends ChakraInputProps {
  name: string,
  label?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, ...props }, ref) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name} >{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        type='email' // Receber como props
        focusBorderColor='pink.500'
        bgColor='gray.900'
        variant='filled'
        _hover={{
          bgColor: 'gray.900'
        }}
        size='lg'
        ref={ref}
        {...props}
      />
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)